/* Rota Sênior — páginas de estudo: Trilhas, uma trilha, Biblioteca e Perguntas. */
(function (RS) {
  'use strict';

  const esc = RS.esc;

  /* ===================== Peças compartilhadas ===================== */

  /* Linha de um passo (ou entrega) com caixa de marcar e link do material. */
  RS.htmlPasso = function (p) {
    const ok = RS.feito(p.id);
    const r = p.r ? RS.idx.recursos[p.r] : null;
    let info = '';
    if (p.min) info += '<span>~' + RS.fmt.duracao(p.min) + '</span>';
    if (r) info += '<span>' + esc(r.titulo) + '</span>';
    return '<div class="passo' + (ok ? ' feito' : '') + '">' +
      '<label class="alvo"><input class="marca" type="checkbox" id="p-' + p.id + '" data-mudar="passo" data-id="' + p.id + '"' + (ok ? ' checked' : '') + '>' +
      '<span class="so-leitor">Concluir</span></label>' +
      '<div class="passo-txt"><span>' + esc(p.t) + '</span>' + (info ? '<div class="passo-info">' + info + '</div>' : '') + '</div>' +
      (r ? RS.externo(RS.urlRecurso(r), 'Abrir') : '<span></span>') +
    '</div>';
  };

  /* Pergunta de múltipla escolha. escolha = índice marcado ou null. */
  RS.htmlPergunta = function (q, escolha, acao) {
    const respondida = escolha != null;
    let h = '<p class="titulo-item">' + esc(q.p) + '</p><div class="opcoes">';
    q.o.forEach(function (op, i) {
      let cls = 'opcao';
      if (respondida) {
        if (i === q.c) cls += ' certa';
        else if (i === escolha) cls += ' errada';
      }
      h += '<button type="button" class="' + cls + '" data-acao="' + acao + '" data-i="' + i + '"' + (respondida ? ' disabled' : '') + '>' +
        '<span class="letra">' + 'ABCD'.charAt(i) + '</span><span>' + esc(op) + '</span></button>';
    });
    h += '</div>';
    if (respondida) {
      const certo = escolha === q.c;
      h += '<div class="nota' + (certo ? ' nota-ok' : '') + '" role="status"><strong>' + (certo ? 'Certo.' : 'Não foi dessa vez.') + '</strong> ' + esc(q.e) + '</div>';
    }
    return h;
  };

  /* Para a trilha do casamento: cada estação cobre uma janela de meses antes da data. */
  RS.janelaCasamento = function (est) {
    const casamento = RS.deISO(RS.estado.perfil.casamento);
    if (!est.antes || !casamento) return null;
    return { inicio: RS.maisMeses(casamento, -est.antes[0]), fim: RS.maisMeses(casamento, -est.antes[1]) };
  };

  /* Estações de uma linha, com a próxima pendente aberta. */
  RS.htmlEstacoes = function (l) {
    const prox = RS.proximoPasso(l.id);
    let h = '';
    h += '<ol class="estacoes" style="--cor: var(--l-' + l.id + ')">';
    l.estacoes.forEach(function (est) {
      const pe = RS.progresso(est.passos);
      const aberta = prox ? prox.estacao.id === est.id : false;
      const janela = RS.janelaCasamento(est);
      h += '<li class="estacao' + (pe.pct === 100 ? ' completa' : '') + '"><span class="estacao-ponto"></span>' +
        '<details id="est-' + est.id + '"' + RS.aberto('est-' + est.id, aberta) + '><summary>' +
        '<span class="estacao-nome">' + est.numero + '. ' + esc(est.nome) + '</span>' +
        '<span class="estacao-conta">' + pe.feitos + '/' + pe.total + '</span>' +
        '<span class="estacao-meta">' + (janela ? '<span class="mono">' + RS.fmt.data(janela.inicio, 'media') + ' a ' + RS.fmt.data(janela.fim, 'media') + '</span> · ' : '') + esc(est.meta) + '</span>' +
        '</summary><div class="estacao-corpo">';
      est.passos.forEach(function (ps) { h += RS.htmlPasso(ps); });
      h += '</div></details></li>';
    });
    h += '</ol>';

    return h;
  };

  /* ===================== TRILHAS ===================== */

  RS.paginas.linhas = {
    titulo: 'Trilhas',
    desenhar: function () {
      let h = RS.cabecalho('Trilhas', 'Oito linhas, uma rota',
        'Cada trilha é uma linha com estações em ordem. Marque os passos: o painel de Hoje sempre mostra o próximo.');
      h += '<div class="grade">';
      RS.dados.linhas.forEach(function (l) {
        const p = RS.progresso(RS.passosDaLinha(l));
        const prox = RS.proximoPasso(l.id);
        h += '<a class="cartao cartao-link linha-cartao" href="#linha-' + l.id + '">' +
          RS.selo(l.id, true) +
          '<div><h2 class="titulo-sec">' + esc(l.nome) + '</h2><p class="pequeno mudo">' + esc(l.lema) + '</p></div>' +
          RS.barra(p.pct, l.id, l.nome + ': ' + p.pct + '% concluído') +
          '<p class="pequeno" style="grid-column:1/-1"><span class="mono">' + p.feitos + '/' + p.total + '</span> passos' +
          (prox ? ' · agora: ' + esc(prox.estacao.nome) : ' · linha concluída') + '</p></a>';
      });
      return h + '</div>';
    }
  };

  RS.paginas.linha = {
    titulo: 'Trilha',
    desenhar: function (param) {
      const l = RS.idx.linhas[param];
      if (!l) return RS.paginas.linhas.desenhar();
      const p = RS.progresso(RS.passosDaLinha(l));
      const prox = RS.proximoPasso(l.id);
      const materiais = RS.dados.recursos.filter(function (r) { return r.linha === l.id; }).length;
      const perguntas = RS.dados.perguntas.filter(function (q) { return q.l === l.id; }).length;

      let h = '<div><a class="btn btn-liso btn-p" href="#linhas">Todas as trilhas</a></div>' +
        '<header class="fila" style="align-items:flex-start;flex-wrap:nowrap;gap:.9rem">' + RS.selo(l.id, true) +
          '<div class="pilha-p cresce"><p class="sobre">Linha ' + esc(l.sigla) + ' · ' + l.estacoes.length + ' estações</p>' +
          '<h1 class="titulo-pg">' + esc(l.nome) + '</h1><p class="lide">' + esc(l.porque) + '</p></div></header>';

      h += '<section class="pilha-p" aria-label="Progresso">' +
        '<div class="fila-entre"><span class="forte">' + p.feitos + ' de ' + p.total + ' passos</span><span class="mono">' + p.pct + '%</span></div>' +
        RS.barra(p.pct, l.id, 'Progresso da trilha') +
        '<div class="fila">' +
          (perguntas ? '<button class="btn btn-p" type="button" data-acao="quiz-da-linha" data-l="' + l.id + '">' + RS.icone('perguntas', 16) + ' Treinar ' + perguntas + ' perguntas</button>' : '') +
          (materiais ? '<a class="btn btn-p" href="#biblioteca-' + l.id + '">' + RS.icone('biblioteca', 16) + ' ' + materiais + ' materiais</a>' : '') +
          (l.id === 'cas' ? '<a class="btn btn-p" href="#casamento">' + RS.icone('casamento', 16) + ' Orçamento e cartório</a>' : '') +
          (l.id === 'fin' ? '<a class="btn btn-p" href="#financas">' + RS.icone('financas', 16) + ' Calculadoras</a>' : '') +
          (l.id === 'car' ? '<a class="btn btn-p" href="#vagas">' + RS.icone('vagas', 16) + ' Vagas</a>' : '') +
        '</div></section>';

      h += RS.htmlEstacoes(l);

      const dicas = (RS.dados.dicas || []).filter(function (d) { return d.l === l.id; });
      if (dicas.length) {
        h += '<section class="pilha" aria-labelledby="dicas-t"><h2 class="titulo-sec" id="dicas-t">Dicas de quem já passou por isso</h2><div class="cartao texto"><ul>';
        dicas.forEach(function (d) { h += '<li>' + esc(d.t) + '</li>'; });
        h += '</ul></div></section>';
      }
      return h;
    }
  };

  RS.acoes['quiz-da-linha'] = function (el) {
    RS.ui.quiz = { linha: el.getAttribute('data-l'), ativa: false };
    RS.ir('perguntas');
  };

  /* ===================== BIBLIOTECA ===================== */

  const TIPOS = {
    video: 'Videoaula', curso: 'Curso', livro: 'PDF ou livro', pratica: 'Prática',
    site: 'Referência', ferramenta: 'Ferramenta', canal: 'Canal', lei: 'Lei'
  };
  RS.TIPOS = TIPOS;

  function estadoBib() {
    return RS.ui.bib || (RS.ui.bib = { q: '', tipo: '', linha: '', cert: false, pt: false, limite: 24, tocando: '' });
  }

  function htmlVideo(r, tocando) {
    const titulo = esc(r.titulo);
    if (!RS.podeEmbutir) {
      // dentro do Claude (ou abrindo o arquivo direto) não dá para embutir o YouTube: o cartão abre o vídeo em outra aba
      return '<div class="video"><a class="video-capa" href="' + esc(RS.urlRecurso(r)) + '" target="_blank" rel="noopener noreferrer" style="text-decoration:none">' +
        '<span class="toca">' + RS.icone('tocar', 26) + '</span><span>' + titulo + '</span><span class="partida-min">abre no YouTube</span></a></div>';
    }
    if (tocando) {
      const src = r.yt
        ? 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(r.yt) + '?autoplay=1&rel=0'
        : 'https://www.youtube-nocookie.com/embed/videoseries?list=' + encodeURIComponent(r.pl) + '&autoplay=1&rel=0';
      return '<div class="video"><iframe src="' + src + '" title="' + titulo + '" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    }
    return '<div class="video"><button class="video-capa" type="button" data-acao="tocar" data-id="' + r.id + '">' +
      '<span class="toca">' + RS.icone('tocar', 26) + '</span><span>' + titulo + '</span>' +
      '<span class="partida-min">' + (r.pl ? 'playlist completa' : 'assistir aqui') + '</span></button></div>';
  }

  function htmlRecurso(r) {
    const u = estadoBib();
    const idFeito = 'r:' + r.id;
    const ok = RS.feito(idFeito);
    const temVideo = !!(r.yt || r.pl);
    let tags = '<span class="etiqueta">' + (TIPOS[r.tipo] || r.tipo) + '</span>';
    if (r.cert) tags += '<span class="etiqueta etiqueta-ok">' + RS.icone('selo', 12) + ' Certificado</span>';
    if (r.idioma === 'en') tags += '<span class="etiqueta">Em inglês</span>';
    if (r.conta) tags += '<span class="etiqueta etiqueta-alerta">Pede cadastro</span>';
    return '<article class="cartao recurso' + (ok ? ' feito' : '') + '">' +
      '<div class="fila">' + RS.selo(r.linha) + tags + '</div>' +
      '<h3 class="titulo-item">' + esc(r.titulo) + '</h3>' +
      (r.autor ? '<p class="pequeno mudo">' + esc(r.autor) + '</p>' : '') +
      (r.nota ? '<p class="pequeno">' + esc(r.nota) + '</p>' : '') +
      (temVideo && u.tocando === r.id && RS.podeEmbutir ? htmlVideo(r, true) : '') +
      '<div class="recurso-pe">' +
        '<div class="fila">' + RS.externo(RS.urlRecurso(r), temVideo ? 'YouTube' : 'Abrir') +
          (temVideo && RS.podeEmbutir && u.tocando !== r.id ? '<button class="btn btn-p" type="button" data-acao="tocar" data-id="' + r.id + '">' + RS.icone('tocar', 14) + ' Assistir aqui</button>' : '') +
        '</div>' +
        '<label class="fila pequeno" style="cursor:pointer"><input class="marca" type="checkbox" id="rec-' + r.id + '" data-mudar="passo" data-id="' + idFeito + '"' + (ok ? ' checked' : '') + '> Concluído</label>' +
      '</div></article>';
  }

  function filtrarRecursos() {
    const u = estadoBib();
    const q = RS.plano(u.q).trim();
    return RS.dados.recursos.filter(function (r) {
      if (u.tipo && r.tipo !== u.tipo) return false;
      if (u.linha && r.linha !== u.linha) return false;
      if (u.cert && !r.cert) return false;
      if (u.pt && r.idioma === 'en') return false;
      if (q && RS.plano(r.titulo + ' ' + (r.autor || '') + ' ' + (r.nota || '')).indexOf(q) < 0) return false;
      return true;
    });
  }

  function listaRecursos() {
    const u = estadoBib();
    const lista = filtrarRecursos();
    if (!lista.length) return '<p class="faixa">Nenhum material com esses filtros. Limpe a busca ou escolha outra trilha.</p>';
    let h = '<p class="pequeno mudo" role="status">' + lista.length + (lista.length === 1 ? ' material' : ' materiais') + '</p><div class="grade">';
    lista.slice(0, u.limite).forEach(function (r) { h += htmlRecurso(r); });
    h += '</div>';
    if (lista.length > u.limite) h += '<div><button class="btn" type="button" data-acao="bib-mais">Mostrar mais ' + Math.min(24, lista.length - u.limite) + '</button></div>';
    return h;
  }

  function chipsBib() {
    const u = estadoBib();
    let h = '<div class="chips" role="group" aria-label="Tipo de material">' +
      '<button type="button" class="chip" data-acao="bib-tipo" data-v="" aria-pressed="' + (!u.tipo) + '">Tudo</button>';
    Object.keys(TIPOS).forEach(function (t) {
      if (!RS.dados.recursos.some(function (r) { return r.tipo === t; })) return;
      h += '<button type="button" class="chip" data-acao="bib-tipo" data-v="' + t + '" aria-pressed="' + (u.tipo === t) + '">' + TIPOS[t] + '</button>';
    });
    h += '</div><div class="chips" role="group" aria-label="Trilha">';
    RS.dados.linhas.forEach(function (l) {
      h += '<button type="button" class="chip" data-acao="bib-linha" data-v="' + l.id + '" aria-pressed="' + (u.linha === l.id) + '">' + RS.selo(l.id) + ' ' + esc(l.nome) + '</button>';
    });
    h += '</div><div class="chips" role="group" aria-label="Outros filtros">' +
      '<button type="button" class="chip" data-acao="bib-cert" aria-pressed="' + u.cert + '">Com certificado</button>' +
      '<button type="button" class="chip" data-acao="bib-pt" aria-pressed="' + u.pt + '">Só em português</button></div>';
    return h;
  }

  RS.paginas.biblioteca = {
    titulo: 'Biblioteca',
    desenhar: function (param) {
      const u = estadoBib();
      if (param && RS.idx.linhas[param] && RS.ui.bibParam !== param) { u.linha = param; u.limite = 24; }
      RS.ui.bibParam = param || '';
      const destaques = RS.dados.recursos.filter(function (r) { return r.destaque && (r.yt || r.pl) && (!u.linha || r.linha === u.linha); }).slice(0, 6);

      let h = RS.cabecalho('Biblioteca', 'Tudo gratuito, em um lugar',
        RS.dados.recursos.length + ' videoaulas, cursos, PDFs e ferramentas escolhidos para o seu plano. Os links foram conferidos em novembro de 2026; se algum mudar de endereço, busque pelo nome.');

      if (destaques.length) {
        h += '<section class="pilha" aria-labelledby="dest-t"><h2 class="titulo-sec" id="dest-t">Videoaulas para começar</h2><div class="grade">';
        destaques.forEach(function (r) {
          h += '<div class="pilha-p">' + htmlVideo(r, u.tocando === 'd:' + r.id).replace('data-id="' + r.id + '"', 'data-id="d:' + r.id + '"') +
            '<p class="pequeno"><span class="forte">' + esc(r.autor || '') + '</span>' + (r.nota ? ' · ' + esc(r.nota) : '') + '</p></div>';
        });
        h += '</div></section>';
      }

      h += '<section class="pilha" aria-labelledby="bib-t"><h2 class="titulo-sec" id="bib-t">Todos os materiais</h2>' +
        '<label class="campo"><span class="rotulo">Buscar na biblioteca</span>' +
        '<input class="entrada" type="search" id="bib-q" data-digitar="bib-busca" value="' + esc(u.q) + '" placeholder="Ex.: React, redes, inglês" autocomplete="off"></label>' +
        chipsBib() +
        '<div class="pilha" id="bib-lista">' + listaRecursos() + '</div></section>';

      h += '<section class="faixa texto"><h2 class="rotulo">Sobre inscrições</h2>' +
        '<p>Materiais com a etiqueta "Pede cadastro" exigem uma conta gratuita criada por você (alguns pedem CPF e confirmação por e-mail). O botão Abrir leva direto à página de inscrição. Depois de se inscrever, marque como concluído quando terminar o curso.</p></section>';
      return h;
    }
  };

  RS.acoes['bib-busca'] = function (el) { const u = estadoBib(); u.q = el.value; u.limite = 24; RS.trocar('bib-lista', listaRecursos()); };
  RS.acoes['bib-tipo'] = function (el) { const u = estadoBib(); u.tipo = el.getAttribute('data-v'); u.limite = 24; RS.desenhar(); };
  RS.acoes['bib-linha'] = function (el) { const u = estadoBib(); const v = el.getAttribute('data-v'); u.linha = u.linha === v ? '' : v; u.limite = 24; RS.desenhar(); };
  RS.acoes['bib-cert'] = function () { const u = estadoBib(); u.cert = !u.cert; RS.desenhar(); };
  RS.acoes['bib-pt'] = function () { const u = estadoBib(); u.pt = !u.pt; RS.desenhar(); };
  RS.acoes['bib-mais'] = function () { estadoBib().limite += 24; RS.trocar('bib-lista', listaRecursos()); };
  RS.acoes.tocar = function (el) { estadoBib().tocando = el.getAttribute('data-id'); RS.desenhar(); };

  /* ===================== PERGUNTAS ===================== */

  function embaralhar(lista) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function estadoQuiz() {
    return RS.ui.quiz || (RS.ui.quiz = { linha: 'todas', ativa: false });
  }

  function placar(linhaId) {
    const todas = RS.dados.perguntas.filter(function (q) { return linhaId === 'todas' || q.l === linhaId; });
    let vistas = 0, certas = 0;
    todas.forEach(function (q) {
      if (q.id in RS.estado.quiz) { vistas++; if (RS.estado.quiz[q.id] === 1) certas++; }
    });
    return { total: todas.length, vistas: vistas, certas: certas };
  }

  function iniciarQuiz() {
    const u = estadoQuiz();
    const pool = RS.dados.perguntas.filter(function (q) { return u.linha === 'todas' || q.l === u.linha; });
    const novas = embaralhar(pool.filter(function (q) { return !(q.id in RS.estado.quiz); }));
    const erradas = embaralhar(pool.filter(function (q) { return RS.estado.quiz[q.id] === 0; }));
    const certas = embaralhar(pool.filter(function (q) { return RS.estado.quiz[q.id] === 1; }));
    u.fila = novas.concat(erradas, certas).slice(0, 10).map(function (q) { return q.id; });
    u.pos = 0; u.acertos = 0; u.escolha = null; u.fim = false; u.ativa = u.fila.length > 0;
  }

  function htmlQuiz() {
    const u = estadoQuiz();
    if (u.linha !== 'todas' && !RS.idx.linhas[u.linha]) u.linha = 'todas';

    if (u.ativa && u.fim) {
      const n = u.fila.length;
      const frase = u.acertos === n ? 'Gabaritou. Hora de subir a dificuldade: explique cada resposta em voz alta.'
        : u.acertos >= n * 0.7 ? 'Bom resultado. As erradas voltam primeiro na próxima rodada.'
        : 'Normal errar no começo. Releia as explicações e volte amanhã: as erradas reaparecem.';
      return '<section class="cartao pilha" aria-live="polite">' +
        '<p class="sobre">Rodada concluída</p>' +
        '<p class="contagem"><b>' + u.acertos + '/' + n + '</b><span>acertos</span></p>' +
        '<p>' + frase + '</p>' +
        '<div class="fila"><button class="btn btn-placa" type="button" data-acao="quiz-comecar" id="quiz-de-novo">Outra rodada</button>' +
        '<button class="btn" type="button" data-acao="quiz-sair">Voltar</button></div></section>';
    }

    if (u.ativa) {
      const q = RS.idx.perguntas[u.fila[u.pos]];
      const pct = Math.round((u.pos / u.fila.length) * 100);
      return '<section class="cartao pilha">' +
        '<div class="fila-entre"><p class="sobre">Pergunta ' + (u.pos + 1) + ' de ' + u.fila.length + '</p>' + RS.selo(q.l) + '</div>' +
        RS.barra(pct, q.l, 'Andamento da rodada') +
        RS.htmlPergunta(q, u.escolha, 'quiz-responder') +
        '<div class="fila-entre">' +
          '<button class="btn btn-liso btn-p" type="button" data-acao="quiz-sair">Encerrar rodada</button>' +
          (u.escolha != null ? '<button class="btn btn-placa" type="button" data-acao="quiz-proxima" id="quiz-proxima">' + (u.pos + 1 === u.fila.length ? 'Ver resultado' : 'Próxima') + '</button>' : '') +
        '</div></section>';
    }

    const geral = placar(u.linha);
    let h = '<section class="pilha" aria-labelledby="qz-t"><h2 class="titulo-sec" id="qz-t">Escolha o assunto</h2><div class="chips" role="group" aria-label="Assunto">' +
      '<button type="button" class="chip" data-acao="quiz-linha" data-v="todas" aria-pressed="' + (u.linha === 'todas') + '">Todos</button>';
    RS.dados.linhas.forEach(function (l) {
      if (!RS.dados.perguntas.some(function (q) { return q.l === l.id; })) return;
      h += '<button type="button" class="chip" data-acao="quiz-linha" data-v="' + l.id + '" aria-pressed="' + (u.linha === l.id) + '">' + RS.selo(l.id) + ' ' + esc(l.nome) + '</button>';
    });
    h += '</div>' +
      '<div class="resumo"><div><b>' + geral.total + '</b><span>perguntas</span></div><div><b>' + geral.vistas + '</b><span>respondidas</span></div>' +
      '<div><b>' + (geral.vistas ? Math.round((geral.certas / geral.vistas) * 100) : 0) + '%</b><span>de acerto</span></div></div>' +
      '<div><button class="btn btn-placa" type="button" data-acao="quiz-comecar">Começar rodada de 10</button></div>' +
      '<p class="pequeno mudo">A rodada puxa primeiro as perguntas novas, depois as que você errou.</p></section>';
    return h;
  }

  function htmlEntrevista() {
    const lista = RS.dados.entrevista || [];
    const cats = [];
    lista.forEach(function (x) { if (cats.indexOf(x.cat) < 0) cats.push(x.cat); });
    let h = '<p class="lide">Responda em voz alta antes de abrir o gabarito. Depois simule no Mentor IA e peça retorno.</p>' +
      '<div><a class="btn btn-p" href="#mentor-entrevista">' + RS.icone('mentor', 16) + ' Simular entrevista</a></div>';
    cats.forEach(function (cat, ci) {
      h += '<section class="pilha-p"><h2 class="titulo-sec">' + esc(cat) + '</h2><div class="cartao">';
      lista.filter(function (x) { return x.cat === cat; }).forEach(function (x, i) {
        const id = 'ent-' + ci + '-' + i;
        h += '<div class="item" style="grid-template-columns:minmax(0,1fr)"><details class="mais" id="' + id + '"' + RS.aberto(id, false) + '>' +
          '<summary style="color:var(--tinta)">' + esc(x.p) + '</summary>' +
          '<p class="pequeno"' + (x.en ? ' lang="en"' : '') + '>' + esc(x.r) + '</p></details></div>';
      });
      h += '</div></section>';
    });
    return h;
  }

  function estadoCartas() {
    return RS.ui.cartas || (RS.ui.cartas = { cat: '', pos: 0, virada: false });
  }

  function baralho() {
    const u = estadoCartas();
    const lista = RS.dados.frases.filter(function (f) { return !u.cat || f.cat === u.cat; });
    // primeiro as que ainda não sei
    return lista.filter(function (f) { return RS.estado.cartas[f.id] !== 1; })
      .concat(lista.filter(function (f) { return RS.estado.cartas[f.id] === 1; }));
  }

  function htmlIngles() {
    const u = estadoCartas();
    const cats = [];
    RS.dados.frases.forEach(function (f) { if (cats.indexOf(f.cat) < 0) cats.push(f.cat); });
    const lista = baralho();
    if (u.pos >= lista.length) u.pos = 0;
    const f = lista[u.pos];
    const sei = lista.filter(function (x) { return RS.estado.cartas[x.id] === 1; }).length;

    let h = '<p class="lide">Frases que aparecem em daily, code review, documentação e entrevista. Leia, ouça, repita em voz alta e só então veja a tradução.</p>' +
      '<div class="chips" role="group" aria-label="Situação"><button type="button" class="chip" data-acao="cartas-cat" data-v="" aria-pressed="' + (!u.cat) + '">Todas</button>';
    cats.forEach(function (c) {
      h += '<button type="button" class="chip" data-acao="cartas-cat" data-v="' + esc(c) + '" aria-pressed="' + (u.cat === c) + '">' + esc(c) + '</button>';
    });
    h += '</div>';
    if (!f) return h + '<p class="faixa">Sem frases nesta categoria.</p>';
    const pct = Math.round((sei / lista.length) * 100);
    h += '<div class="fila-entre pequeno"><span>Você já sabe ' + sei + ' de ' + lista.length + '</span><span class="mono">' + pct + '%</span></div>' + RS.barra(pct, 'ing', 'Frases dominadas') +
      '<section class="cartao carta" aria-live="polite">' +
        '<span class="etiqueta">' + esc(f.cat) + '</span>' +
        '<p class="carta-en" lang="en">' + esc(f.en) + '</p>' +
        (u.virada ? '<p class="carta-pt">' + esc(f.pt) + '</p>' : '') +
        '<div class="fila" style="justify-content:center">' +
          (RS.temVoz() ? '<button class="btn" type="button" data-acao="ouvir" data-texto="' + esc(f.en) + '">' + RS.icone('som', 18) + ' Ouvir</button>' : '') +
          (u.virada
            ? '<button class="btn" type="button" data-acao="carta-nota" data-v="0" id="carta-nao">Ainda não</button><button class="btn btn-placa" type="button" data-acao="carta-nota" data-v="1" id="carta-sim">Já sei</button>'
            : '<button class="btn btn-placa" type="button" data-acao="carta-virar" id="carta-virar">Ver tradução</button>') +
        '</div></section>' +
      '<p class="pequeno mudo">Dica: copie as frases que errar para o Anki. Revisão espaçada é o que fixa.</p>';
    return h;
  }

  RS.paginas.perguntas = {
    titulo: 'Perguntas',
    desenhar: function (param) {
      const aba = param === 'entrevista' ? 'entrevista' : param === 'ingles' ? 'ingles' : 'quiz';
      let h = RS.cabecalho('Perguntas', 'Teste o que ficou', 'Lembrar ativamente fixa mais do que reler. Dez perguntas por dia já mudam o jogo.');
      h += RS.sub([
        { id: 'quiz', nome: 'Quiz', hash: 'perguntas' },
        { id: 'entrevista', nome: 'Entrevista', hash: 'perguntas-entrevista' },
        { id: 'ingles', nome: 'Inglês', hash: 'perguntas-ingles' }
      ], aba);
      if (aba === 'quiz') h += htmlQuiz();
      else if (aba === 'entrevista') h += htmlEntrevista();
      else h += htmlIngles();
      return h;
    }
  };

  function focar(id) {
    const el = document.getElementById(id);
    if (el) el.focus({ preventScroll: true });
  }

  RS.acoes['quiz-linha'] = function (el) { estadoQuiz().linha = el.getAttribute('data-v'); RS.desenhar(); };
  RS.acoes['quiz-comecar'] = function () { iniciarQuiz(); RS.desenhar(); };
  RS.acoes['quiz-sair'] = function () { const u = estadoQuiz(); u.ativa = false; u.fim = false; RS.desenhar(); };
  RS.acoes['quiz-responder'] = function (el) {
    const u = estadoQuiz();
    if (!u.ativa || u.escolha != null) return;
    const q = RS.idx.perguntas[u.fila[u.pos]];
    u.escolha = Number(el.getAttribute('data-i'));
    const certo = u.escolha === q.c;
    if (certo) u.acertos++;
    RS.estado.quiz[q.id] = certo ? 1 : 0;
    RS.registrarDia('quiz');
    RS.salvar();
    RS.desenhar();
    focar('quiz-proxima');
  };
  RS.acoes['quiz-proxima'] = function () {
    const u = estadoQuiz();
    if (u.pos + 1 >= u.fila.length) { u.fim = true; RS.desenhar(); focar('quiz-de-novo'); return; }
    u.pos++; u.escolha = null;
    RS.desenhar();
  };

  RS.acoes['cartas-cat'] = function (el) { const u = estadoCartas(); u.cat = el.getAttribute('data-v'); u.pos = 0; u.virada = false; RS.desenhar(); };
  RS.acoes['carta-virar'] = function () { estadoCartas().virada = true; RS.desenhar(); focar('carta-sim'); };
  RS.acoes['carta-nota'] = function (el) {
    const u = estadoCartas();
    const f = baralho()[u.pos];
    if (!f) return;
    const sabe = el.getAttribute('data-v') === '1';
    RS.estado.cartas[f.id] = sabe ? 1 : 0;
    RS.registrarDia('ingles');
    RS.salvar();
    // quem disse "já sei" vai para o fim do baralho; "ainda não" avança para a próxima
    if (!sabe) u.pos++;
    u.virada = false;
    RS.desenhar();
    focar('carta-virar');
  };

})(window.RS);
