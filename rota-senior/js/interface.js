/* Rota Sênior — peças de interface reutilizadas pelas páginas:
   ícones, selos, barras, avisos, diálogo de confirmação, copiar, baixar, voz e texto formatado. */
(function (RS) {
  'use strict';

  /* ===================== Ícones (traço simples, 24x24) ===================== */
  const P = {
    hoje: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    rota: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>',
    linhas: '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="1.7" fill="currentColor"/><circle cx="15" cy="12" r="1.7" fill="currentColor"/><circle cx="8" cy="17" r="1.7" fill="currentColor"/>',
    biblioteca: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
    perguntas: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7"/><circle cx="12" cy="16.8" r=".7" fill="currentColor"/>',
    ideias: '<path d="M8.5 14.5a6 6 0 1 1 7 0c-.6.5-1 1.2-1 2V17h-5v-.5c0-.8-.4-1.5-1-2z"/><path d="M10 20.5h4"/>',
    vagas: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    casamento: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    financas: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.6.8-2.6 2s1 1.7 2.6 2 2.7.9 2.7 2.1-1.2 2-2.7 2c-1.2 0-2.2-.5-2.7-1.3M12 6.5V8m0 8v1.5"/>',
    tarefas: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    mentor: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16v4M17 18h4"/>',
    perfil: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    busca: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
    lua: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
    tocar: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
    arquivo: '<path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14 3v5h5"/>',
    seta: '<path d="M9 5l7 7-7 7"/>',
    subir: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    mais: '<path d="M12 5v14M5 12h14"/>',
    lixo: '<path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13"/>',
    estrela: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8z"/>',
    fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
    copiar: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    baixar: '<path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M5 20h14"/>',
    agenda: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
    som: '<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    parar: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>',
    certo: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    menu: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    raio: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
    local: '<path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
    selo: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>',
    sortear: '<path d="M4 7h3.5c5 0 5 10 10 10H20M4 17h3.5c1.2 0 2.2-.6 3-1.5M20 7h-2.5c-1.2 0-2.2.6-3 1.5M17.5 4.5L20 7l-2.5 2.5M17.5 14.5L20 17l-2.5 2.5"/>',
    nordeste: '<path d="M7 17L17 7M9 7h8v8"/>'
  };

  RS.icone = function (nome, tam) {
    tam = tam || 20;
    return '<svg width="' + tam + '" height="' + tam + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[nome] || '') + '</svg>';
  };

  /* ===================== Peças pequenas ===================== */

  RS.selo = function (linhaId, grande) {
    const l = RS.idx.linhas[linhaId];
    if (!l) return '';
    return '<span class="selo' + (grande ? ' selo-g' : '') + '" style="--cor: var(--l-' + l.id + ')" title="' + RS.esc(l.nome) + '">' + RS.esc(l.sigla) + '</span>';
  };

  RS.barra = function (pct, linhaId, rotulo) {
    const cor = linhaId ? ' --cor: var(--l-' + linhaId + ');' : '';
    return '<div class="barra" role="img" aria-label="' + RS.esc(rotulo || (pct + '% concluído')) + '" style="--pct: ' + pct + '%;' + cor + '"><i></i></div>';
  };

  RS.nivel = function (n) {
    const nomes = ['', 'Iniciante', 'Intermediário', 'Avançado'];
    let h = '<span class="nivel" title="Nível: ' + nomes[n] + '" role="img" aria-label="Nível: ' + nomes[n] + '">';
    for (let i = 1; i <= 3; i++) h += '<i' + (i <= n ? ' class="on"' : '') + '></i>';
    return h + '</span>';
  };

  /* <details> lembra se estava aberto mesmo quando a página é redesenhada */
  RS.aberto = function (id, padrao) {
    return (id in RS.ui.abertos ? RS.ui.abertos[id] : !!padrao) ? ' open' : '';
  };

  RS.externo = function (url, rotulo, classes) {
    return '<a class="' + (classes || 'btn btn-p') + '" href="' + RS.esc(url) + '" target="_blank" rel="noopener noreferrer">' + rotulo + ' ' + RS.icone('externo', 15) + '</a>';
  };

  RS.buscaYoutube = function (termo) {
    return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(termo);
  };

  /* Endereço de um recurso: link direto, vídeo, playlist ou busca no YouTube pelo nome. */
  RS.urlRecurso = function (r) {
    if (r.url) return r.url;
    if (r.yt) return 'https://www.youtube.com/watch?v=' + r.yt;
    if (r.pl) return 'https://www.youtube.com/playlist?list=' + r.pl;
    return RS.buscaYoutube(r.busca || r.titulo);
  };

  RS.cabecalho = function (sobre, titulo, lide) {
    return '<header class="pilha-p">' +
      (sobre ? '<p class="sobre">' + sobre + '</p>' : '') +
      '<h1 class="titulo-pg">' + titulo + '</h1>' +
      (lide ? '<p class="lide">' + lide + '</p>' : '') +
      '</header>';
  };

  /* ===================== Aviso rápido ===================== */
  let avisoTimer = null;
  RS.aviso = function (texto) {
    let el = document.getElementById('aviso');
    if (!el) {
      el = document.createElement('div');
      el.id = 'aviso';
      el.className = 'aviso';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = texto;
    el.hidden = false;
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(function () { el.hidden = true; }, 2600);
  };

  /* ===================== Diálogo =====================
     Substitui alert/confirm, que não funcionam dentro do Claude. */
  let aoFecharDialogo = null;
  let focoAnterior = null;

  RS.dialogo = function (html, aoFechar) {
    RS.fecharDialogo();
    focoAnterior = document.activeElement;
    aoFecharDialogo = aoFechar || null;
    const veu = document.createElement('div');
    veu.className = 'veu';
    veu.id = 'veu';
    veu.innerHTML = '<div class="dialogo" role="dialog" aria-modal="true" tabindex="-1">' + html + '</div>';
    veu.addEventListener('click', function (e) {
      if (e.target === veu || e.target.closest('[data-fechar]')) RS.fecharDialogo();
    });
    document.body.appendChild(veu);
    const primeiro = veu.querySelector('[data-foco]') || veu.querySelector('.dialogo');
    primeiro.focus();
    return veu;
  };

  RS.fecharDialogo = function () {
    const veu = document.getElementById('veu');
    if (!veu) return;
    veu.remove();
    if (aoFecharDialogo) { const f = aoFecharDialogo; aoFecharDialogo = null; f(); }
    if (focoAnterior && document.contains(focoAnterior)) focoAnterior.focus();
  };

  RS.confirmar = function (op) {
    const veu = RS.dialogo(
      '<div class="pilha">' +
        '<h2 class="titulo-sec">' + RS.esc(op.titulo) + '</h2>' +
        (op.texto ? '<p>' + RS.esc(op.texto) + '</p>' : '') +
        '<div class="fila" style="justify-content:flex-end">' +
          '<button class="btn" type="button" data-fechar data-foco>Cancelar</button>' +
          '<button class="btn btn-placa" type="button" id="dialogo-sim">' + RS.esc(op.sim || 'Confirmar') + '</button>' +
        '</div>' +
      '</div>');
    veu.querySelector('#dialogo-sim').addEventListener('click', function () {
      RS.fecharDialogo();
      op.aoConfirmar();
    });
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('veu')) {
      e.preventDefault();          // o Esc fecha só o diálogo, sem interromper uma leitura em voz alta
      RS.fecharDialogo();
    }
  });

  /* ===================== Copiar e baixar ===================== */

  RS.copiar = function (texto, mensagem) {
    function reserva() {
      RS.dialogo(
        '<div class="pilha">' +
          '<h2 class="titulo-sec">Copie o texto</h2>' +
          '<p class="pequeno mudo">Não deu para copiar sozinho. Selecione tudo e copie.</p>' +
          '<textarea class="entrada" id="copia-manual" rows="8" readonly data-foco></textarea>' +
          '<div class="fila" style="justify-content:flex-end"><button class="btn" type="button" data-fechar>Fechar</button></div>' +
        '</div>');
      const t = document.getElementById('copia-manual');
      t.value = texto;
      t.select();
    }
    try {
      navigator.clipboard.writeText(texto).then(function () { RS.aviso(mensagem || 'Copiado'); }, reserva);
    } catch (e) { reserva(); }
  };

  /* Capacidades extras que só existem dentro do Claude (ficam null fora dele). */
  RS.cap = { baixar: null, ia: null, voz: null };

  RS.prepararCapacidades = function () {
    if (!RS.noClaude) return;
    const pegar = function (nome, chave, depois) {
      window.claude.use(nome).then(function (c) {
        RS.cap[chave] = c || null;
        if (c && depois) depois(c);
        if (RS.aoMudarCapacidade) RS.aoMudarCapacidade(chave);
      }, function () {});
    };
    pegar('downloads', 'baixar');
    pegar('sample', 'ia');
    pegar('tts', 'voz', function (voz) {
      try { voz.onState(function (s) { mostrarFalando(s.state !== 'idle'); }); } catch (e) { /* segue sem indicador */ }
    });
  };

  /* Entrega um arquivo de texto. Devolve false quando não foi possível (quem chamou oferece copiar). */
  RS.baixar = async function (nome, texto) {
    if (RS.noClaude) {
      if (!RS.cap.baixar) return false;
      try {
        await RS.cap.baixar.save({ filename: nome, data: texto });
        RS.aviso('Arquivo salvo');
        return true;
      } catch (e) {
        return !!(e && e.code === 'declined');   // a pessoa recusou: não insistir
      }
    }
    try {
      const url = URL.createObjectURL(new Blob([texto], { type: 'application/octet-stream' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = nome;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      return true;
    } catch (e) { return false; }
  };

  /* ===================== Voz (ouvir frases em inglês) ===================== */
  let vozNegada = false;

  function mostrarFalando(ativo) {
    let el = document.getElementById('falando');
    if (!ativo) { if (el) el.remove(); return; }
    if (el) return;
    el = document.createElement('div');
    el.id = 'falando';
    el.className = 'falando';
    el.innerHTML = '<button class="btn btn-placa" type="button">' + RS.icone('parar', 16) + ' Parar áudio</button>';
    el.querySelector('button').addEventListener('click', RS.calar);
    document.body.appendChild(el);
  }

  RS.temVoz = function () {
    if (vozNegada) return false;
    return !!RS.cap.voz || ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
  };

  RS.falar = function (texto, idioma) {
    if (vozNegada) return;
    if (RS.cap.voz) {
      RS.cap.voz.speak(texto, { language: idioma || 'en' }).catch(function (e) {
        if (e && e.code === 'not_granted') { vozNegada = true; RS.aviso('Leitura em voz alta desativada para esta página.'); }
        else if (e && e.code === 'rate_limited') RS.aviso('Muitos áudios seguidos. Espere um pouco.');
      });
      return;
    }
    if (!('speechSynthesis' in window)) return;
    try {
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = idioma === 'pt-BR' ? 'pt-BR' : 'en-US';
      fala.rate = 0.92;
      fala.onstart = function () { mostrarFalando(true); };
      fala.onend = fala.onerror = function () { mostrarFalando(false); };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(fala);
    } catch (e) { /* navegador sem voz */ }
  };

  RS.calar = function () {
    if (RS.cap.voz) { try { RS.cap.voz.stop(); } catch (e) { /* já parou */ } }
    if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch (e) { /* nada a parar */ } }
    mostrarFalando(false);
  };

  /* ===================== Texto formatado (markdown simples) =====================
     Usado para mostrar as respostas do Mentor IA com segurança: tudo é escapado antes. */
  RS.md = function (txt) {
    const linhas = String(txt || '').replace(/\r/g, '').split('\n');
    let html = '', lista = null, emCodigo = false, codigo = [];
    const fechaLista = function () { if (lista) { html += '</' + lista + '>'; lista = null; } };
    const emLinha = function (s) {
      return RS.esc(s)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    };
    linhas.forEach(function (l) {
      if (/^\s*```/.test(l)) {
        if (emCodigo) { html += '<pre><code>' + RS.esc(codigo.join('\n')) + '</code></pre>'; codigo = []; emCodigo = false; }
        else { fechaLista(); emCodigo = true; }
        return;
      }
      if (emCodigo) { codigo.push(l); return; }
      let m;
      if ((m = /^\s*#{1,6}\s+(.*)$/.exec(l))) { fechaLista(); html += '<h4>' + emLinha(m[1]) + '</h4>'; return; }
      if ((m = /^\s*[-*•]\s+(.*)$/.exec(l))) {
        if (lista !== 'ul') { fechaLista(); html += '<ul>'; lista = 'ul'; }
        html += '<li>' + emLinha(m[1]) + '</li>'; return;
      }
      if ((m = /^\s*\d+[.)]\s+(.*)$/.exec(l))) {
        if (lista !== 'ol') { fechaLista(); html += '<ol>'; lista = 'ol'; }
        html += '<li>' + emLinha(m[1]) + '</li>'; return;
      }
      if (!l.trim()) { fechaLista(); return; }
      fechaLista();
      html += '<p>' + emLinha(l) + '</p>';
    });
    if (emCodigo) html += '<pre><code>' + RS.esc(codigo.join('\n')) + '</code></pre>';
    fechaLista();
    return html;
  };

})(window.RS);
