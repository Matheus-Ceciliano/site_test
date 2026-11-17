/* Rota Sênior — carreira e ideias: Vagas, Ideias (200 SaaS + 100 por área) e Mentor IA. */
(function (RS) {
  'use strict';

  const esc = RS.esc;

  /* ===================== VAGAS ===================== */

  const STATUS = [
    ['', 'Sem status'], ['quero', 'Quero aplicar'], ['apliquei', 'Apliquei'],
    ['entrevista', 'Em entrevista'], ['oferta', 'Recebi oferta'], ['nao', 'Não é para mim']
  ];

  function selStatus(id, atual, acao, rotulo) {
    let h = '<label class="campo" style="min-width:10rem"><span class="so-leitor">' + esc(rotulo) + '</span>' +
      '<select class="entrada" id="st-' + id + '" data-mudar="' + acao + '" data-id="' + id + '">';
    STATUS.forEach(function (s) { h += '<option value="' + s[0] + '"' + (s[0] === atual ? ' selected' : '') + '>' + s[1] + '</option>'; });
    return h + '</select></label>';
  }

  function prazoInfo(iso) {
    const d = RS.deISO(iso);
    if (!d) return { txt: 'Sem data de encerramento', cls: '', ordem: 1 };
    const n = RS.diasEntre(RS.hoje(), d);
    if (n < 0) return { txt: 'Encerrado em ' + RS.fmt.data(d, 'media'), cls: '', fechado: true, ordem: 2 };
    if (n === 0) return { txt: 'Fecha hoje', cls: 'etiqueta-alerta', ordem: 0, n: 0 };
    return { txt: 'Fecha em ' + n + (n === 1 ? ' dia' : ' dias') + ' · ' + RS.fmt.data(d), cls: n <= 10 ? 'etiqueta-alerta' : 'etiqueta-ok', ordem: 0, n: n };
  }

  function htmlProgramas() {
    const V = RS.dados.vagas;
    const lista = V.programas.map(function (p) { return { p: p, prazo: prazoInfo(p.prazo) }; });
    lista.sort(function (a, b) { return a.prazo.ordem - b.prazo.ordem || (a.prazo.n || 0) - (b.prazo.n || 0); });
    let h = '<div class="cartao">';
    lista.forEach(function (x) {
      const p = x.p;
      const st = (RS.estado.vagas[p.id] || {}).status || '';
      h += '<div class="item"' + (x.prazo.fechado ? ' style="opacity:.7"' : '') + '><div class="pilha-p">' +
        '<div class="fila"><span class="etiqueta ' + x.prazo.cls + '">' + x.prazo.txt + '</span>' +
          (p.remoto ? '<span class="etiqueta">Remoto</span>' : '') + (p.confirmar ? '<span class="etiqueta etiqueta-alerta">Confirmar no site</span>' : '') + '</div>' +
        '<h3 class="titulo-item">' + esc(p.empresa) + ' · ' + esc(p.programa) + '</h3>' +
        '<p class="pequeno"><span class="forte">Onde:</span> ' + esc(p.local) + (p.bolsa ? ' · <span class="forte">Bolsa:</span> ' + esc(p.bolsa) : '') + '</p>' +
        '<p class="pequeno mudo">' + esc(p.nota) + '</p>' +
        '<div class="fila">' + RS.externo(p.url, 'Ver e se inscrever') + selStatus(p.id, st, 'vaga-status', 'Status: ' + p.empresa) + '</div>' +
      '</div><span></span></div>';
    });
    return h + '</div>';
  }

  function htmlBuscas() {
    const cidade = RS.estado.perfil.cidade;
    let h = '<div class="grade">';
    RS.dados.vagas.buscas.forEach(function (b) {
      const url = typeof b.url === 'function' ? b.url(cidade) : b.url;
      h += '<a class="cartao cartao-link pilha-p" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' +
        '<div class="fila-entre"><span class="titulo-item">' + esc(b.nome) + '</span>' + RS.icone('externo', 16) + '</div>' +
        '<span class="pequeno mudo">' + esc(b.nota) + '</span></a>';
    });
    h += '</div>';
    if (!cidade) h += '<p class="pequeno mudo">Coloque sua cidade no <a href="#perfil">Perfil</a> para as buscas incluírem vagas presenciais e híbridas perto de você.</p>';
    return h;
  }

  function htmlMinhasVagas() {
    const lista = RS.estado.minhasVagas;
    let h = '<form class="cartao pilha" data-enviar="vaga-nova">' +
      '<div class="campos">' +
        '<label class="campo"><span class="rotulo">Empresa</span><input class="entrada" id="mv-empresa" name="empresa" maxlength="80" required></label>' +
        '<label class="campo"><span class="rotulo">Cargo</span><input class="entrada" id="mv-cargo" name="cargo" maxlength="80" placeholder="Estágio em desenvolvimento" required></label>' +
        '<label class="campo"><span class="rotulo">Link da vaga</span><input class="entrada" id="mv-link" name="link" type="url" placeholder="https://"></label>' +
      '</div><div><button class="btn btn-placa" type="submit">' + RS.icone('mais', 18) + ' Salvar vaga</button></div></form>';
    if (!lista.length) return h + '<p class="faixa">Nenhuma vaga salva ainda. Meta da fase Profissional: 3 candidaturas boas por semana, cada uma com currículo ajustado.</p>';
    const contagem = {};
    lista.forEach(function (v) { contagem[v.status || ''] = (contagem[v.status || ''] || 0) + 1; });
    h += '<div class="chips">';
    STATUS.forEach(function (s) { if (contagem[s[0]]) h += '<span class="etiqueta">' + s[1] + ': ' + contagem[s[0]] + '</span>'; });
    h += '</div><div class="cartao">';
    lista.forEach(function (v) {
      h += '<div class="item"><div class="pilha-p"><span class="titulo-item">' + esc(v.empresa) + '</span><span class="pequeno mudo">' + esc(v.cargo) + ' · salva em ' + RS.fmt.data(RS.deISO(v.criada), 'media') + '</span>' +
        '<div class="fila">' + (v.link ? RS.externo(v.link, 'Abrir') : '') + selStatus(v.id, v.status, 'minha-vaga-status', 'Status: ' + v.empresa) + '</div></div>' +
        '<button class="btn-icone" type="button" data-acao="minha-vaga-apagar" data-id="' + v.id + '" aria-label="Apagar vaga de ' + esc(v.empresa) + '">' + RS.icone('lixo', 18) + '</button></div>';
    });
    return h + '</div>';
  }

  function htmlAnalise() {
    const V = RS.dados.vagas;
    let h = '<div class="grade-2">';
    V.analise.forEach(function (bloco) {
      h += '<div class="cartao texto"><h3 class="titulo-sec">' + esc(bloco.titulo) + '</h3><ul>';
      bloco.itens.forEach(function (i) { h += '<li>' + esc(i) + '</li>'; });
      h += '</ul></div>';
    });
    h += '</div><section class="pilha-p"><h3 class="titulo-sec">Salários de referência</h3>' +
      '<div class="tabela-rolo"><table class="tabela"><thead><tr><th>Nível</th><th class="num">Faixa mensal</th><th>Fonte</th></tr></thead><tbody>';
    V.salarios.forEach(function (s) {
      h += '<tr><td>' + esc(s.nivel) + '</td><td class="num mono">' + esc(s.faixa) + '</td><td class="pequeno mudo">' + esc(s.fonte) + '</td></tr>';
    });
    h += '</tbody></table></div><p class="pequeno mudo">' + esc(V.notaSalarios) + '</p></section>';
    return h;
  }

  RS.paginas.vagas = {
    titulo: 'Vagas',
    desenhar: function (param) {
      const aba = ['buscar', 'minhas', 'analisar'].indexOf(param) >= 0 ? param : 'abertas';
      const V = RS.dados.vagas;
      let h = RS.cabecalho('Vagas · conferido em ' + RS.fmt.data(RS.deISO(V.conferido), 'media'), 'Vagas para analisar',
        'O caminho mais curto para ser contratado costuma ser a efetivação onde você já estagia. Em paralelo, mantenha candidaturas abertas.');
      h += '<section class="cartao pilha-p"><h2 class="titulo-sec">Plano de efetivação no estágio atual</h2><div class="texto"><ol>';
      V.efetivacao.forEach(function (i) { h += '<li>' + esc(i) + '</li>'; });
      h += '</ol></div></section>';
      h += RS.sub([
        { id: 'abertas', nome: 'Programas', hash: 'vagas' },
        { id: 'buscar', nome: 'Buscar agora', hash: 'vagas-buscar' },
        { id: 'minhas', nome: 'Minhas vagas', hash: 'vagas-minhas' },
        { id: 'analisar', nome: 'Como analisar', hash: 'vagas-analisar' }
      ], aba);
      if (aba === 'abertas') h += '<p class="lide">Programas de estágio encontrados na pesquisa. Prazos mudam: confira sempre no site oficial antes de se inscrever.</p>' + htmlProgramas();
      else if (aba === 'buscar') h += '<p class="lide">Buscas já montadas para estágio e júnior em desenvolvimento. Abra, filtre por "últimos 7 dias" e salve as boas em Minhas vagas.</p>' + htmlBuscas();
      else if (aba === 'minhas') h += htmlMinhasVagas();
      else h += htmlAnalise();
      return h;
    }
  };

  RS.acoes['vaga-status'] = function (el) {
    const id = el.getAttribute('data-id');
    RS.estado.vagas[id] = Object.assign({}, RS.estado.vagas[id], { status: el.value });
    RS.salvar();
    RS.aviso('Status salvo');
  };

  RS.acoes['vaga-nova'] = function (form) {
    const empresa = form.elements.empresa.value.trim();
    const cargo = form.elements.cargo.value.trim();
    if (!empresa || !cargo) return;
    let link = form.elements.link.value.trim();
    if (link && !/^https?:\/\//i.test(link)) link = '';
    RS.estado.minhasVagas.unshift({ id: RS.novoId(), empresa: empresa, cargo: cargo, link: link, status: 'quero', criada: RS.iso(RS.hoje()) });
    RS.registrarDia('vaga');
    RS.salvar();
    RS.desenhar();
    RS.aviso('Vaga salva');
  };

  RS.acoes['minha-vaga-status'] = function (el) {
    const v = RS.estado.minhasVagas.find(function (x) { return x.id === el.getAttribute('data-id'); });
    if (!v) return;
    v.status = el.value;
    RS.salvar();
    RS.desenhar();
  };

  RS.acoes['minha-vaga-apagar'] = function (el) {
    const id = el.getAttribute('data-id');
    const v = RS.estado.minhasVagas.find(function (x) { return x.id === id; });
    if (!v) return;
    RS.confirmar({
      titulo: 'Apagar esta vaga?', texto: v.empresa + ' · ' + v.cargo, sim: 'Apagar',
      aoConfirmar: function () {
        RS.estado.minhasVagas = RS.estado.minhasVagas.filter(function (x) { return x.id !== id; });
        RS.salvar();
        RS.desenhar();
      }
    });
  };

  /* ===================== IDEIAS ===================== */

  function estadoIdeias(aba) {
    RS.ui.ideias = RS.ui.ideias || {};
    return RS.ui.ideias[aba] || (RS.ui.ideias[aba] = { q: '', cat: '', nivel: 0, fav: false, limite: 30 });
  }

  function categorias(lista, campo) {
    const c = [];
    lista.forEach(function (x) { if (c.indexOf(x[campo]) < 0) c.push(x[campo]); });
    return c;
  }

  function fichaIdeia(x) {
    if (x.cat) {
      return '<dl class="ficha"><div><dt>Como funciona</dt><dd>' + esc(x.como) + '</dd></div>' +
        '<div><dt>Quem paga e como</dt><dd>' + esc(x.receita) + '</dd></div>' +
        '<div><dt>Primeira versão (MVP)</dt><dd>' + esc(x.mvp) + '</dd></div></dl>';
    }
    return '<dl class="ficha"><div><dt>A solução</dt><dd>' + esc(x.solucao) + '</dd></div>' +
      '<div><dt>Como funcionaria</dt><dd>' + esc(x.como) + '</dd></div></dl>';
  }

  function botoesIdeia(x) {
    const fav = !!RS.estado.favoritos[x.id];
    return '<div class="fila">' +
      '<button class="btn btn-p" type="button" data-acao="ideia-projeto" data-id="' + x.id + '">' + RS.icone('tarefas', 15) + ' Virar afazer</button>' +
      '<button class="btn btn-p" type="button" data-acao="ideia-mentor" data-id="' + x.id + '">' + RS.icone('mentor', 15) + ' Plano com IA</button>' +
      '<button class="btn btn-p" type="button" data-acao="ideia-fav" data-id="' + x.id + '" aria-pressed="' + fav + '">' + RS.icone('estrela', 15) + (fav ? ' Favorita' : ' Favoritar') + '</button></div>';
  }

  function cartaoIdeia(x) {
    const fav = !!RS.estado.favoritos[x.id];
    const id = 'det-' + x.id;
    return '<article class="cartao ideia">' +
      '<div class="ideia-topo"><span class="ideia-num">#' + String(x.n).padStart(3, '0') + '</span>' +
        '<div class="cresce"><h3 class="titulo-item">' + esc(x.nome) + '</h3>' +
        '<p class="fila pequeno mudo" style="gap:.4rem">' + esc(x.cat || x.area) + ' ' + RS.nivel(x.nivel) + '</p></div>' +
        '<button class="btn-icone" type="button" data-acao="ideia-fav" data-id="' + x.id + '" aria-pressed="' + fav + '" aria-label="' + (fav ? 'Tirar dos favoritos' : 'Favoritar') + ': ' + esc(x.nome) + '">' + RS.icone('estrela', 20) + '</button></div>' +
      '<p>' + esc(x.resumo || x.problema) + '</p>' +
      '<details class="mais" id="' + id + '"' + RS.aberto(id, false) + '><summary>Como funcionaria</summary>' +
        '<div class="pilha">' + fichaIdeia(x) + botoesIdeia(x) + '</div></details>' +
    '</article>';
  }

  function filtrarIdeias(aba) {
    const u = estadoIdeias(aba);
    const lista = aba === 'areas' ? RS.dados.ideiasAreas : RS.dados.ideiasSaas;
    const q = RS.plano(u.q).trim();
    return lista.filter(function (x) {
      if (u.cat && (x.cat || x.area) !== u.cat) return false;
      if (u.nivel && x.nivel !== u.nivel) return false;
      if (u.fav && !RS.estado.favoritos[x.id]) return false;
      if (q && RS.plano([x.nome, x.cat, x.area, x.resumo, x.problema, x.solucao, x.como, x.receita, x.mvp].join(' ')).indexOf(q) < 0) return false;
      return true;
    });
  }

  function listaIdeias(aba) {
    const u = estadoIdeias(aba);
    const lista = filtrarIdeias(aba);
    if (!lista.length) return '<p class="faixa">Nenhuma ideia com esses filtros.</p>';
    let h = '<p class="pequeno mudo" role="status">' + lista.length + (lista.length === 1 ? ' ideia' : ' ideias') + '</p><div class="grade">';
    lista.slice(0, u.limite).forEach(function (x) { h += cartaoIdeia(x); });
    h += '</div>';
    if (lista.length > u.limite) h += '<div><button class="btn" type="button" data-acao="ideias-mais" data-aba="' + aba + '">Mostrar mais ' + Math.min(30, lista.length - u.limite) + '</button></div>';
    return h;
  }

  RS.ideia = function (id) {
    const fonte = id.charAt(0) === 'a' ? RS.dados.ideiasAreas : RS.dados.ideiasSaas;
    return fonte.find(function (x) { return x.id === id; });
  };

  RS.paginas.ideias = {
    titulo: 'Ideias',
    desenhar: function (param) {
      const aba = param === 'areas' ? 'areas' : 'saas';
      const u = estadoIdeias(aba);
      const lista = aba === 'areas' ? RS.dados.ideiasAreas : RS.dados.ideiasSaas;
      const campo = aba === 'areas' ? 'area' : 'cat';
      const favs = lista.filter(function (x) { return RS.estado.favoritos[x.id]; }).length;
      let h = RS.cabecalho('Ideias', aba === 'areas' ? '100 problemas resolvidos com software' : '200 ideias de SaaS',
        aba === 'areas'
          ? 'Problemas reais de 20 áreas de trabalho, com a solução e como ela funcionaria na prática. Ótimas para projeto de portfólio, TCC ou primeiro cliente.'
          : 'Cada ideia tem como funciona, quem paga e uma primeira versão que dá para construir em poucas semanas.');
      h += RS.sub([
        { id: 'saas', nome: '200 SaaS', hash: 'ideias' },
        { id: 'areas', nome: '100 por área', hash: 'ideias-areas' }
      ], aba);
      let opc = '<option value="">Todas (' + lista.length + ')</option>';
      categorias(lista, campo).forEach(function (c) {
        const n = lista.filter(function (x) { return x[campo] === c; }).length;
        opc += '<option value="' + esc(c) + '"' + (u.cat === c ? ' selected' : '') + '>' + esc(c) + ' (' + n + ')</option>';
      });
      h += '<section class="pilha">' +
        '<div class="campos">' +
          '<label class="campo"><span class="rotulo">Buscar</span><input class="entrada" type="search" id="ideias-q-' + aba + '" data-digitar="ideias-busca" data-aba="' + aba + '" value="' + esc(u.q) + '" placeholder="Ex.: restaurante, 3D, intranet" autocomplete="off"></label>' +
          '<label class="campo"><span class="rotulo">' + (aba === 'areas' ? 'Área' : 'Categoria') + '</span><select class="entrada" id="ideias-cat-' + aba + '" data-mudar="ideias-cat" data-aba="' + aba + '">' + opc + '</select></label>' +
        '</div>' +
        '<div class="chips" role="group" aria-label="Filtros">' +
          '<button type="button" class="chip" data-acao="ideias-nivel" data-aba="' + aba + '" data-v="0" aria-pressed="' + (!u.nivel) + '">Qualquer nível</button>' +
          '<button type="button" class="chip" data-acao="ideias-nivel" data-aba="' + aba + '" data-v="1" aria-pressed="' + (u.nivel === 1) + '">Iniciante</button>' +
          '<button type="button" class="chip" data-acao="ideias-nivel" data-aba="' + aba + '" data-v="2" aria-pressed="' + (u.nivel === 2) + '">Intermediário</button>' +
          '<button type="button" class="chip" data-acao="ideias-nivel" data-aba="' + aba + '" data-v="3" aria-pressed="' + (u.nivel === 3) + '">Avançado</button>' +
          '<button type="button" class="chip" data-acao="ideias-fav-filtro" data-aba="' + aba + '" aria-pressed="' + u.fav + '">' + RS.icone('estrela', 14) + ' Favoritas (' + favs + ')</button>' +
          '<button type="button" class="chip" data-acao="ideias-sortear" data-aba="' + aba + '">' + RS.icone('sortear', 14) + ' Sortear uma</button>' +
        '</div>' +
        '<div class="pilha" id="ideias-lista">' + listaIdeias(aba) + '</div></section>';
      return h;
    }
  };

  RS.acoes['ideias-busca'] = function (el) { const a = el.getAttribute('data-aba'); const u = estadoIdeias(a); u.q = el.value; u.limite = 30; RS.trocar('ideias-lista', listaIdeias(a)); };
  RS.acoes['ideias-cat'] = function (el) { const a = el.getAttribute('data-aba'); const u = estadoIdeias(a); u.cat = el.value; u.limite = 30; RS.trocar('ideias-lista', listaIdeias(a)); };
  RS.acoes['ideias-nivel'] = function (el) { const u = estadoIdeias(el.getAttribute('data-aba')); u.nivel = Number(el.getAttribute('data-v')); u.limite = 30; RS.desenhar(); };
  RS.acoes['ideias-fav-filtro'] = function (el) { const u = estadoIdeias(el.getAttribute('data-aba')); u.fav = !u.fav; u.limite = 30; RS.desenhar(); };
  RS.acoes['ideias-mais'] = function (el) { const a = el.getAttribute('data-aba'); estadoIdeias(a).limite += 30; RS.trocar('ideias-lista', listaIdeias(a)); };

  function abrirIdeia(x) {
    const veu = RS.dialogo(
      '<div class="pilha">' +
        '<div class="fila-entre"><p class="sobre">Ideia #' + String(x.n).padStart(3, '0') + ' · ' + esc(x.cat || x.area) + '</p>' +
        '<button class="btn-icone" type="button" data-fechar aria-label="Fechar">' + RS.icone('fechar', 20) + '</button></div>' +
        '<h2 class="titulo-sec">' + esc(x.nome) + '</h2>' +
        '<p>' + esc(x.resumo || x.problema) + '</p>' + fichaIdeia(x) +
        '<p class="fila pequeno mudo">Nível ' + RS.nivel(x.nivel) + '</p>' +
        '<div id="dialogo-botoes">' + botoesIdeia(x) + '</div>' +
      '</div>');
    veu.addEventListener('click', function (e) {
      const b = e.target.closest('[data-acao]');
      if (!b) return;
      const acao = RS.acoes[b.getAttribute('data-acao')];
      if (acao) acao(b, e);
    });
  }

  RS.acoes['ideia-abrir'] = function (el) { const x = RS.ideia(el.getAttribute('data-id')); if (x) abrirIdeia(x); };

  RS.acoes['ideias-sortear'] = function (el) {
    const lista = filtrarIdeias(el.getAttribute('data-aba'));
    if (!lista.length) { RS.aviso('Nenhuma ideia com esses filtros'); return; }
    abrirIdeia(lista[Math.floor(Math.random() * lista.length)]);
  };

  RS.acoes['ideia-fav'] = function (el) {
    const id = el.getAttribute('data-id');
    if (RS.estado.favoritos[id]) delete RS.estado.favoritos[id];
    else RS.estado.favoritos[id] = 1;
    RS.salvar();
    const noDialogo = !!el.closest('.dialogo');
    if (noDialogo) {
      const caixa = document.getElementById('dialogo-botoes');
      if (caixa) caixa.innerHTML = botoesIdeia(RS.ideia(id));
    }
    if (RS.ui.rota.nome === 'ideias') RS.desenhar();   // o diálogo, se aberto, continua por cima
  };

  RS.acoes['ideia-projeto'] = function (el) {
    const x = RS.ideia(el.getAttribute('data-id'));
    if (!x) return;
    RS.adicionarTarefa('Construir o MVP: ' + x.nome, 'prog');
    RS.aviso('Adicionado aos Afazeres');
  };

  RS.acoes['ideia-mentor'] = function (el) {
    const x = RS.ideia(el.getAttribute('data-id'));
    if (!x) return;
    RS.fecharDialogo();
    RS.abrirMentor('mvp', { ideia: x.nome + ': ' + (x.resumo || x.problema) + ' ' + (x.como || '') });
  };

  /* ===================== MENTOR IA ===================== */

  function estadoMentor() {
    return RS.ui.mentor || (RS.ui.mentor = { modelo: RS.dados.mentor.modelos[0].id, valores: {}, resposta: '', status: '', erro: '' });
  }

  function modeloAtual() {
    const u = estadoMentor();
    return RS.dados.mentor.modelos.find(function (m) { return m.id === u.modelo; }) || RS.dados.mentor.modelos[0];
  }

  RS.abrirMentor = function (modeloId, valores) {
    const u = estadoMentor();
    u.modelo = modeloId;
    u.valores[modeloId] = Object.assign({}, u.valores[modeloId], valores || {});
    u.resposta = ''; u.status = ''; u.erro = '';
    RS.ir('mentor');
  };

  function montarPrompt() {
    const u = estadoMentor();
    const m = modeloAtual();
    const vals = u.valores[m.id] || {};
    let txt = m.texto.replace(/\{(\w+)\}/g, function (_, k) {
      const v = (vals[k] || '').trim();
      return v || '[' + ((m.campos.find(function (c) { return c.k === k; }) || {}).rotulo || k) + ']';
    });
    const ctx = (RS.estado.perfil.contexto || '').trim();
    if (ctx) txt = 'Sobre mim: ' + ctx + '\n\n' + txt;
    return txt;
  }

  function camposPreenchidos() {
    const u = estadoMentor();
    const m = modeloAtual();
    const vals = u.valores[m.id] || {};
    return m.campos.every(function (c) { return c.opcional || (vals[c.k] || '').trim(); });
  }

  function htmlResposta() {
    const u = estadoMentor();
    if (u.status === 'pensando' && !u.resposta) return '<div class="resposta" aria-live="polite"><p class="mudo">Pensando…</p></div>';
    if (!u.resposta && !u.erro) return '';
    return '<div class="resposta" aria-live="polite">' + RS.md(u.resposta) +
      (u.erro ? '<p class="nota">' + esc(u.erro) + '</p>' : '') + '</div>';
  }

  function htmlAcoesMentor() {
    const u = estadoMentor();
    const ia = RS.cap.ia;
    let h = '<div class="fila">' +
      '<button class="btn btn-placa" type="button" data-acao="mentor-copiar">' + RS.icone('copiar', 18) + ' Copiar prompt</button>';
    if (ia) {
      if (u.status === 'pensando') h += '<button class="btn" type="button" data-acao="mentor-parar">' + RS.icone('parar', 16) + ' Parar</button>';
      else h += '<button class="btn" type="button" data-acao="mentor-perguntar"' + (camposPreenchidos() ? '' : ' disabled') + '>' + RS.icone('mentor', 18) + ' Perguntar ao Claude aqui</button>';
    }
    h += '</div>';
    if (ia && !camposPreenchidos() && u.status !== 'pensando') h += '<p class="pequeno mudo">Preencha os campos para perguntar aqui.</p>';
    if (!ia) h += '<p class="pequeno mudo">Cole o prompt no Claude ou na IA que você usa. Publicado no Claude, este app também responde aqui mesmo.</p>';
    return h;
  }

  RS.paginas.mentor = {
    titulo: 'Mentor IA',
    desenhar: function (param) {
      const u = estadoMentor();
      if (param && RS.ui.mentorParam !== param && RS.dados.mentor.modelos.some(function (m) { return m.id === param; })) u.modelo = param;
      RS.ui.mentorParam = param || '';
      const m = modeloAtual();
      const vals = u.valores[m.id] || (u.valores[m.id] = {});
      const M = RS.dados.mentor;

      let h = RS.cabecalho('Mentor IA', 'Use IA para aprender, não para pular etapas',
        'Modelos de prompt que pedem dicas, revisão e perguntas de volta, em vez de só a resposta pronta. Escolha um, preencha e use.');

      h += '<details class="cartao" id="regras-ia"' + RS.aberto('regras-ia', false) + '><summary class="titulo-sec" style="cursor:pointer">Regras de ouro para usar IA do jeito certo</summary>' +
        '<div class="texto" style="margin-top:.75rem"><ol>';
      M.regras.forEach(function (r) { h += '<li>' + esc(r) + '</li>'; });
      h += '</ol></div></details>';

      h += '<section class="pilha" aria-labelledby="mod-t"><h2 class="titulo-sec" id="mod-t">Escolha o modelo</h2><div class="chips">';
      M.modelos.forEach(function (x) {
        h += '<button type="button" class="chip" data-acao="mentor-modelo" data-v="' + x.id + '" aria-pressed="' + (x.id === m.id) + '">' + RS.selo(x.linha) + ' ' + esc(x.nome) + '</button>';
      });
      h += '</div></section>';

      h += '<section class="cartao pilha" aria-labelledby="mf-t"><h2 class="titulo-sec" id="mf-t">' + esc(m.nome) + '</h2><p class="pequeno mudo">' + esc(m.quando) + '</p>';
      m.campos.forEach(function (c) {
        const id = 'mc-' + m.id + '-' + c.k;
        const v = esc(vals[c.k] || '');
        h += '<label class="campo"><span class="rotulo">' + esc(c.rotulo) + (c.opcional ? ' (opcional)' : '') + '</span>' +
          (c.area
            ? '<textarea class="entrada" id="' + id + '" data-digitar="mentor-campo" data-k="' + c.k + '" placeholder="' + esc(c.dica || '') + '"' + (c.mono ? ' style="font-family:var(--f-mono);font-size:.875rem"' : '') + '>' + v + '</textarea>'
            : '<input class="entrada" id="' + id + '" data-digitar="mentor-campo" data-k="' + c.k + '" value="' + v + '" placeholder="' + esc(c.dica || '') + '">') +
          '</label>';
      });
      h += '<div class="pilha-p"><span class="rotulo">Prompt pronto</span><pre class="codigo prompt" id="mentor-prompt">' + esc(montarPrompt()) + '</pre></div>' +
        '<div id="mentor-acoes" class="pilha-p">' + htmlAcoesMentor() + '</div>' +
        '<div id="mentor-resp">' + htmlResposta() + '</div>';
      if (!RS.estado.perfil.contexto) h += '<p class="pequeno mudo">Dica: escreva um contexto sobre você no <a href="#perfil">Perfil</a> e ele entra no começo de todo prompt.</p>';
      h += '</section>';
      return h;
    }
  };

  RS.acoes['mentor-modelo'] = function (el) {
    const u = estadoMentor();
    if (u.status === 'pensando' && u.ctl) u.ctl.abort();
    u.modelo = el.getAttribute('data-v');
    u.resposta = ''; u.status = ''; u.erro = '';
    RS.desenhar();
  };

  RS.acoes['mentor-campo'] = function (el) {
    const u = estadoMentor();
    const m = modeloAtual();
    (u.valores[m.id] || (u.valores[m.id] = {}))[el.getAttribute('data-k')] = el.value;
    const pre = document.getElementById('mentor-prompt');
    if (pre) pre.textContent = montarPrompt();
    if (u.status !== 'pensando') RS.trocar('mentor-acoes', htmlAcoesMentor());
  };

  RS.acoes['mentor-copiar'] = function () { RS.copiar(montarPrompt(), 'Prompt copiado'); };

  const ERROS_IA = {
    not_granted: 'O uso do Claude nesta página não foi permitido. Copie o prompt e use no chat.',
    sampling_disabled: 'O Claude não está disponível para esta conta aqui. Copie o prompt e use no chat.',
    rate_limited: 'Muitas perguntas seguidas ou limite de uso atingido. Espere um pouco e tente de novo.',
    refused: 'O Claude não respondeu a esse pedido. Reformule e tente de novo.',
    prompt_too_large: 'Texto grande demais. Envie um trecho menor.',
    session_expired: 'Sua sessão expirou. Entre de novo no Claude.',
    empty_completion: 'Veio uma resposta vazia. Simplifique o pedido.'
  };

  RS.acoes['mentor-perguntar'] = function () {
    const ia = RS.cap.ia;
    const u = estadoMentor();
    if (!ia || u.status === 'pensando') return;
    const ctl = new AbortController();
    u.ctl = ctl; u.status = 'pensando'; u.resposta = ''; u.erro = '';
    RS.trocar('mentor-acoes', htmlAcoesMentor());
    RS.trocar('mentor-resp', htmlResposta());
    ia(montarPrompt(), {
      signal: ctl.signal,
      cache: false,
      onText: function (x) {
        u.resposta = x.text;
        const caixa = document.querySelector('#mentor-resp .resposta');
        if (caixa) caixa.innerHTML = RS.md(x.text); else RS.trocar('mentor-resp', htmlResposta());
      }
    }).then(function (r) {
      u.resposta = r.text;
      if (r.truncated) u.erro = 'A resposta foi cortada por ser longa. Peça uma parte de cada vez.';
    }, function (e) {
      u.resposta = (e && e.code !== 'refused' && e.text) || '';
      if (e && e.code === 'not_granted') RS.cap.ia = null;
      if (!e || e.code !== 'cancelled') u.erro = ERROS_IA[e && e.code] || 'A conexão falhou no meio da resposta. Tente de novo.';
    }).then(function () {
      u.status = '';
      u.ctl = null;
      if (RS.ui.rota.nome === 'mentor') {
        RS.trocar('mentor-acoes', htmlAcoesMentor());
        RS.trocar('mentor-resp', htmlResposta());
      }
    });
  };

  RS.acoes['mentor-parar'] = function () {
    const u = estadoMentor();
    if (u.ctl) u.ctl.abort();
  };

})(window.RS);
