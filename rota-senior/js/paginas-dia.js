/* Rota Sênior — páginas do dia a dia: Hoje, Cronograma, Afazeres, Mais e Buscar. */
(function (RS) {
  'use strict';

  const esc = RS.esc;
  const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const DIAS_CURTOS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const ORDEM_SEMANA = [1, 2, 3, 4, 5, 6, 0];

  /* Escolhe um item diferente a cada dia, sempre o mesmo durante o dia. */
  RS.doDia = function (lista, desloc) {
    if (!lista || !lista.length) return null;
    const i = RS.diasEntre(new Date(2026, 0, 1), RS.hoje()) + (desloc || 0);
    return lista[((i % lista.length) + lista.length) % lista.length];
  };

  function sub(itens, atual) {
    let h = '<nav class="sub" aria-label="Seções desta página">';
    itens.forEach(function (i) {
      h += '<a href="#' + i.hash + '"' + (i.id === atual ? ' aria-current="page"' : '') + '>' + i.nome + '</a>';
    });
    return h + '</nav>';
  }
  RS.sub = sub;

  /* ===================== HOJE ===================== */

  function boasVindas() {
    const onde = RS.noClaude ? 'na sua conta do Claude' : 'só neste aparelho';
    return '<section class="cartao pilha" aria-labelledby="bv-t">' +
      '<h2 class="titulo-sec" id="bv-t">Comece por aqui</h2>' +
      '<p class="lide">Três informações deixam o plano com a sua cara. Elas ficam salvas ' + onde + ' e você pode mudar depois no Perfil.</p>' +
      '<form class="pilha" data-enviar="comecar">' +
        '<div class="campos">' +
          '<label class="campo"><span class="rotulo">Seu nome</span><input class="entrada" id="bv-nome" name="nome" autocomplete="given-name" required></label>' +
          '<label class="campo"><span class="rotulo">Data do casamento (opcional)</span><input class="entrada" id="bv-casamento" name="casamento" type="date"></label>' +
          '<label class="campo"><span class="rotulo">Cidade (opcional, para as vagas)</span><input class="entrada" id="bv-cidade" name="cidade" autocomplete="address-level2"></label>' +
        '</div>' +
        '<div><button class="btn btn-placa" type="submit">Começar minha rota</button></div>' +
      '</form></section>';
  }

  function paradas() {
    const hoje = RS.hoje();
    const casamento = RS.deISO(RS.estado.perfil.casamento);
    let h = '<div class="paradas" id="paradas" role="list" aria-label="Fases do plano">';
    RS.fases().forEach(function (f) {
      const passou = hoje > f.fim;
      const atual = hoje >= f.inicio && hoje <= f.fim;
      h += '<a role="listitem" class="parada' + (passou ? ' passou' : '') + (atual ? ' atual' : '') + '" href="#rota" style="color:inherit;text-decoration:none">' +
        (atual ? '<span class="aqui">VOCÊ ESTÁ AQUI</span><br>' : '') +
        '<span class="parada-nome">' + esc(f.nome) + '</span><br>' +
        '<span class="parada-data">' + RS.fmt.data(f.inicio) + ' a ' + RS.fmt.data(f.fim) + '</span></a>';
    });
    if (casamento) {
      const faltam = RS.diasEntre(hoje, casamento);
      h += '<a role="listitem" class="parada destino' + (faltam < 0 ? ' passou' : '') + '" href="#casamento" style="color:inherit;text-decoration:none">' +
        '<span class="parada-nome">Casamento</span><br>' +
        '<span class="parada-data">' + RS.fmt.data(casamento, 'media') + '</span></a>';
    }
    return h + '</div>';
  }

  function painel(hoje) {
    const iso = RS.iso(hoje);
    const blocos = RS.blocosDoDia(hoje.getDay());
    const total = blocos.reduce(function (s, b) { return s + b.min; }, 0);
    const feitos = blocos.filter(function (b) { return RS.blocoFeito(iso, b.id); }).length;
    let h = '<section class="painel" aria-labelledby="painel-t">' +
      '<div class="painel-topo"><span id="painel-t">Partidas de hoje</span>' +
      '<span><strong>' + feitos + '/' + blocos.length + '</strong> · ' + RS.fmt.duracao(total) + '</span></div>';
    if (!blocos.length) h += '<p class="painel-vazio">Dia livre no seu ritmo atual. Descanse ou adiante um passo de qualquer trilha.</p>';
    blocos.forEach(function (b) {
      const ok = RS.blocoFeito(iso, b.id);
      const prox = RS.proximoPasso(b.linha);
      h += '<div class="partida' + (ok ? ' feita' : '') + '">' +
        '<div class="partida-hora">' + b.hora + '</div>' +
        '<div>' +
          '<div class="partida-titulo"><span>' + esc(b.titulo) + '</span>' + RS.selo(b.linha) +
            '<span class="partida-min">' + RS.fmt.duracao(b.min) + '</span></div>' +
          (b.como ? '<p class="partida-como">' + esc(b.como) + '</p>' : '') +
          (prox ? '<p class="partida-prox">Próximo passo: <a href="#linha-' + b.linha + '">' + esc(prox.passo.t) + '</a></p>' : '') +
        '</div>' +
        '<label class="alvo"><input class="marca" type="checkbox" id="bloco-' + b.id + '" data-mudar="bloco" data-id="' + b.id + '"' + (ok ? ' checked' : '') + '>' +
        '<span class="so-leitor">Concluir: ' + esc(b.titulo) + '</span></label>' +
      '</div>';
    });
    return h + '</section>';
  }

  function resumo() {
    const e = RS.estado;
    const hoje = RS.hoje();
    const casamento = RS.deISO(e.perfil.casamento);
    const passosFeitos = Object.keys(e.feitos).filter(function (id) { return RS.idx.passos[id]; }).length;
    const totalPassos = Object.keys(RS.idx.passos).length;
    const seq = RS.sequencia();
    let terceiro;
    if (casamento && RS.diasEntre(hoje, casamento) >= 0) {
      terceiro = '<div><b>' + RS.diasEntre(hoje, casamento) + '</b><span>dias até o casamento</span></div>';
    } else {
      const certas = Object.keys(e.quiz).filter(function (k) { return e.quiz[k] === 1; }).length;
      terceiro = '<div><b>' + certas + '</b><span>perguntas certas</span></div>';
    }
    const segunda = RS.maisDias(hoje, -((hoje.getDay() + 6) % 7));
    let pontos = '<div class="semana-pontos" role="img" aria-label="Dias com estudo nesta semana">';
    for (let i = 0; i < 7; i++) {
      const d = RS.maisDias(segunda, i);
      const cls = (RS.diaAtivo(RS.iso(d)) ? 'sim' : '') + (RS.diasEntre(d, hoje) === 0 ? ' hoje' : '');
      pontos += '<i class="' + cls + '">' + 'STQQSSD'.charAt(i) + '</i>';
    }
    pontos += '</div>';
    return '<section class="pilha-p" aria-label="Resumo">' +
      '<div class="resumo">' +
        '<div><b>' + seq + '</b><span>' + (seq === 1 ? 'dia seguido' : 'dias seguidos') + '</span></div>' +
        '<div><b>' + passosFeitos + '</b><span>de ' + totalPassos + ' passos</span></div>' +
        terceiro +
      '</div>' +
      '<div class="fila-entre"><span class="pequeno mudo">Esta semana</span>' + pontos + '</div>' +
    '</section>';
  }

  function faseAtual() {
    const f = RS.faseAtual();
    if (!f) {
      return '<section class="cartao pilha-p"><h2 class="titulo-sec">Depois do sim</h2>' +
        '<p class="lide">As fases do plano terminaram. Agora o caminho é subir de nível.</p>' +
        '<div><a class="btn btn-p" href="#rota-niveis">Ver o caminho até sênior</a></div></section>';
    }
    const hoje = RS.hoje();
    const semanas = Math.max(1, Math.ceil((RS.diasEntre(f.inicio, f.fim) + 1) / 7));
    const semana = Math.min(semanas, Math.max(1, Math.floor(RS.diasEntre(f.inicio, hoje) / 7) + 1));
    const entregas = RS.progresso(f.entregas);
    const passos = RS.progresso(RS.passosDaFase(f));
    return '<section class="cartao pilha-p" aria-labelledby="fase-t">' +
      '<div class="fila-entre"><p class="sobre">Fase ' + f.indice + ' · semana ' + semana + ' de ' + semanas + '</p>' +
      '<a class="pequeno" href="#rota">Ver fases</a></div>' +
      '<h2 class="titulo-sec" id="fase-t">' + esc(f.nome) + '</h2>' +
      '<p class="pequeno">' + esc(f.lema) + '</p>' +
      '<div class="fila-entre pequeno"><span>Entregas ' + entregas.feitos + '/' + entregas.total + '</span><span class="mono">' + entregas.pct + '%</span></div>' +
      RS.barra(entregas.pct, null, 'Entregas da fase') +
      '<div class="fila-entre pequeno"><span>Passos das trilhas ' + passos.feitos + '/' + passos.total + '</span><span class="mono">' + passos.pct + '%</span></div>' +
      RS.barra(passos.pct, null, 'Passos da fase') +
    '</section>';
  }

  function linhasMini() {
    let h = '<section class="cartao" aria-labelledby="lm-t"><div class="fila-entre" style="margin-bottom:.4rem"><h2 class="titulo-sec" id="lm-t">Trilhas</h2><a class="pequeno" href="#linhas">Ver todas</a></div>';
    RS.dados.linhas.forEach(function (l) {
      const p = RS.progresso(RS.passosDaLinha(l));
      h += '<a class="linha-mini" href="#linha-' + l.id + '">' + RS.selo(l.id) +
        '<span class="forte">' + esc(l.nome) + '</span><span class="linha-mini-pct">' + p.pct + '%</span>' +
        RS.barra(p.pct, l.id, l.nome + ': ' + p.pct + '% concluído') + '</a>';
    });
    return h + '</section>';
  }

  function perguntaDoDia() {
    const q = RS.doDia(RS.dados.perguntas);
    if (!q) return '';
    const u = RS.ui.dia || (RS.ui.dia = {});
    if (u.id !== q.id) { u.id = q.id; u.escolha = null; }
    return '<section class="cartao pilha" aria-labelledby="pd-t">' +
      '<div class="fila-entre"><h2 class="titulo-sec" id="pd-t">Pergunta do dia</h2>' + RS.selo(q.l) + '</div>' +
      RS.htmlPergunta(q, u.escolha, 'responder-dia') +
      '<div><a class="btn btn-p" href="#perguntas">Treinar mais perguntas</a></div>' +
    '</section>';
  }

  function inglesDoDia() {
    const f = RS.doDia(RS.dados.frases, 3);
    if (!f) return '';
    return '<section class="cartao pilha-p" aria-labelledby="in-t">' +
      '<div class="fila-entre"><h2 class="titulo-sec" id="in-t">Inglês do dia</h2>' + RS.selo('ing') + '</div>' +
      '<p class="titulo-item" lang="en">' + esc(f.en) + '</p>' +
      '<p class="mudo">' + esc(f.pt) + '</p>' +
      '<div class="fila">' +
        (RS.temVoz() ? '<button class="btn btn-p" type="button" data-acao="ouvir" data-texto="' + esc(f.en) + '">' + RS.icone('som', 16) + ' Ouvir</button>' : '') +
        '<a class="btn btn-p" href="#perguntas-ingles">Praticar frases</a>' +
      '</div></section>';
  }

  function dicaDoDia() {
    const d = RS.doDia(RS.dados.dicas, 5);
    if (!d) return '';
    return '<section class="faixa pilha-p" aria-labelledby="dd-t">' +
      '<div class="fila">' + RS.selo(d.l) + '<h2 class="rotulo" id="dd-t">Dica do dia</h2></div>' +
      '<p>' + esc(d.t) + '</p></section>';
  }

  function proximosDoCasamento() {
    if (!RS.estado.perfil.casamento) return '';
    const linha = RS.idx.linhas.cas;
    if (!linha) return '';
    const pendentes = RS.passosDaLinha(linha).filter(function (p) { return !RS.feito(p.id); }).slice(0, 3);
    if (!pendentes.length) return '';
    let h = '<section class="cartao" aria-labelledby="pc-t"><div class="fila-entre"><h2 class="titulo-sec" id="pc-t">Casamento: próximos passos</h2><a class="pequeno" href="#casamento">Abrir</a></div>';
    pendentes.forEach(function (p) { h += RS.htmlPasso(p); });
    return h + '</section>';
  }

  RS.paginas.hoje = {
    titulo: 'Hoje',
    desenhar: function () {
      const e = RS.estado;
      const hoje = RS.hoje();
      const hora = new Date().getHours();
      const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
      const nome = e.perfil.nome ? ', ' + esc(e.perfil.nome.trim().split(' ')[0]) : '';
      let h = RS.cabecalho(RS.fmt.data(hoje, 'longa'), saudacao + nome);
      if (!e.perfil.pronto) h += boasVindas();
      h += paradas();
      h += resumo();
      h += '<div class="duas-colunas">' +
        '<div class="pilha">' + painel(hoje) + perguntaDoDia() + inglesDoDia() + '</div>' +
        '<div class="pilha">' + faseAtual() + linhasMini() + proximosDoCasamento() + dicaDoDia() + '</div>' +
      '</div>';
      return h;
    },
    depois: function (el) {
      const faixa = el.querySelector('#paradas');
      const atual = faixa && faixa.querySelector('.parada.atual');
      if (atual) faixa.scrollLeft = Math.max(0, atual.offsetLeft - faixa.offsetLeft - 8);
    }
  };

  RS.acoes.comecar = function (form) {
    const p = RS.estado.perfil;
    p.nome = form.elements.nome.value.trim();
    p.casamento = form.elements.casamento.value || '';
    p.cidade = form.elements.cidade.value.trim();
    p.inicio = RS.iso(RS.hoje());
    p.pronto = true;
    RS.salvar();
    RS.desenhar();
    RS.aviso('Plano criado. Boa viagem!');
  };

  RS.acoes.bloco = function (el) {
    RS.marcarBloco(RS.iso(RS.hoje()), el.getAttribute('data-id'), el.checked);
    RS.desenhar();
  };

  RS.acoes.passo = function (el) {
    RS.marcar(el.getAttribute('data-id'), el.checked);
    RS.desenhar();
  };

  RS.acoes['responder-dia'] = function (el) {
    const u = RS.ui.dia;
    const q = RS.idx.perguntas[u.id];
    if (!q || u.escolha != null) return;
    u.escolha = Number(el.getAttribute('data-i'));
    RS.estado.quiz[q.id] = u.escolha === q.c ? 1 : 0;
    RS.registrarDia('quiz');
    RS.salvar();
    RS.desenhar();
  };

  RS.acoes.ouvir = function (el) { RS.falar(el.getAttribute('data-texto'), 'en'); };

  /* ===================== CRONOGRAMA ===================== */

  function htmlFases() {
    const hoje = RS.hoje();
    let h = '<ol class="estacoes" style="--cor: var(--tinta-2)">';
    RS.fases().forEach(function (f) {
      const atual = hoje >= f.inicio && hoje <= f.fim;
      const passou = hoje > f.fim;
      const entregas = RS.progresso(f.entregas);
      const semanas = Math.max(1, Math.round((RS.diasEntre(f.inicio, f.fim) + 1) / 7));
      h += '<li class="estacao' + (passou || entregas.pct === 100 ? ' completa' : '') + (atual ? ' atual' : '') + '">' +
        '<span class="estacao-ponto"></span>' +
        '<details id="fase-' + f.id + '"' + RS.aberto('fase-' + f.id, atual) + '>' +
        '<summary>' +
          '<span class="estacao-nome">Fase ' + f.indice + ' · ' + esc(f.nome) + (atual ? ' <span class="aqui" style="vertical-align:middle">AGORA</span>' : '') + '</span>' +
          '<span class="estacao-conta">' + entregas.feitos + '/' + entregas.total + '</span>' +
          '<span class="estacao-meta">' + RS.fmt.data(f.inicio, 'media') + ' a ' + RS.fmt.data(f.fim, 'media') + ' · ' + semanas + (semanas === 1 ? ' semana' : ' semanas') + '</span>' +
        '</summary>' +
        '<div class="estacao-corpo pilha">' +
          '<p>' + esc(f.resumo) + '</p>' +
          '<div><h3 class="rotulo">Entregas da fase</h3>';
      f.entregas.forEach(function (en) { h += RS.htmlPasso(en); });
      h += '</div><div class="pilha-p"><h3 class="rotulo">Estações para concluir nesta fase</h3><div class="chips">';
      (f.estacoes || []).forEach(function (idEst) {
        const est = RS.idx.estacoes[idEst];
        if (!est) return;
        const p = RS.progresso(est.passos);
        h += '<a class="chip" href="#linha-' + est.linha + '">' + RS.selo(est.linha) + ' ' + esc(est.nome) +
          ' <span class="mono mudo">' + p.feitos + '/' + p.total + '</span></a>';
      });
      h += '</div></div>' +
        '<p class="nota"><strong>Ritmo:</strong> ' + esc(f.ritmo) + '</p>' +
        '</div></details></li>';
    });
    return h + '</ol>';
  }

  /* Blocos da rotina no ritmo atual, uma entrada por bloco (para a agenda). */
  function blocosDaRotina() {
    const perfil = RS.estado.perfil;
    const lista = [];
    RS.dados.rotina.blocos.forEach(function (b) {
      const min = typeof b.min === 'number' ? b.min : (b.min[perfil.ritmo] || 0);
      if (!min) return;
      const base = perfil.horarios[b.ancora] || RS.dados.rotina.ancoras[b.ancora].padrao;
      lista.push({ id: b.id, dias: b.dias, hora: RS.somaHora(base, b.desloc || 0), min: min, titulo: b.titulo, como: b.como || '', linha: b.linha });
    });
    return lista;
  }

  function proximaData(dias) {
    let d = RS.hoje();
    for (let i = 0; i < 7 && dias.indexOf(d.getDay()) < 0; i++) d = RS.maisDias(d, 1);
    return d;
  }

  const SIGLAS_ICS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  function linkAgenda(b) {
    const data = RS.iso(proximaData(b.dias)).replace(/-/g, '');
    const ini = data + 'T' + b.hora.replace(':', '') + '00';
    const fim = data + 'T' + RS.somaHora(b.hora, b.min).replace(':', '') + '00';
    const p = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Rota Sênior · ' + b.titulo,
      dates: ini + '/' + fim,
      details: b.como,
      recur: 'RRULE:FREQ=WEEKLY;BYDAY=' + b.dias.map(function (x) { return SIGLAS_ICS[x]; }).join(',')
    });
    return 'https://calendar.google.com/calendar/render?' + p.toString();
  }

  function gerarICS() {
    const agora = new Date();
    const carimbo = agora.getUTCFullYear() + RS.pad(agora.getUTCMonth() + 1) + RS.pad(agora.getUTCDate()) + 'T' +
      RS.pad(agora.getUTCHours()) + RS.pad(agora.getUTCMinutes()) + RS.pad(agora.getUTCSeconds()) + 'Z';
    const limpar = function (s) { return String(s).replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n'); };
    const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Rota Senior//PT-BR', 'CALSCALE:GREGORIAN'];
    blocosDaRotina().forEach(function (b) {
      const data = RS.iso(proximaData(b.dias)).replace(/-/g, '');
      L.push('BEGIN:VEVENT',
        'UID:' + b.id + '@rota-senior',
        'DTSTAMP:' + carimbo,
        'DTSTART:' + data + 'T' + b.hora.replace(':', '') + '00',
        'DTEND:' + data + 'T' + RS.somaHora(b.hora, b.min).replace(':', '') + '00',
        'RRULE:FREQ=WEEKLY;BYDAY=' + b.dias.map(function (x) { return SIGLAS_ICS[x]; }).join(','),
        'SUMMARY:' + limpar('Rota Sênior · ' + b.titulo),
        'DESCRIPTION:' + limpar(b.como),
        'END:VEVENT');
    });
    L.push('END:VCALENDAR');
    return L.join('\r\n');
  }

  function htmlSemana() {
    const perfil = RS.estado.perfil;
    const rot = RS.dados.rotina;
    let h = '<section class="pilha" aria-labelledby="rit-t"><h2 class="titulo-sec" id="rit-t">Ritmo</h2><div class="chips">';
    Object.keys(rot.ritmos).forEach(function (k) {
      h += '<button type="button" class="chip" data-acao="ritmo" data-v="' + k + '" aria-pressed="' + (perfil.ritmo === k) + '">' + esc(rot.ritmos[k].nome) + '</button>';
    });
    h += '</div><p class="lide">' + esc(rot.ritmos[perfil.ritmo].resumo) + '</p></section>';

    h += '<section class="pilha" aria-labelledby="hor-t"><h2 class="titulo-sec" id="hor-t">Seus horários</h2>' +
      '<p class="lide">Ajuste os cinco pontos de partida à sua vida real (faculdade, estágio, transporte). O painel de Hoje segue estes horários.</p><div class="campos">';
    Object.keys(rot.ancoras).forEach(function (k) {
      h += '<label class="campo"><span class="rotulo">' + esc(rot.ancoras[k].nome) + '</span>' +
        '<input class="entrada mono" type="time" id="hor-' + k + '" data-mudar="horario" data-k="' + k + '" value="' + esc(perfil.horarios[k]) + '"></label>';
    });
    h += '</div></section>';

    let totalSemana = 0;
    let grade = '<div class="grade">';
    ORDEM_SEMANA.forEach(function (d) {
      const blocos = RS.blocosDoDia(d);
      const total = blocos.reduce(function (s, b) { return s + b.min; }, 0);
      totalSemana += total;
      grade += '<div class="cartao pilha-p"><div class="fila-entre"><h3 class="estacao-nome">' + DIAS[d] + '</h3><span class="mono pequeno mudo">' + RS.fmt.duracao(total) + '</span></div>';
      blocos.forEach(function (b) {
        grade += '<div class="fila" style="align-items:flex-start;flex-wrap:nowrap">' +
          '<span class="mono forte" style="min-width:3.1rem">' + b.hora + '</span>' + RS.selo(b.linha) +
          '<span class="cresce"><span class="forte">' + esc(b.titulo) + '</span> <span class="mono pequeno mudo">' + RS.fmt.duracao(b.min) + '</span>' +
          (b.como ? '<br><span class="pequeno mudo">' + esc(b.como) + '</span>' : '') + '</span></div>';
      });
      grade += '</div>';
    });
    grade += '</div>';
    h += '<section class="pilha" aria-labelledby="sem-t"><div class="fila-entre"><h2 class="titulo-sec" id="sem-t">Semana modelo</h2>' +
      '<span class="etiqueta">' + RS.fmt.duracao(totalSemana) + ' por semana</span></div>' + grade + '</section>';

    h += '<section class="pilha" aria-labelledby="ag-t"><h2 class="titulo-sec" id="ag-t">Colocar na agenda</h2>' +
      '<p class="lide">Cada botão abre o Google Agenda com o evento já repetindo toda semana. Você confere e salva.</p><div class="cartao">';
    blocosDaRotina().forEach(function (b) {
      const dias = b.dias.length === 5 ? 'seg a sex' : b.dias.map(function (x) { return DIAS_CURTOS[x]; }).join(', ');
      h += '<div class="item"><div><span class="forte">' + esc(b.titulo) + '</span><br><span class="mono pequeno mudo">' + dias + ' · ' + b.hora + ' · ' + RS.fmt.duracao(b.min) + '</span></div>' +
        RS.externo(linkAgenda(b), RS.icone('agenda', 15) + ' Agenda') + '</div>';
    });
    h += '</div>';
    if (!RS.noClaude || RS.cap.baixar) h += '<div><button class="btn" type="button" data-acao="baixar-ics">' + RS.icone('baixar', 18) + ' Baixar arquivo .ics (Outlook, Apple, Google)</button></div>';
    h += '</section>';
    return h;
  }

  function htmlNiveis() {
    let h = '<p class="nota"><strong>Sem atalho, com método:</strong> ' + esc(RS.dados.niveis.aviso) + '</p><ol class="estacoes" style="--cor: var(--l-car)">';
    RS.dados.niveis.lista.forEach(function (n, i) {
      h += '<li class="estacao"><span class="estacao-ponto"></span>' +
        '<details id="nivel-' + i + '"' + RS.aberto('nivel-' + i, i === 0) + '><summary>' +
        '<span class="estacao-nome">' + esc(n.nome) + '</span><span class="estacao-conta">' + esc(n.quando) + '</span>' +
        '<span class="estacao-meta">' + esc(n.resumo) + '</span></summary>' +
        '<div class="estacao-corpo texto"><h3 class="rotulo">O que você precisa provar</h3><ul>';
      n.provas.forEach(function (p) { h += '<li>' + esc(p) + '</li>'; });
      h += '</ul><h3 class="rotulo">Como chegar mais rápido</h3><ul>';
      n.como.forEach(function (p) { h += '<li>' + esc(p) + '</li>'; });
      h += '</ul></div></details></li>';
    });
    return h + '</ol>';
  }

  RS.paginas.rota = {
    titulo: 'Cronograma',
    desenhar: function (param) {
      const aba = param === 'semana' ? 'semana' : param === 'niveis' ? 'niveis' : 'fases';
      const casamento = RS.deISO(RS.estado.perfil.casamento);
      const lide = casamento
        ? 'Seis fases daqui até ' + RS.fmt.data(casamento, 'media') + ', com uma rotina semanal que cabe entre faculdade e estágio.'
        : 'Seis fases com uma rotina semanal que cabe entre faculdade e estágio.';
      let h = RS.cabecalho('Cronograma', 'Rota por fases', lide);
      h += sub([
        { id: 'fases', nome: 'Fases', hash: 'rota' },
        { id: 'semana', nome: 'Semana', hash: 'rota-semana' },
        { id: 'niveis', nome: 'Até sênior', hash: 'rota-niveis' }
      ], aba);
      if (aba === 'fases') h += htmlFases();
      else if (aba === 'semana') h += htmlSemana();
      else h += htmlNiveis();
      return h;
    }
  };

  RS.acoes.ritmo = function (el) {
    RS.estado.perfil.ritmo = el.getAttribute('data-v');
    RS.salvar();
    RS.desenhar();
  };

  RS.acoes.horario = function (el) {
    if (!/^\d{2}:\d{2}$/.test(el.value)) return;
    RS.estado.perfil.horarios[el.getAttribute('data-k')] = el.value;
    RS.salvar();
    RS.desenhar();
  };

  RS.acoes['baixar-ics'] = function () {
    RS.baixar('rota-senior-rotina.ics', gerarICS()).then(function (ok) {
      if (!ok) RS.aviso('Não foi possível gerar o arquivo neste navegador.');
    });
  };

  /* ===================== AFAZERES ===================== */

  function htmlTarefa(t) {
    return '<li class="tarefa' + (t.feito ? ' feita' : '') + '">' +
      '<label class="alvo"><input class="marca" type="checkbox" id="tarefa-' + t.id + '" data-mudar="tarefa-marcar" data-id="' + t.id + '"' + (t.feito ? ' checked' : '') + '>' +
      '<span class="so-leitor">Concluir</span></label>' +
      '<span class="tarefa-txt">' + (t.linha ? RS.selo(t.linha) + ' ' : '') + esc(t.texto) + '</span>' +
      '<button class="btn-icone" type="button" data-acao="tarefa-apagar" data-id="' + t.id + '" aria-label="Apagar: ' + esc(t.texto) + '">' + RS.icone('lixo', 18) + '</button></li>';
  }

  RS.adicionarTarefa = function (texto, linha) {
    RS.estado.tarefas.unshift({ id: RS.novoId(), texto: texto, feito: false, linha: linha || '', criada: RS.iso(RS.hoje()) });
    RS.salvar();
  };

  RS.paginas.tarefas = {
    titulo: 'Afazeres',
    desenhar: function () {
      const tarefas = RS.estado.tarefas;
      const abertas = tarefas.filter(function (t) { return !t.feito; });
      const feitas = tarefas.filter(function (t) { return t.feito; });
      let opcoes = '<option value="">Sem trilha</option>';
      RS.dados.linhas.forEach(function (l) { opcoes += '<option value="' + l.id + '">' + esc(l.nome) + '</option>'; });
      let h = RS.cabecalho('Afazeres', 'Sua lista', 'O que não é passo de trilha mas precisa sair do papel: ligar para o cartório, pedir feedback, pagar o buffet.');
      h += '<form class="cartao pilha" data-enviar="tarefa-nova">' +
        '<div class="fila" style="align-items:flex-end">' +
          '<label class="campo cresce"><span class="rotulo">Novo afazer</span><input class="entrada" id="tarefa-texto" name="texto" maxlength="200" placeholder="Ex.: pedir 3 orçamentos de buffet" required></label>' +
          '<label class="campo" style="flex:0 1 11rem"><span class="rotulo">Trilha</span><select class="entrada" id="tarefa-linha" name="linha">' + opcoes + '</select></label>' +
          '<button class="btn btn-placa" type="submit">' + RS.icone('mais', 18) + ' Adicionar</button>' +
        '</div></form>';

      h += '<section class="pilha" aria-labelledby="ta-t"><h2 class="titulo-sec" id="ta-t">Abertos (' + abertas.length + ')</h2>';
      if (abertas.length) h += '<ul class="cartao">' + abertas.map(htmlTarefa).join('') + '</ul>';
      else h += '<p class="faixa">Nada pendente por aqui. Os passos das trilhas e as entregas da fase continuam no painel de Hoje e no Cronograma.</p>';
      h += '</section>';

      const f = RS.faseAtual();
      if (f) {
        h += '<section class="pilha" aria-labelledby="te-t"><h2 class="titulo-sec" id="te-t">Entregas da fase ' + f.indice + ' · ' + esc(f.nome) + '</h2><div class="cartao">';
        f.entregas.forEach(function (en) { h += RS.htmlPasso(en); });
        h += '</div></section>';
      }

      if (feitas.length) {
        h += '<section class="pilha" aria-labelledby="tf-t"><div class="fila-entre"><h2 class="titulo-sec" id="tf-t">Concluídos (' + feitas.length + ')</h2>' +
          '<button class="btn btn-p" type="button" data-acao="tarefas-limpar">Apagar concluídos</button></div>' +
          '<ul class="cartao">' + feitas.map(htmlTarefa).join('') + '</ul></section>';
      }
      return h;
    }
  };

  RS.acoes['tarefa-nova'] = function (form) {
    const texto = form.elements.texto.value.trim();
    if (!texto) return;
    RS.adicionarTarefa(texto, form.elements.linha.value);
    RS.desenhar();
    const campo = document.getElementById('tarefa-texto');
    if (campo) campo.focus();
  };

  RS.acoes['tarefa-marcar'] = function (el) {
    const t = RS.estado.tarefas.find(function (x) { return x.id === el.getAttribute('data-id'); });
    if (!t) return;
    t.feito = el.checked;
    if (t.feito) RS.registrarDia('tarefa');
    RS.salvar();
    RS.desenhar();
  };

  RS.acoes['tarefa-apagar'] = function (el) {
    const id = el.getAttribute('data-id');
    RS.estado.tarefas = RS.estado.tarefas.filter(function (x) { return x.id !== id; });
    RS.salvar();
    RS.desenhar();
  };

  RS.acoes['tarefas-limpar'] = function () {
    RS.confirmar({
      titulo: 'Apagar os concluídos?',
      texto: 'Os afazeres já marcados saem da lista. Os abertos continuam.',
      sim: 'Apagar',
      aoConfirmar: function () {
        RS.estado.tarefas = RS.estado.tarefas.filter(function (x) { return !x.feito; });
        RS.salvar();
        RS.desenhar();
      }
    });
  };

  /* ===================== MAIS (menu no celular) ===================== */

  RS.paginas.mais = {
    titulo: 'Mais',
    desenhar: function () {
      let h = RS.cabecalho('Menu', 'Todas as seções') + '<div class="menu-grade">';
      RS.NAV.forEach(function (n) {
        if (n.grupo) return;
        h += '<a href="#' + n.id + '">' + RS.icone(n.icone, 24) + '<span>' + n.nome + '<br><small>' + esc(n.desc) + '</small></span></a>';
      });
      return h + '</div>';
    }
  };

  /* ===================== BUSCAR ===================== */

  function resultadosBusca() {
    const q = RS.plano((RS.ui.busca || {}).q || '').trim();
    if (q.length < 2) return '<p class="faixa">Digite pelo menos 2 letras. A busca olha trilhas, biblioteca e as 300 ideias.</p>';
    const tem = function () {
      for (let i = 0; i < arguments.length; i++) if (RS.plano(arguments[i]).indexOf(q) >= 0) return true;
      return false;
    };
    const LIM = 8;
    let h = '';

    const passos = Object.keys(RS.idx.passos).map(function (k) { return RS.idx.passos[k]; }).filter(function (p) { return tem(p.t); });
    if (passos.length) {
      h += '<section class="pilha-p"><h2 class="titulo-sec">Trilhas (' + passos.length + ')</h2><div class="cartao">';
      passos.slice(0, LIM).forEach(function (p) {
        h += '<a class="linha-mini" style="grid-template-columns:auto minmax(0,1fr)" href="#linha-' + p.linha + '">' + RS.selo(p.linha) + '<span>' + esc(p.t) + '</span></a>';
      });
      h += '</div></section>';
    }

    const recursos = RS.dados.recursos.filter(function (r) { return tem(r.titulo, r.autor, r.nota); });
    if (recursos.length) {
      h += '<section class="pilha-p"><h2 class="titulo-sec">Biblioteca (' + recursos.length + ')</h2><div class="cartao">';
      recursos.slice(0, LIM).forEach(function (r) {
        h += '<div class="item"><div><span class="forte">' + esc(r.titulo) + '</span><br><span class="pequeno mudo">' + esc(r.autor || '') + '</span></div>' + RS.externo(RS.urlRecurso(r), 'Abrir') + '</div>';
      });
      h += '</div></section>';
    }

    const ideias = RS.dados.ideiasSaas.filter(function (x) { return tem(x.nome, x.cat, x.resumo, x.como); })
      .concat(RS.dados.ideiasAreas.filter(function (x) { return tem(x.nome, x.area, x.problema, x.solucao, x.como); }));
    if (ideias.length) {
      h += '<section class="pilha-p"><h2 class="titulo-sec">Ideias (' + ideias.length + ')</h2><div class="cartao">';
      ideias.slice(0, LIM).forEach(function (x) {
        h += '<div class="item"><div><span class="forte">' + esc(x.nome) + '</span><br><span class="pequeno mudo">' + esc(x.cat || x.area) + '</span></div>' +
          '<button class="btn btn-p" type="button" data-acao="ideia-abrir" data-id="' + x.id + '">Ver</button></div>';
      });
      h += '</div></section>';
    }

    return h || '<p class="faixa">Nada encontrado para essa busca. Tente outra palavra.</p>';
  }

  RS.paginas.busca = {
    titulo: 'Buscar',
    desenhar: function () {
      const u = RS.ui.busca || (RS.ui.busca = { q: '' });
      return RS.cabecalho('Buscar', 'Procure em tudo') +
        '<label class="campo"><span class="rotulo">O que você procura?</span>' +
        '<input class="entrada" type="search" id="busca-q" data-digitar="busca" value="' + esc(u.q) + '" placeholder="Ex.: React, cartório, restaurante, SQL" autocomplete="off"></label>' +
        '<div class="pilha" id="busca-res">' + resultadosBusca() + '</div>';
    },
    depois: function (el) {
      const campo = el.querySelector('#busca-q');
      if (campo && !RS.ui.busca.q) campo.focus({ preventScroll: true });
    }
  };

  RS.acoes.busca = function (el) {
    RS.ui.busca.q = el.value;
    RS.trocar('busca-res', resultadosBusca());
  };

})(window.RS);
