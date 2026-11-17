/* Rota Sênior — casca do app: menu, rotas (#pagina-parametro), tema e eventos.
   Cada página registra { titulo, desenhar(param), depois?(el, param) } em RS.paginas
   e suas ações em RS.acoes. Elementos com data-acao / data-mudar / data-digitar / data-enviar
   chamam a ação de mesmo nome. */
(function (RS) {
  'use strict';

  RS.paginas = RS.paginas || {};
  RS.acoes = RS.acoes || {};
  RS.ui = RS.ui || {};
  RS.ui.abertos = RS.ui.abertos || {};

  const NAV = [
    { grupo: 'Dia a dia' },
    { id: 'hoje', nome: 'Hoje', icone: 'hoje', desc: 'O que fazer agora' },
    { id: 'rota', nome: 'Cronograma', icone: 'rota', desc: 'Fases e rotina da semana' },
    { id: 'tarefas', nome: 'Afazeres', icone: 'tarefas', desc: 'Sua lista pessoal' },
    { grupo: 'Estudo' },
    { id: 'linhas', nome: 'Trilhas', icone: 'linhas', desc: 'Oito linhas, estação por estação' },
    { id: 'biblioteca', nome: 'Biblioteca', icone: 'biblioteca', desc: 'Videoaulas, cursos e PDFs grátis' },
    { id: 'perguntas', nome: 'Perguntas', icone: 'perguntas', desc: 'Quiz, entrevista e inglês' },
    { id: 'mentor', nome: 'Mentor IA', icone: 'mentor', desc: 'Prompts prontos e bem feitos' },
    { grupo: 'Carreira e ideias' },
    { id: 'vagas', nome: 'Vagas', icone: 'vagas', desc: 'Onde buscar e o que analisar' },
    { id: 'ideias', nome: 'Ideias', icone: 'ideias', desc: '200 SaaS e 100 soluções por área' },
    { grupo: 'Vida' },
    { id: 'casamento', nome: 'Casamento', icone: 'casamento', desc: 'Checklist, cartório e orçamento' },
    { id: 'financas', nome: 'Finanças', icone: 'financas', desc: 'Calculadoras e o básico bem feito' },
    { grupo: 'App' },
    { id: 'busca', nome: 'Buscar', icone: 'busca', desc: 'Procure em todo o conteúdo' },
    { id: 'perfil', nome: 'Perfil', icone: 'perfil', desc: 'Seus dados, tema e backup' }
  ];
  RS.NAV = NAV;

  const ABAS = [
    { id: 'hoje', nome: 'Hoje', icone: 'hoje' },
    { id: 'rota', nome: 'Rota', icone: 'rota' },
    { id: 'linhas', nome: 'Trilhas', icone: 'linhas' },
    { id: 'ideias', nome: 'Ideias', icone: 'ideias' },
    { id: 'mais', nome: 'Mais', icone: 'menu' }
  ];

  /* '#linha-prog' -> { nome: 'linha', param: 'prog' } */
  function lerRota() {
    let h = (location.hash || '').replace(/^#/, '');
    try { h = decodeURIComponent(h); } catch (e) { /* usa como veio */ }
    if (!h) h = 'hoje';
    const i = h.indexOf('-');
    let nome = i < 0 ? h : h.slice(0, i);
    let param = i < 0 ? '' : h.slice(i + 1);
    if (!RS.paginas[nome]) { nome = 'hoje'; param = ''; }
    return { nome: nome, param: param };
  }

  /* ===================== Tema ===================== */
  function temaEfetivo() {
    const t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function aplicarTema() {
    const t = RS.estado.perfil.tema;
    if (t === 'claro') document.documentElement.setAttribute('data-theme', 'light');
    else if (t === 'escuro') document.documentElement.setAttribute('data-theme', 'dark');
    else if (RS.ui.temaMexido) document.documentElement.removeAttribute('data-theme');
    const b = document.getElementById('btn-tema');
    if (b) b.innerHTML = RS.icone(temaEfetivo() === 'dark' ? 'sol' : 'lua', 22);
  }
  RS.aplicarTema = aplicarTema;

  /* ===================== Casca ===================== */
  function montarCasca() {
    const app = document.getElementById('app');
    let lateral = '';
    NAV.forEach(function (n) {
      if (n.grupo) lateral += '<p class="nav-grupo">' + n.grupo + '</p>';
      else lateral += '<a class="nav-item" href="#' + n.id + '" data-nav="' + n.id + '">' + RS.icone(n.icone) + '<span>' + n.nome + '</span></a>';
    });
    let abas = '';
    ABAS.forEach(function (a) {
      abas += '<a class="aba" href="#' + a.id + '" data-aba="' + a.id + '"><span class="aba-icone">' + RS.icone(a.icone, 22) + '</span><span>' + a.nome + '</span></a>';
    });
    app.innerHTML =
      '<div class="casca">' +
        '<header class="topo"><div class="topo-dentro">' +
          '<a class="placa-nome" href="#hoje"><span class="placa-seta">' + RS.icone('nordeste', 18) + '</span>Rota Sênior</a>' +
          '<a class="btn-icone" href="#busca" aria-label="Buscar no app">' + RS.icone('busca', 22) + '</a>' +
          '<button class="btn-icone" id="btn-tema" type="button" aria-label="Trocar entre tema claro e escuro"></button>' +
          '<a class="btn-icone" href="#perfil" aria-label="Perfil"><span class="inicial" id="inicial"></span></a>' +
        '</div></header>' +
        '<nav class="lateral" aria-label="Seções">' + lateral + '</nav>' +
        '<main class="conteudo" id="conteudo" tabindex="-1"></main>' +
      '</div>' +
      '<nav class="abas" aria-label="Seções principais">' + abas + '</nav>';
  }

  function atualizarCasca() {
    const r = RS.ui.rota;
    const atual = r.nome === 'linha' ? 'linhas' : r.nome;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === atual) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    const naBarra = ABAS.some(function (a) { return a.id === atual; }) ? atual : 'mais';
    document.querySelectorAll('[data-aba]').forEach(function (a) {
      if (a.getAttribute('data-aba') === naBarra) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    const ini = document.getElementById('inicial');
    if (ini) ini.textContent = (RS.estado.perfil.nome || '?').trim().charAt(0).toUpperCase() || '?';
  }

  /* Redesenha a página atual mantendo o foco no mesmo campo quando possível. */
  RS.desenhar = function () {
    const r = RS.ui.rota;
    const pagina = RS.paginas[r.nome];
    const el = document.getElementById('conteudo');
    const ativo = document.activeElement;
    const focoId = ativo && el.contains(ativo) ? ativo.id : '';
    el.innerHTML = '<div class="pilha-g">' + pagina.desenhar(r.param) + '</div>';
    if (pagina.depois) pagina.depois(el, r.param);
    atualizarCasca();
    if (focoId) {
      const de = document.getElementById(focoId);
      if (de) de.focus({ preventScroll: true });
    }
  };

  /* Troca só um pedaço da página (listas filtradas enquanto a pessoa digita). */
  RS.trocar = function (id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  RS.ir = function (hash) {
    if (location.hash === '#' + hash) { aoMudarRota(); }
    else location.hash = hash;
  };

  function aoMudarRota() {
    RS.ui.rota = lerRota();
    RS.desenhar();
    window.scrollTo(0, 0);
    const el = document.getElementById('conteudo');
    if (el) el.focus({ preventScroll: true });
  }

  /* ===================== Eventos ===================== */
  function ouvir() {
    const el = document.getElementById('conteudo');

    function chamar(tipo, e) {
      const alvo = e.target.closest ? e.target.closest('[data-' + tipo + ']') : null;
      if (!alvo || !el.contains(alvo)) return;
      const acao = RS.acoes[alvo.getAttribute('data-' + tipo)];
      if (acao) acao(alvo, e);
    }

    el.addEventListener('click', function (e) { chamar('acao', e); });
    el.addEventListener('change', function (e) { chamar('mudar', e); });
    el.addEventListener('input', function (e) { chamar('digitar', e); });
    el.addEventListener('submit', function (e) {
      const f = e.target.closest('form');
      if (!f) return;
      e.preventDefault();
      const acao = RS.acoes[f.getAttribute('data-enviar')];
      if (acao) acao(f, e);
    });
    // lembra quais <details> estão abertos
    el.addEventListener('toggle', function (e) {
      if (e.target.tagName === 'DETAILS' && e.target.id) RS.ui.abertos[e.target.id] = e.target.open;
    }, true);

    document.getElementById('btn-tema').addEventListener('click', function () {
      RS.estado.perfil.tema = temaEfetivo() === 'dark' ? 'claro' : 'escuro';
      RS.ui.temaMexido = true;
      RS.salvar();
      aplicarTema();
    });

    window.addEventListener('hashchange', aoMudarRota);
  }

  /* ===================== Início ===================== */
  RS.iniciar = function () {
    RS.prepararDados();
    RS.carregar();
    montarCasca();
    aplicarTema();
    ouvir();
    RS.ui.rota = lerRota();
    RS.desenhar();

    RS.aoMudarEstado = function () { aplicarTema(); RS.desenhar(); };   // chegou versão mais nova da nuvem
    RS.aoMudarNuvem = function () {
      const t = document.getElementById('nuvem-txt');
      if (t) t.textContent = RS.textoNuvem();
    };
    RS.aoMudarCapacidade = function (qual) {
      const r = RS.ui.rota.nome;
      if ((qual === 'ia' && r === 'mentor') || (qual === 'voz' && (r === 'perguntas' || r === 'hoje'))) RS.desenhar();
    };
    RS.iniciarNuvem();
    RS.prepararCapacidades();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', RS.iniciar);
  else RS.iniciar();

})(window.RS);
