/* Rota Sênior — núcleo
   Utilidades, estado salvo no aparelho e sincronização opcional.
   Tudo mora no objeto global RS para o app funcionar sem build: basta abrir o index.html. */
window.RS = window.RS || {};
window.RS.dados = window.RS.dados || {};
window.RS.paginas = window.RS.paginas || {};   // cada página: { titulo, desenhar(param), depois? }
window.RS.acoes = window.RS.acoes || {};       // ações chamadas por data-acao / data-mudar / data-digitar / data-enviar
window.RS.ui = window.RS.ui || { abertos: {} }; // estado de tela que não precisa ser salvo

(function (RS) {
  'use strict';

  const CHAVE = 'rota-senior:estado:v1';
  const DIA_MS = 864e5;

  /* ===================== Utilidades ===================== */

  RS.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  RS.pad = function (n) { return String(n).padStart(2, '0'); };

  RS.iso = function (d) {
    return d.getFullYear() + '-' + RS.pad(d.getMonth() + 1) + '-' + RS.pad(d.getDate());
  };

  /* '2027-10-09' -> Date local (meia-noite). Retorna null se inválida. */
  RS.deISO = function (s) {
    if (!s) return null;
    const p = String(s).split('-').map(Number);
    if (p.length !== 3 || p.some(isNaN)) return null;
    const d = new Date(p[0], p[1] - 1, p[2]);
    return isNaN(d.getTime()) ? null : d;
  };

  RS.hoje = function () { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

  RS.maisDias = function (d, n) { const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; };

  RS.maisMeses = function (d, n) { const x = new Date(d.getTime()); x.setMonth(x.getMonth() + n); return x; };

  /* Dias corridos de a até b (positivo se b vem depois). */
  RS.diasEntre = function (a, b) {
    const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((ub - ua) / DIA_MS);
  };

  const fData = {
    curta: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }),
    media: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
    longa: new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }),
    mes: new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' })
  };

  RS.fmt = {
    data: function (d, estilo) { return d ? fData[estilo || 'curta'].format(d).replace(/\./g, '') : '—'; },
    moeda: function (n) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(Number(n) || 0);
    },
    num: function (n) { return new Intl.NumberFormat('pt-BR').format(Number(n) || 0); },
    /* 95 -> '1h35' | 40 -> '40 min' */
    duracao: function (min) {
      min = Math.round(min || 0);
      if (min < 60) return min + ' min';
      const h = Math.floor(min / 60), m = min % 60;
      return h + 'h' + (m ? RS.pad(m) : '');
    }
  };

  /* 'HH:MM' + minutos -> 'HH:MM' */
  RS.somaHora = function (hhmm, minutos) {
    const p = String(hhmm || '00:00').split(':').map(Number);
    let total = ((p[0] || 0) * 60 + (p[1] || 0) + (minutos || 0)) % 1440;
    if (total < 0) total += 1440;
    return RS.pad(Math.floor(total / 60)) + ':' + RS.pad(total % 60);
  };

  RS.novoId = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); };

  /* Texto sem acento e minúsculo, para buscas. */
  RS.plano = function (s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  };

  RS.numero = function (v) {
    const n = parseFloat(String(v == null ? '' : v).replace(/\./g, '').replace(',', '.'));
    return isFinite(n) ? n : 0;
  };

  /* Dentro do Claude (artifact) a página roda num quadro com regras próprias:
     sem vídeo embutido, sem download direto, sem alert/confirm. */
  RS.noClaude = !!(window.claude && typeof window.claude.use === 'function');
  /* Vídeo embutido só funciona servido por http(s) e fora do Claude. */
  RS.podeEmbutir = !RS.noClaude && /^https?:$/.test(location.protocol);

  /* ===================== Estado ===================== */

  function estadoPadrao() {
    const p = RS.dados.perfilPadrao || {};
    return {
      v: 1,
      perfil: {
        nome: p.nome || '',
        casamento: p.casamento || '',
        cidade: p.cidade || '',
        contexto: p.contexto || '',
        inicio: p.inicio || RS.iso(RS.hoje()),
        ritmo: 'normal',
        tema: 'auto',
        horarios: { manha: '06:30', almoco: '12:30', noite: '20:30', sabado: '09:00', domingo: '17:00' },
        pronto: !!p.pronto
      },
      feitos: {},        // id de passo, recurso ou entrega -> momento em que foi concluído
      dias: {},          // 'AAAA-MM-DD' -> { idDoBloco: 1 } (alimenta a sequência de dias)
      quiz: {},          // id da pergunta -> 1 (acertou) ou 0 (errou)
      cartas: {},        // id da frase em inglês -> 1 (sei) ou 0 (ainda não)
      favoritos: {},     // id da ideia -> 1
      tarefas: [],       // { id, texto, feito, linha, criada }
      vagas: {},         // id da vaga listada -> { status, nota }
      minhasVagas: [],   // { id, empresa, cargo, link, status }
      orcamento: { teto: 0, convidados: 0, itens: {} },
      financas: { renda: 0, guardado: 0, alvo: 0, taxa: 10, custo: 0 },
      atualizadoEm: 0
    };
  }

  /* Garante que um estado antigo ou vindo da nuvem tenha todos os campos atuais. */
  function normalizar(bruto) {
    const base = estadoPadrao();
    if (!bruto || typeof bruto !== 'object') return base;
    const e = Object.assign({}, base, bruto);
    e.perfil = Object.assign({}, base.perfil, bruto.perfil || {});
    e.perfil.horarios = Object.assign({}, base.perfil.horarios, (bruto.perfil || {}).horarios || {});
    e.orcamento = Object.assign({}, base.orcamento, bruto.orcamento || {});
    e.orcamento.itens = Object.assign({}, (bruto.orcamento || {}).itens || {});
    e.financas = Object.assign({}, base.financas, bruto.financas || {});
    ['feitos', 'dias', 'quiz', 'cartas', 'favoritos', 'vagas'].forEach(function (k) {
      if (!e[k] || typeof e[k] !== 'object' || Array.isArray(e[k])) e[k] = {};
    });
    ['tarefas', 'minhasVagas'].forEach(function (k) { if (!Array.isArray(e[k])) e[k] = []; });
    return e;
  }
  RS.normalizar = normalizar;

  function lerLocal() {
    try {
      const txt = window.localStorage.getItem(CHAVE);
      return txt ? JSON.parse(txt) : null;
    } catch (e) { return null; }
  }

  function gravarLocal() {
    try { window.localStorage.setItem(CHAVE, JSON.stringify(RS.estado)); } catch (e) { /* sem armazenamento: segue em memória */ }
  }

  RS.carregar = function () { RS.estado = normalizar(lerLocal()); };

  /* Chame depois de qualquer mudança feita pela pessoa. */
  RS.salvar = function () {
    RS.estado.atualizadoEm = Date.now();
    gravarLocal();
    agendarEnvio();
  };

  RS.substituirEstado = function (novo) {
    RS.estado = normalizar(novo);
    RS.estado.atualizadoEm = Date.now();
    gravarLocal();
    agendarEnvio();
  };

  RS.zerarEstado = function () {
    const perfil = RS.estado.perfil;
    RS.estado = estadoPadrao();
    RS.estado.perfil = perfil;
    RS.salvar();
  };

  /* ===================== Progresso ===================== */

  RS.feito = function (id) { return !!RS.estado.feitos[id]; };

  RS.marcar = function (id, valor) {
    if (valor) { RS.estado.feitos[id] = Date.now(); RS.registrarDia('passo'); }
    else delete RS.estado.feitos[id];
    RS.salvar();
  };

  /* Marca que houve estudo hoje (conta para a sequência). */
  RS.registrarDia = function (chave) {
    const hoje = RS.iso(RS.hoje());
    if (!RS.estado.dias[hoje]) RS.estado.dias[hoje] = {};
    RS.estado.dias[hoje][chave] = 1;
  };

  RS.diaAtivo = function (iso) {
    const d = RS.estado.dias[iso];
    return !!d && Object.keys(d).length > 0;
  };

  /* Dias seguidos com estudo. Hoje ainda sem estudo não quebra a sequência. */
  RS.sequencia = function () {
    let d = RS.hoje(), n = 0;
    if (!RS.diaAtivo(RS.iso(d))) d = RS.maisDias(d, -1);
    while (RS.diaAtivo(RS.iso(d))) { n++; d = RS.maisDias(d, -1); }
    return n;
  };

  RS.passosDaLinha = function (linha) {
    const lista = [];
    linha.estacoes.forEach(function (est) { est.passos.forEach(function (p) { lista.push(p); }); });
    return lista;
  };

  RS.progresso = function (passos) {
    const total = passos.length;
    const feitos = passos.filter(function (p) { return RS.feito(p.id); }).length;
    return { total: total, feitos: feitos, pct: total ? Math.round((feitos / total) * 100) : 0 };
  };

  /* Primeiro passo ainda não concluído de uma linha. */
  RS.proximoPasso = function (linhaId) {
    const linha = RS.idx.linhas[linhaId];
    if (!linha) return null;
    for (let i = 0; i < linha.estacoes.length; i++) {
      const est = linha.estacoes[i];
      for (let j = 0; j < est.passos.length; j++) {
        if (!RS.feito(est.passos[j].id)) return { linha: linha, estacao: est, passo: est.passos[j] };
      }
    }
    return null;
  };

  /* ===================== Fases e rotina ===================== */

  /* Calcula as datas de cada fase a partir do início do plano. A fase marcada
     com ateCasamento termina no dia do casamento, quando a data existe. */
  RS.fases = function () {
    const inicio = RS.deISO(RS.estado.perfil.inicio) || RS.hoje();
    const casamento = RS.deISO(RS.estado.perfil.casamento);
    let cursor = inicio;
    return RS.dados.fases.map(function (f, i) {
      let fim;
      if (f.ateCasamento && casamento && RS.diasEntre(cursor, casamento) >= 7) fim = casamento;
      else fim = RS.maisDias(cursor, f.semanas * 7 - 1);
      const fase = Object.assign({}, f, { indice: i, inicio: cursor, fim: fim });
      cursor = RS.maisDias(fim, 1);
      return fase;
    });
  };

  /* Fase em andamento hoje. Depois da última, devolve null (pós-casamento). */
  RS.faseAtual = function () {
    const hoje = RS.hoje();
    const fases = RS.fases();
    if (hoje < fases[0].inicio) return fases[0];
    for (let i = 0; i < fases.length; i++) if (hoje <= fases[i].fim) return fases[i];
    return null;
  };

  RS.passosDaFase = function (fase) {
    const lista = [];
    (fase.estacoes || []).forEach(function (idEst) {
      const est = RS.idx.estacoes[idEst];
      if (est) est.passos.forEach(function (p) { lista.push(p); });
    });
    return lista;
  };

  /* Blocos de estudo de um dia da semana (0 = domingo), já com horário e duração do ritmo escolhido. */
  RS.blocosDoDia = function (diaSemana) {
    const perfil = RS.estado.perfil;
    const ritmo = perfil.ritmo || 'normal';
    const blocos = [];
    RS.dados.rotina.blocos.forEach(function (b) {
      if (b.dias.indexOf(diaSemana) < 0) return;
      const min = typeof b.min === 'number' ? b.min : (b.min[ritmo] || 0);
      if (!min) return;
      const base = perfil.horarios[b.ancora] || RS.dados.rotina.ancoras[b.ancora].padrao;
      blocos.push({
        id: b.id,
        hora: RS.somaHora(base, b.desloc || 0),
        min: min,
        linha: (b.linhaPorDia && b.linhaPorDia[diaSemana]) || b.linha,
        titulo: (b.tituloPorDia && b.tituloPorDia[diaSemana]) || b.titulo,
        como: (b.comoPorDia && b.comoPorDia[diaSemana]) || b.como || ''
      });
    });
    blocos.sort(function (a, b) { return a.hora < b.hora ? -1 : a.hora > b.hora ? 1 : 0; });
    return blocos;
  };

  RS.blocoFeito = function (iso, id) { return !!(RS.estado.dias[iso] && RS.estado.dias[iso][id]); };

  RS.marcarBloco = function (iso, id, valor) {
    if (!RS.estado.dias[iso]) RS.estado.dias[iso] = {};
    if (valor) RS.estado.dias[iso][id] = 1; else delete RS.estado.dias[iso][id];
    if (!Object.keys(RS.estado.dias[iso]).length) delete RS.estado.dias[iso];
    RS.salvar();
  };

  /* ===================== Dados: ids e índices ===================== */

  RS.idx = { linhas: {}, estacoes: {}, passos: {}, recursos: {}, perguntas: {} };

  RS.prepararDados = function () {
    const d = RS.dados;
    d.linhas = d.linhas || [];
    d.recursos = d.recursos || [];
    d.perguntas = d.perguntas || [];
    d.ideiasSaas = d.ideiasSaas || [];
    d.ideiasAreas = d.ideiasAreas || [];
    d.frases = d.frases || [];
    d.fases = d.fases || [];

    d.recursos.forEach(function (r) { RS.idx.recursos[r.id] = r; });

    // entregas de cada fase viram itens marcáveis: f1-e1, f1-e2...
    d.fases.forEach(function (f) {
      f.entregas = (f.entregas || []).map(function (t, j) {
        return typeof t === 'string' ? { id: f.id + '-e' + (j + 1), t: t } : t;
      });
    });

    d.linhas.forEach(function (linha) {
      RS.idx.linhas[linha.id] = linha;
      linha.estacoes.forEach(function (est, i) {
        est.id = linha.id + '-' + (i + 1);
        est.linha = linha.id;
        est.numero = i + 1;
        RS.idx.estacoes[est.id] = est;
        est.passos = est.passos.map(function (p, j) {
          // um passo pode ser só um texto ou { t: texto, r: idDoRecurso, min: minutos }
          const passo = typeof p === 'string' ? { t: p } : p;
          passo.id = est.id + '-' + (j + 1);
          passo.linha = linha.id;
          passo.estacao = est.id;
          RS.idx.passos[passo.id] = passo;
          return passo;
        });
      });
    });

    // embaralha as opções de forma fixa por pergunta (a mesma ordem sempre),
    // para a resposta certa não cair sempre na mesma letra; "fixa" mantém a ordem natural
    d.perguntas.forEach(function (q) {
      if (q.fixa) return;
      let semente = 2166136261;
      for (let i = 0; i < q.p.length; i++) { semente ^= q.p.charCodeAt(i); semente = Math.imul(semente, 16777619) >>> 0; }
      const ordem = q.o.map(function (_, i) { return i; });
      for (let i = ordem.length - 1; i > 0; i--) {
        semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0;
        const j = semente % (i + 1);
        const t = ordem[i]; ordem[i] = ordem[j]; ordem[j] = t;
      }
      q.o = ordem.map(function (i) { return q.o[i]; });
      q.c = ordem.indexOf(q.c);
    });

    const contagem = {};
    d.perguntas.forEach(function (q) {
      contagem[q.l] = (contagem[q.l] || 0) + 1;
      q.id = 'q-' + q.l + '-' + contagem[q.l];
      RS.idx.perguntas[q.id] = q;
    });

    d.ideiasSaas.forEach(function (x, i) { x.id = 's' + (i + 1); x.n = i + 1; });
    d.ideiasAreas.forEach(function (x, i) { x.id = 'a' + (i + 1); x.n = i + 1; });
    d.frases.forEach(function (x, i) { x.id = 'f' + (i + 1); });
  };

  /* ===================== Nuvem (só dentro do Claude) =====================
     O progresso sempre é gravado neste aparelho. Quando o app está publicado
     no Claude, uma cópia vai para a área privada da conta de quem está usando,
     então celular e computador mostram o mesmo progresso. */

  const nuvem = { ref: null, situacao: 'local', enviando: false, pendente: false, enviado: 0, timer: null, tentouDeNovo: false };
  RS.nuvem = nuvem;

  function situacao(s) {
    nuvem.situacao = s;
    if (RS.aoMudarNuvem) RS.aoMudarNuvem(s);
  }

  RS.textoNuvem = function () {
    return {
      local: 'Salvo neste aparelho',
      conectando: 'Conectando à sua conta…',
      sincronizado: 'Sincronizado com a sua conta',
      enviando: 'Salvando…',
      offline: 'Sem conexão com a nuvem. Salvo neste aparelho.'
    }[nuvem.situacao];
  };

  RS.iniciarNuvem = async function () {
    if (!RS.noClaude) return;
    try {
      const partes = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      const db = partes[0], user = partes[1];
      if (!db || !user) return;
      const uid = await user.id();
      if (!uid) return;
      nuvem.ref = db.doc('data/users/' + uid + '/estado');
      situacao('conectando');
      const limite = setTimeout(function () { if (nuvem.situacao === 'conectando') situacao('offline'); }, 10000);
      nuvem.ref.onSnapshot(function (snap) {
        if (!snap.metadata || !snap.metadata.fromCache) clearTimeout(limite);
        if (snap.metadata && snap.metadata.hasPendingWrites) return;   // eco do nosso próprio envio
        receber(snap.exists ? snap.data() : null);
      }, function () {
        clearTimeout(limite);
        nuvem.ref = null;
        situacao('local');
      });
    } catch (e) {
      nuvem.ref = null;
      situacao('local');
    }
  };

  function receber(remoto) {
    const tLocal = RS.estado.atualizadoEm || 0;
    const tRemoto = (remoto && remoto.atualizadoEm) || 0;
    if (remoto && tRemoto > tLocal) {
      // outro aparelho salvou depois: fica valendo a versão mais nova
      RS.estado = normalizar(JSON.parse(JSON.stringify(remoto)));
      nuvem.enviado = tRemoto;
      gravarLocal();
      situacao('sincronizado');
      if (RS.aoMudarEstado) RS.aoMudarEstado();
    } else if (tLocal > tRemoto) {
      agendarEnvio(400);
    } else {
      situacao('sincronizado');
    }
  }

  function agendarEnvio(ms) {
    if (!nuvem.ref) return;
    clearTimeout(nuvem.timer);
    nuvem.timer = setTimeout(enviar, ms == null ? 1500 : ms);
  }

  async function enviar() {
    if (!nuvem.ref) return;
    if (nuvem.enviando) { nuvem.pendente = true; return; }
    const versao = RS.estado.atualizadoEm || 0;
    if (!versao || versao === nuvem.enviado) return;
    nuvem.enviando = true;
    situacao('enviando');
    try {
      await nuvem.ref.set(JSON.parse(JSON.stringify(RS.estado)));
      nuvem.enviado = versao;
      nuvem.tentouDeNovo = false;
      situacao('sincronizado');
    } catch (erro) {
      if (erro && erro.code === 'unavailable' && !nuvem.tentouDeNovo) {
        nuvem.tentouDeNovo = true;          // falha passageira: tenta mais uma vez
        nuvem.pendente = true;
        situacao('offline');
      } else {
        nuvem.ref = null;                   // sem permissão de escrita ou limite atingido: fica só no aparelho
        situacao('local');
      }
    } finally {
      nuvem.enviando = false;
      if (nuvem.pendente && nuvem.ref) { nuvem.pendente = false; agendarEnvio(2500 + Math.random() * 1500); }
    }
  }

})(window.RS);
