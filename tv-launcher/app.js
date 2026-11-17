/*
 * Novo Home — tela inicial personalizada para TV Samsung (Tizen).
 *
 * Escrito em JavaScript "antigo" (ES5: var, function, sem => nem let/const),
 * porque o navegador das TVs Samsung de 2015 não entende JavaScript moderno.
 *
 * Fora da TV (num navegador de computador) ele usa uma lista de apps de
 * exemplo, para você conseguir ver e testar o visual.
 */
(function () {
    'use strict';

    // ------------------------------------------------------------------
    // 1. FAVORITOS — edite aqui para trocar a ordem, as cores ou os apps.
    //    "busca" são pedaços do nome do app na TV (sem acento, minúsculo).
    // ------------------------------------------------------------------
    var FAVORITOS = [
        { nome: 'YouTube',     busca: ['youtube'],             cor: '#e62117', texto: '#ffffff' },
        { nome: 'Netflix',     busca: ['netflix'],             cor: '#141414', texto: '#e50914' },
        { nome: 'Prime Video', busca: ['prime', 'amazon'],     cor: '#1a98ff', texto: '#ffffff' },
        { nome: 'Globoplay',   busca: ['globoplay', 'globo'],  cor: '#f2304a', texto: '#ffffff' },
        { nome: 'Spotify',     busca: ['spotify'],             cor: '#1db954', texto: '#0b0d14' },
        { nome: 'Internet',    busca: ['internet', 'browser', 'navegador', 'web'], cor: '#4a5a9c', texto: '#ffffff' }
    ];

    // Teclas do controle remoto Samsung
    var TECLA = { ESQ: 37, CIMA: 38, DIR: 39, BAIXO: 40, OK: 13, VOLTAR: 10009 };

    var naTV = typeof window.tizen !== 'undefined';
    var linhas = [];          // [[{el, appId}], [{el, appId}]]
    var linhaAtual = 0;
    var colunaAtual = [0, 0]; // lembra a posição em cada linha
    var temporizadorAviso = null;

    // ------------------------------------------------------------------
    // Utilidades
    // ------------------------------------------------------------------
    function semAcento(txt) {
        var de = 'áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ';
        var para = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
        var saida = '';
        for (var i = 0; i < txt.length; i++) {
            var p = de.indexOf(txt.charAt(i));
            saida += p >= 0 ? para.charAt(p) : txt.charAt(i);
        }
        return saida.toLowerCase();
    }

    function aviso(msg) {
        var el = document.getElementById('aviso');
        el.innerHTML = msg;
        el.className = 'aviso visivel';
        clearTimeout(temporizadorAviso);
        temporizadorAviso = setTimeout(function () { el.className = 'aviso'; }, 3500);
    }

    // ------------------------------------------------------------------
    // Relógio e saudação
    // ------------------------------------------------------------------
    var DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    var MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
                 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    function doisDigitos(n) { return n < 10 ? '0' + n : '' + n; }

    function atualizarRelogio() {
        var agora = new Date();
        var h = agora.getHours();
        document.getElementById('relogio').innerHTML = doisDigitos(h) + ':' + doisDigitos(agora.getMinutes());
        var dia = DIAS[agora.getDay()];
        document.getElementById('data').innerHTML =
            dia.charAt(0).toUpperCase() + dia.slice(1) + ', ' + agora.getDate() + ' de ' + MESES[agora.getMonth()];
        document.getElementById('saudacao').innerHTML =
            h < 12 ? 'Bom dia' : (h < 18 ? 'Boa tarde' : 'Boa noite');
    }

    // ------------------------------------------------------------------
    // Lista de apps instalados
    // ------------------------------------------------------------------
    var APPS_EXEMPLO = [
        { id: 'demo.youtube', name: 'YouTube' },
        { id: 'demo.netflix', name: 'Netflix' },
        { id: 'demo.prime', name: 'Amazon Prime Video' },
        { id: 'demo.globoplay', name: 'Globoplay' },
        { id: 'demo.spotify', name: 'Spotify - Music and Podcasts' },
        { id: 'demo.browser', name: 'Internet' },
        { id: 'demo.mubi', name: 'MUBI' },
        { id: 'demo.redbull', name: 'Red Bull TV' },
        { id: 'demo.tunein', name: 'TuneIn' },
        { id: 'demo.netmovies', name: 'NetMovies' }
    ];

    // Apps do sistema que não fazem sentido aparecer na lista
    var ESCONDER = ['novohome', 'widget', 'service', 'org.tizen', 'smarthub', 'settings', 'setting',
                    'installer', 'popup', 'keyboard', 'ime', 'indicator', 'download'];

    function deveEsconder(app) {
        var texto = semAcento((app.id || '') + ' ' + (app.name || ''));
        if (!app.name || app.show === false) { return true; }
        for (var i = 0; i < ESCONDER.length; i++) {
            if (texto.indexOf(ESCONDER[i]) >= 0) { return true; }
        }
        return false;
    }

    function carregarApps(pronto) {
        if (!naTV) { pronto(APPS_EXEMPLO); return; }
        try {
            tizen.application.getAppsInfo(function (lista) {
                var apps = [];
                for (var i = 0; i < lista.length; i++) {
                    if (!deveEsconder(lista[i])) { apps.push(lista[i]); }
                }
                apps.sort(function (a, b) { return a.name.localeCompare(b.name); });
                pronto(apps);
            }, function () {
                aviso('Não consegui ler a lista de apps da TV.');
                pronto([]);
            });
        } catch (e) {
            aviso('Erro ao ler apps: ' + e.message);
            pronto([]);
        }
    }

    function acharApp(apps, palavras) {
        for (var p = 0; p < palavras.length; p++) {
            for (var i = 0; i < apps.length; i++) {
                if (semAcento(apps[i].name).indexOf(palavras[p]) >= 0) { return apps[i]; }
            }
        }
        return null;
    }

    // ------------------------------------------------------------------
    // Montar a tela
    // ------------------------------------------------------------------
    function criarFavorito(fav, app) {
        var el = document.createElement('div');
        el.className = 'cartao' + (app ? '' : ' indisponivel');
        el.style.backgroundColor = fav.cor;
        el.innerHTML = '<div class="nome-grande"></div><div class="rotulo"></div>';
        el.firstChild.style.color = fav.texto;
        el.firstChild.appendChild(document.createTextNode(fav.nome));
        el.lastChild.appendChild(document.createTextNode(app ? 'Abrir' : 'Não instalado'));
        return { el: el, appId: app ? app.id : null, nome: fav.nome };
    }

    function criarPequeno(app) {
        var el = document.createElement('div');
        el.className = 'cartao pequeno';
        var icone;
        if (app.iconPath) {
            icone = document.createElement('img');
            icone.src = app.iconPath;
            icone.onerror = function () {
                var letra = document.createElement('div');
                letra.className = 'letra';
                letra.appendChild(document.createTextNode(app.name.charAt(0).toUpperCase()));
                el.replaceChild(letra, icone);
            };
        } else {
            icone = document.createElement('div');
            icone.className = 'letra';
            icone.appendChild(document.createTextNode(app.name.charAt(0).toUpperCase()));
        }
        var rotulo = document.createElement('div');
        rotulo.className = 'rotulo';
        rotulo.appendChild(document.createTextNode(app.name));
        el.appendChild(icone);
        el.appendChild(rotulo);
        return { el: el, appId: app.id, nome: app.name };
    }

    function montar(apps) {
        var favEl = document.getElementById('favoritos');
        var todosEl = document.getElementById('todos');
        var linhaFav = [];
        var linhaTodos = [];
        var i;

        for (i = 0; i < FAVORITOS.length; i++) {
            var c = criarFavorito(FAVORITOS[i], acharApp(apps, FAVORITOS[i].busca));
            favEl.appendChild(c.el);
            linhaFav.push(c);
        }
        for (i = 0; i < apps.length; i++) {
            var p = criarPequeno(apps[i]);
            todosEl.appendChild(p.el);
            linhaTodos.push(p);
        }

        linhas = [linhaFav];
        if (linhaTodos.length) { linhas.push(linhaTodos); }
        focar();
    }

    // ------------------------------------------------------------------
    // Navegação pelo controle
    // ------------------------------------------------------------------
    function trilhoDaLinha(n) {
        return document.getElementById(n === 0 ? 'favoritos' : 'todos');
    }

    function focar() {
        for (var l = 0; l < linhas.length; l++) {
            for (var c = 0; c < linhas[l].length; c++) {
                var el = linhas[l][c].el;
                var foco = (l === linhaAtual && c === colunaAtual[l]);
                el.className = el.className.replace(/\s*foco/g, '') + (foco ? ' foco' : '');
            }
            // rola a linha para o cartão focado continuar visível
            var largura = l === 0 ? 328 : 248;
            var porTela = Math.floor((1920 - 96) / largura);
            var desloc = Math.max(0, colunaAtual[l] - porTela + 1) * largura;
            var t = trilhoDaLinha(l);
            t.style.webkitTransform = 'translateX(-' + desloc + 'px)';
            t.style.transform = 'translateX(-' + desloc + 'px)';
        }
    }

    function abrir(item) {
        if (!item.appId) {
            aviso(item.nome + ' não está instalado nesta TV.');
            return;
        }
        if (!naTV) {
            aviso('Na TV, isso abriria: ' + item.nome);
            return;
        }
        try {
            tizen.application.launch(item.appId, null, function () {
                aviso('Não foi possível abrir ' + item.nome + '.');
            });
        } catch (e) {
            aviso('Erro ao abrir ' + item.nome + ': ' + e.message);
        }
    }

    function aoApertar(ev) {
        if (!linhas.length) { return; }
        var linha = linhas[linhaAtual];
        switch (ev.keyCode) {
            case TECLA.ESQ:
                if (colunaAtual[linhaAtual] > 0) { colunaAtual[linhaAtual]--; }
                break;
            case TECLA.DIR:
                if (colunaAtual[linhaAtual] < linha.length - 1) { colunaAtual[linhaAtual]++; }
                break;
            case TECLA.CIMA:
                if (linhaAtual > 0) { linhaAtual--; }
                break;
            case TECLA.BAIXO:
                if (linhaAtual < linhas.length - 1) { linhaAtual++; }
                break;
            case TECLA.OK:
                abrir(linha[colunaAtual[linhaAtual]]);
                return;
            case TECLA.VOLTAR:
                // Voltar sobe para os favoritos; já nos favoritos, não faz nada
                linhaAtual = 0;
                break;
            default:
                return;
        }
        if (ev.preventDefault) { ev.preventDefault(); }
        focar();
    }

    // ------------------------------------------------------------------
    // Início
    // ------------------------------------------------------------------
    atualizarRelogio();
    setInterval(atualizarRelogio, 15000);
    document.addEventListener('keydown', aoApertar);
    carregarApps(montar);
}());
