/*
 * Novo Home — tela inicial personalizada para TV Samsung (Tizen).
 *
 * Escrito em JavaScript "antigo" (ES5: var, function, XMLHttpRequest, sem
 * => nem let/const nem fetch), porque o navegador das TVs Samsung de 2015
 * não entende JavaScript moderno.
 *
 * Fora da TV (num navegador de computador) ele usa apps e dados de exemplo
 * quando não consegue acessar a internet, para você ver e testar o visual.
 */
(function () {
    'use strict';

    // ==================================================================
    // CONFIGURAÇÃO — mude aqui
    // ==================================================================
    var CONFIG = {
        // Cidade da previsão do tempo (API Open-Meteo, grátis e sem cadastro)
        cidade: 'São Paulo',

        // Chave grátis do TMDB para os filmes em alta.
        // Crie em: themoviedb.org → Configurações → API → "API Key (v3)".
        tmdbChave: '',

        // De quantos em quantos minutos atualizar clima e filmes
        atualizarClimaMin: 30,
        atualizarFilmesMin: 360
    };

    // Favoritos. "busca" = pedaços do nome do app na TV (minúsculo, sem acento).
    // "atalho" = tecla numérica do controle; "cor" do botão colorido (opcional).
    var FAVORITOS = [
        { nome: 'YouTube',     busca: ['youtube'],            cor: '#e62117', texto: '#ffffff', atalho: '1', botao: 'vermelho' },
        { nome: 'Netflix',     busca: ['netflix'],            cor: '#141414', texto: '#e50914', atalho: '2', botao: 'verde' },
        { nome: 'Prime Video', busca: ['prime', 'amazon'],    cor: '#1a98ff', texto: '#ffffff', atalho: '3' },
        { nome: 'Globoplay',   busca: ['globoplay', 'globo'], cor: '#f2304a', texto: '#ffffff', atalho: '4', botao: 'amarelo' },
        { nome: 'Spotify',     busca: ['spotify'],            cor: '#1db954', texto: '#0b0d14', atalho: '5', botao: 'azul' },
        { nome: 'Internet',    busca: ['internet', 'browser', 'navegador', 'web'], cor: '#4a5a9c', texto: '#ffffff', atalho: '6' }
    ];

    // ==================================================================
    // Teclas do controle remoto Samsung
    // ==================================================================
    var TECLA = { ESQ: 37, CIMA: 38, DIR: 39, BAIXO: 40, OK: 13, VOLTAR: 10009 };
    var BOTOES_CORES = {
        vermelho: { codigo: 403, nomeTizen: 'ColorF0Red',    css: '#e8333a' },
        verde:    { codigo: 404, nomeTizen: 'ColorF1Green',  css: '#2fbf4f' },
        amarelo:  { codigo: 405, nomeTizen: 'ColorF2Yellow', css: '#f4c430' },
        azul:     { codigo: 406, nomeTizen: 'ColorF3Blue',   css: '#2f6fe8' }
    };

    var naTV = typeof window.tizen !== 'undefined';
    var linhas = [];            // [{ id, el, itens: [{el, acao}] }]
    var linhaAtual = 0;
    var colunaAtual = {};       // posição lembrada em cada linha
    var atalhos = {};           // keyCode -> item de favorito
    var detalheAberto = false;
    var temporizadorAviso = null;
    var appsInstalados = [];

    function $(id) { return document.getElementById(id); }

    // ==================================================================
    // Utilidades
    // ==================================================================
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

    function texto(el, valor) {
        el.innerHTML = '';
        el.appendChild(document.createTextNode(valor));
        return el;
    }

    function criar(tag, classe, conteudo) {
        var el = document.createElement(tag);
        if (classe) { el.className = classe; }
        if (conteudo !== undefined) { texto(el, conteudo); }
        return el;
    }

    function aviso(msg) {
        var el = $('aviso');
        texto(el, msg);
        el.className = 'aviso visivel';
        clearTimeout(temporizadorAviso);
        temporizadorAviso = setTimeout(function () { el.className = 'aviso'; }, 3500);
    }

    function doisDigitos(n) { return n < 10 ? '0' + n : '' + n; }

    function hojeChave(data) {
        var d = data || new Date();
        return d.getFullYear() + '-' + doisDigitos(d.getMonth() + 1) + '-' + doisDigitos(d.getDate());
    }

    function formatarDuracao(ms) {
        var min = Math.round(ms / 60000);
        if (min < 1) { return '0 min'; }
        if (min < 60) { return min + ' min'; }
        var h = Math.floor(min / 60);
        var resto = min % 60;
        return h + 'h' + (resto ? ' ' + doisDigitos(resto) : '');
    }

    // Armazenamento que não quebra se o localStorage estiver indisponível
    var armazenamento = {
        ler: function (chave, padrao) {
            try {
                var v = window.localStorage.getItem(chave);
                return v ? JSON.parse(v) : padrao;
            } catch (e) { return padrao; }
        },
        gravar: function (chave, valor) {
            try { window.localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { /* ignora */ }
        }
    };

    // Requisição JSON com XMLHttpRequest (fetch não existe nas TVs de 2015)
    function pegarJSON(url, sucesso, falha) {
        var xhr = new XMLHttpRequest();
        var terminou = false;
        function erro(msg) { if (!terminou) { terminou = true; falha(msg); } }
        xhr.open('GET', url, true);
        xhr.timeout = 12000;
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4 || terminou) { return; }
            if (xhr.status >= 200 && xhr.status < 300) {
                try { terminou = true; sucesso(JSON.parse(xhr.responseText)); }
                catch (e) { falha('resposta inválida'); }
            } else {
                erro('HTTP ' + xhr.status);
            }
        };
        xhr.ontimeout = function () { erro('tempo esgotado'); };
        xhr.onerror = function () { erro('sem conexão'); };
        try { xhr.send(); } catch (e) { erro(e.message); }
    }

    // ==================================================================
    // Relógio e saudação
    // ==================================================================
    var DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    var MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
                 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    function atualizarRelogio() {
        var agora = new Date();
        var h = agora.getHours();
        var dia = DIAS[agora.getDay()];
        texto($('relogio'), doisDigitos(h) + ':' + doisDigitos(agora.getMinutes()));
        texto($('data'), dia.charAt(0).toUpperCase() + dia.slice(1) + ', ' +
            agora.getDate() + ' de ' + MESES[agora.getMonth()]);
        texto($('saudacao'), h < 12 ? 'Bom dia' : (h < 18 ? 'Boa tarde' : 'Boa noite'));
    }

    // ==================================================================
    // Clima — Open-Meteo (https://open-meteo.com), sem chave
    // ==================================================================
    function descricaoClima(codigo) {
        if (codigo === 0) { return 'Céu limpo'; }
        if (codigo === 1) { return 'Poucas nuvens'; }
        if (codigo === 2) { return 'Parcialmente nublado'; }
        if (codigo === 3) { return 'Nublado'; }
        if (codigo === 45 || codigo === 48) { return 'Neblina'; }
        if (codigo >= 51 && codigo <= 57) { return 'Garoa'; }
        if (codigo >= 61 && codigo <= 67) { return 'Chuva'; }
        if (codigo >= 71 && codigo <= 77) { return 'Neve'; }
        if (codigo >= 80 && codigo <= 82) { return 'Pancadas de chuva'; }
        if (codigo >= 95) { return 'Tempestade'; }
        return 'Tempo variável';
    }

    function mostrarClima(c) {
        texto($('clima-temp'), Math.round(c.temp) + '°');
        texto($('clima-desc'), c.cidade + ' · ' + descricaoClima(c.codigo));
        texto($('clima-extra'), 'Máx ' + Math.round(c.max) + '°  Mín ' + Math.round(c.min) + '°  ·  Chuva ' + c.chuva + '%');
    }

    function carregarClima() {
        var local = armazenamento.ler('novohome.local', null);

        function buscarPrevisao(lugar) {
            var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lugar.lat + '&longitude=' + lugar.lon +
                '&current=temperature_2m,weather_code' +
                '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
                '&timezone=auto&forecast_days=1';
            pegarJSON(url, function (r) {
                var c = {
                    cidade: lugar.nome,
                    temp: r.current.temperature_2m,
                    codigo: r.current.weather_code,
                    max: r.daily.temperature_2m_max[0],
                    min: r.daily.temperature_2m_min[0],
                    chuva: r.daily.precipitation_probability_max[0] || 0
                };
                armazenamento.gravar('novohome.clima', c);
                mostrarClima(c);
            }, falhou);
        }

        function falhou() {
            var salvo = armazenamento.ler('novohome.clima', null);
            if (salvo) { mostrarClima(salvo); return; }
            if (!naTV) {   // prévia no computador sem internet
                mostrarClima({ cidade: CONFIG.cidade, temp: 27, codigo: 2, max: 31, min: 19, chuva: 40 });
                return;
            }
            texto($('clima-desc'), 'Clima indisponível');
            texto($('clima-extra'), 'Verifique a internet da TV');
        }

        if (local && local.busca === CONFIG.cidade) { buscarPrevisao(local); return; }

        var urlGeo = 'https://geocoding-api.open-meteo.com/v1/search?count=1&language=pt&name=' +
            encodeURIComponent(CONFIG.cidade);
        pegarJSON(urlGeo, function (r) {
            if (!r.results || !r.results.length) {
                texto($('clima-desc'), 'Cidade não encontrada');
                texto($('clima-extra'), 'Confira CONFIG.cidade no app.js');
                return;
            }
            var lugar = { busca: CONFIG.cidade, nome: r.results[0].name, lat: r.results[0].latitude, lon: r.results[0].longitude };
            armazenamento.gravar('novohome.local', lugar);
            buscarPrevisao(lugar);
        }, falhou);
    }

    // ==================================================================
    // Filmes em alta — TMDB (https://www.themoviedb.org), chave grátis
    // ==================================================================
    var FILMES_EXEMPLO = [
        { title: 'Filme de exemplo 1', vote_average: 8.1, release_date: '2026-10-01', overview: 'Prévia sem internet. Na TV, aqui aparece a sinopse do filme.' },
        { title: 'Filme de exemplo 2', vote_average: 7.4, release_date: '2026-09-12', overview: '' },
        { title: 'Filme de exemplo 3', vote_average: 6.9, release_date: '2026-11-05', overview: '' },
        { title: 'Filme de exemplo 4', vote_average: 7.8, release_date: '2026-08-20', overview: '' },
        { title: 'Filme de exemplo 5', vote_average: 8.4, release_date: '2026-07-30', overview: '' },
        { title: 'Filme de exemplo 6', vote_average: 7.0, release_date: '2026-10-18', overview: '' },
        { title: 'Filme de exemplo 7', vote_average: 6.5, release_date: '2026-11-01', overview: '' }
    ];

    function abrirDetalhe(f) {
        var poster = $('detalhe-poster');
        if (f.poster_path) {
            poster.src = 'https://image.tmdb.org/t/p/w500' + f.poster_path;
            poster.style.display = '';
        } else {
            poster.removeAttribute('src');
            poster.style.display = 'none';
        }
        texto($('detalhe-titulo'), f.title);
        texto($('detalhe-info'), '★ ' + (f.vote_average || 0).toFixed(1) +
            (f.release_date ? '   ·   ' + f.release_date.substring(0, 4) : ''));
        texto($('detalhe-sinopse'), f.overview || 'Sem sinopse em português.');
        $('detalhe').className = 'detalhe aberto';
        detalheAberto = true;
    }

    function fecharDetalhe() {
        $('detalhe').className = 'detalhe';
        detalheAberto = false;
    }

    function criarCartaoFilme(f) {
        var el = criar('div', 'cartao filme');
        if (f.poster_path) {
            var img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/w342' + f.poster_path;
            el.appendChild(img);
        } else {
            el.appendChild(criar('div', 'sem-poster', f.title));
        }
        el.appendChild(criar('div', 'nota', '★ ' + (f.vote_average || 0).toFixed(1)));
        el.appendChild(criar('div', 'rotulo', f.title));
        return { el: el, acao: function () { abrirDetalhe(f); } };
    }

    function mostrarFilmes(lista) {
        var itens = [];
        for (var i = 0; i < lista.length && i < 20; i++) { itens.push(criarCartaoFilme(lista[i])); }
        preencherLinha('filmes', itens);
    }

    function mostrarMensagemFilmes(msg) {
        var el = criar('div', 'cartao mensagem', msg);
        preencherLinha('filmes', [{ el: el, acao: function () { aviso(msg); } }]);
    }

    function carregarFilmes() {
        if (!CONFIG.tmdbChave) {
            if (!naTV) { mostrarFilmes(FILMES_EXEMPLO); return; }
            mostrarMensagemFilmes('Para ver os filmes em alta, crie uma chave grátis em themoviedb.org ' +
                '(Configurações → API) e coloque em CONFIG.tmdbChave no app.js.');
            return;
        }
        var url = 'https://api.themoviedb.org/3/trending/movie/week?language=pt-BR&api_key=' +
            encodeURIComponent(CONFIG.tmdbChave);
        pegarJSON(url, function (r) {
            armazenamento.gravar('novohome.filmes', r.results || []);
            mostrarFilmes(r.results || []);
        }, function (erro) {
            var salvo = armazenamento.ler('novohome.filmes', null);
            if (salvo && salvo.length) { mostrarFilmes(salvo); return; }
            mostrarMensagemFilmes('Não consegui buscar os filmes (' + erro + '). Confira a chave do TMDB e a internet da TV.');
        });
    }

    // ==================================================================
    // Uso da TV — conta o tempo nos apps abertos pelo Novo Home
    // ==================================================================
    // Formato salvo: { 'AAAA-MM-DD': { idDoApp: { nome, ms, vezes } } }
    var MAX_SESSAO = 6 * 60 * 60 * 1000;   // ignora sessões acima de 6h (TV esquecida ligada)

    function registrarAbertura(appId, nome) {
        armazenamento.gravar('novohome.emUso', { id: appId, nome: nome, inicio: new Date().getTime() });
    }

    function fecharSessaoPendente() {
        var p = armazenamento.ler('novohome.emUso', null);
        if (!p) { return; }
        armazenamento.gravar('novohome.emUso', null);
        var dur = Math.min(new Date().getTime() - p.inicio, MAX_SESSAO);
        if (dur < 5000) { return; }   // abriu e voltou na hora

        var uso = armazenamento.ler('novohome.uso', {});
        var dia = hojeChave(new Date(p.inicio));
        if (!uso[dia]) { uso[dia] = {}; }
        if (!uso[dia][p.id]) { uso[dia][p.id] = { nome: p.nome, ms: 0, vezes: 0 }; }
        uso[dia][p.id].ms += dur;
        uso[dia][p.id].vezes += 1;

        // guarda só os últimos 14 dias
        var dias = [];
        for (var d in uso) { if (uso.hasOwnProperty(d)) { dias.push(d); } }
        dias.sort();
        while (dias.length > 14) { delete uso[dias.shift()]; }

        armazenamento.gravar('novohome.uso', uso);
    }

    function somarDia(diaUso) {
        var total = 0;
        for (var id in diaUso) { if (diaUso.hasOwnProperty(id)) { total += diaUso[id].ms; } }
        return total;
    }

    function usoExemplo() {
        var u = {};
        var hoje = hojeChave();
        u[hoje] = {
            'demo.youtube': { nome: 'YouTube', ms: 95 * 60000, vezes: 4 },
            'demo.netflix': { nome: 'Netflix', ms: 72 * 60000, vezes: 2 },
            'demo.globoplay': { nome: 'Globoplay', ms: 30 * 60000, vezes: 1 }
        };
        u['2000-01-01'] = { 'demo.youtube': { nome: 'YouTube', ms: 300 * 60000, vezes: 9 } };
        return u;
    }

    function montarUso() {
        var uso = armazenamento.ler('novohome.uso', {});
        var temDados = false;
        for (var k in uso) { if (uso.hasOwnProperty(k)) { temDados = true; break; } }
        if (!temDados && !naTV) { uso = usoExemplo(); temDados = true; }

        var hoje = uso[hojeChave()] || {};
        var totalHoje = somarDia(hoje);

        // últimos 7 dias
        var totalSemana = 0;
        var limite = new Date();
        limite.setDate(limite.getDate() - 6);
        var chaveLimite = hojeChave(limite);
        for (var d in uso) {
            if (uso.hasOwnProperty(d) && d >= chaveLimite) { totalSemana += somarDia(uso[d]); }
        }

        // apps mais usados hoje
        var ranking = [];
        for (var id in hoje) { if (hoje.hasOwnProperty(id)) { ranking.push(hoje[id]); } }
        ranking.sort(function (a, b) { return b.ms - a.ms; });

        var itens = [];
        function cartao(titulo, valor, sub, fracao) {
            var el = criar('div', 'cartao uso');
            el.appendChild(criar('div', 'uso-titulo', titulo));
            el.appendChild(criar('div', 'uso-valor', valor));
            el.appendChild(criar('div', 'uso-sub', sub));
            if (fracao !== undefined) {
                var barra = criar('div', 'barra');
                var cheio = document.createElement('div');
                cheio.style.width = Math.round(Math.min(1, fracao) * 100) + '%';
                barra.appendChild(cheio);
                el.appendChild(barra);
            }
            itens.push({ el: el, acao: function () { aviso(titulo + ': ' + valor + ' — ' + sub); } });
        }

        if (!temDados) {
            cartao('Hoje', '0 min', 'Abra um app por aqui para contar');
        } else {
            var vezesHoje = 0;
            for (var r = 0; r < ranking.length; r++) { vezesHoje += ranking[r].vezes; }
            cartao('Hoje', formatarDuracao(totalHoje), vezesHoje + ' apps abertos');
            cartao('Últimos 7 dias', formatarDuracao(totalSemana), 'média de ' + formatarDuracao(totalSemana / 7) + ' por dia');
            for (var i = 0; i < ranking.length && i < 3; i++) {
                cartao((i + 1) + 'º mais usado hoje', ranking[i].nome, formatarDuracao(ranking[i].ms) +
                    ' · ' + ranking[i].vezes + 'x', totalHoje ? ranking[i].ms / totalHoje : 0);
            }
        }
        preencherLinha('uso', itens);
    }

    // ==================================================================
    // Apps instalados e abertura
    // ==================================================================
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

    var ESCONDER = ['novohome', 'widget', 'service', 'org.tizen', 'smarthub', 'settings', 'setting',
                    'installer', 'popup', 'keyboard', 'ime', 'indicator', 'download'];

    function deveEsconder(app) {
        if (!app.name || app.show === false) { return true; }
        var t = semAcento((app.id || '') + ' ' + app.name);
        for (var i = 0; i < ESCONDER.length; i++) {
            if (t.indexOf(ESCONDER[i]) >= 0) { return true; }
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

    function acharApp(palavras) {
        for (var p = 0; p < palavras.length; p++) {
            for (var i = 0; i < appsInstalados.length; i++) {
                if (semAcento(appsInstalados[i].name).indexOf(palavras[p]) >= 0) { return appsInstalados[i]; }
            }
        }
        return null;
    }

    function abrirApp(appId, nome) {
        if (!appId) { aviso(nome + ' não está instalado nesta TV.'); return; }
        registrarAbertura(appId, nome);
        if (!naTV) { aviso('Na TV, isso abriria: ' + nome); return; }
        try {
            tizen.application.launch(appId, null, function () {
                armazenamento.gravar('novohome.emUso', null);
                aviso('Não foi possível abrir ' + nome + '.');
            });
        } catch (e) {
            armazenamento.gravar('novohome.emUso', null);
            aviso('Erro ao abrir ' + nome + ': ' + e.message);
        }
    }

    function criarFavorito(fav) {
        var app = acharApp(fav.busca);
        var el = criar('div', 'cartao' + (app ? '' : ' indisponivel'));
        el.style.backgroundColor = fav.cor;
        var nome = criar('div', 'nome-grande', fav.nome);
        nome.style.color = fav.texto;
        el.appendChild(nome);
        el.appendChild(criar('div', 'rotulo', app ? 'Abrir' : 'Não instalado'));

        if (fav.atalho || fav.botao) {
            var selo = criar('div', 'atalho', fav.atalho || '');
            if (fav.botao && BOTOES_CORES[fav.botao]) {
                var bolinha = criar('span', 'bolinha');
                bolinha.style.backgroundColor = BOTOES_CORES[fav.botao].css;
                selo.appendChild(bolinha);
            }
            el.appendChild(selo);
        }

        var item = { el: el, acao: function () { abrirApp(app ? app.id : null, fav.nome); } };
        if (fav.atalho) { atalhos[48 + parseInt(fav.atalho, 10)] = item; }
        if (fav.botao && BOTOES_CORES[fav.botao]) { atalhos[BOTOES_CORES[fav.botao].codigo] = item; }
        return item;
    }

    function criarPequeno(app) {
        var el = criar('div', 'cartao pequeno');
        var letra = criar('div', 'letra', app.name.charAt(0).toUpperCase());
        if (app.iconPath) {
            var icone = document.createElement('img');
            icone.src = app.iconPath;
            icone.onerror = function () { el.replaceChild(letra, icone); };
            el.appendChild(icone);
        } else {
            el.appendChild(letra);
        }
        el.appendChild(criar('div', 'rotulo', app.name));
        return { el: el, acao: function () { abrirApp(app.id, app.name); } };
    }

    // ==================================================================
    // Linhas e navegação pelo controle
    // ==================================================================
    function preencherLinha(id, itens) {
        var trilho = $(id);
        trilho.innerHTML = '';
        for (var i = 0; i < itens.length; i++) { trilho.appendChild(itens[i].el); }

        var linha = null;
        for (var l = 0; l < linhas.length; l++) { if (linhas[l].id === id) { linha = linhas[l]; } }
        if (!linha) { return; }
        linha.itens = itens;
        if ((colunaAtual[id] || 0) >= itens.length) { colunaAtual[id] = Math.max(0, itens.length - 1); }
        focar();
    }

    function linhasVisiveis() {
        var v = [];
        for (var i = 0; i < linhas.length; i++) { if (linhas[i].itens.length) { v.push(linhas[i]); } }
        return v;
    }

    function focar() {
        var visiveis = linhasVisiveis();
        if (!visiveis.length) { return; }
        if (linhaAtual >= visiveis.length) { linhaAtual = visiveis.length - 1; }
        var ativa = visiveis[linhaAtual];

        for (var l = 0; l < linhas.length; l++) {
            var linha = linhas[l];
            var col = colunaAtual[linha.id] || 0;
            for (var c = 0; c < linha.itens.length; c++) {
                var el = linha.itens[c].el;
                var foco = (linha === ativa && c === col);
                el.className = el.className.replace(/\s*foco/g, '') + (foco ? ' foco' : '');
            }
            // rolagem horizontal da linha
            var trilho = $(linha.id);
            var alvo = linha.itens[col] ? linha.itens[col].el : null;
            var desloc = alvo ? Math.max(0, alvo.offsetLeft + alvo.offsetWidth - (1920 - 96 - 120)) : 0;
            trilho.style.webkitTransform = 'translateX(-' + desloc + 'px)';
            trilho.style.transform = 'translateX(-' + desloc + 'px)';
        }

        // rolagem vertical da página para a linha ativa ficar visível
        var secao = ativa.secao;
        var limite = 1080 - secao.offsetHeight - 40;
        var y = Math.max(0, secao.offsetTop - Math.min(limite, 260));
        if (linhaAtual === 0) { y = 0; }
        var cont = $('conteudo');
        cont.style.webkitTransform = 'translateY(-' + y + 'px)';
        cont.style.transform = 'translateY(-' + y + 'px)';
    }

    function aoApertar(ev) {
        var codigo = ev.keyCode;

        if (detalheAberto) {
            if (codigo === TECLA.VOLTAR || codigo === TECLA.OK || codigo === 8 || codigo === 27) {
                fecharDetalhe();
                if (ev.preventDefault) { ev.preventDefault(); }
            }
            return;
        }

        // Atalhos: números e botões coloridos
        if (atalhos[codigo]) {
            atalhos[codigo].acao();
            if (ev.preventDefault) { ev.preventDefault(); }
            return;
        }

        var visiveis = linhasVisiveis();
        if (!visiveis.length) { return; }
        var linha = visiveis[linhaAtual];
        var col = colunaAtual[linha.id] || 0;

        switch (codigo) {
            case TECLA.ESQ:   if (col > 0) { colunaAtual[linha.id] = col - 1; } break;
            case TECLA.DIR:   if (col < linha.itens.length - 1) { colunaAtual[linha.id] = col + 1; } break;
            case TECLA.CIMA:  if (linhaAtual > 0) { linhaAtual--; } break;
            case TECLA.BAIXO: if (linhaAtual < visiveis.length - 1) { linhaAtual++; } break;
            case TECLA.OK:
                if (linha.itens[col]) { linha.itens[col].acao(); }
                return;
            case TECLA.VOLTAR:
                linhaAtual = 0;
                break;
            default:
                return;
        }
        if (ev.preventDefault) { ev.preventDefault(); }
        focar();
    }

    function registrarTeclas() {
        if (!naTV || !tizen.tvinputdevice) { return; }
        var nomes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        for (var b in BOTOES_CORES) { if (BOTOES_CORES.hasOwnProperty(b)) { nomes.push(BOTOES_CORES[b].nomeTizen); } }
        for (var i = 0; i < nomes.length; i++) {
            try { tizen.tvinputdevice.registerKey(nomes[i]); } catch (e) { /* tecla não existe neste modelo */ }
        }
    }

    // Quando o usuário volta de outro app para o Novo Home
    function aoVoltar() {
        if (document.hidden || document.webkitHidden) { return; }
        fecharSessaoPendente();
        montarUso();
        carregarClima();
    }

    // ==================================================================
    // Início
    // ==================================================================
    function iniciar() {
        var secoes = document.querySelectorAll('.linha');
        for (var i = 0; i < secoes.length; i++) {
            var id = secoes[i].getAttribute('data-linha');
            linhas.push({ id: id, secao: secoes[i], itens: [] });
            colunaAtual[id] = 0;
        }

        atualizarRelogio();
        setInterval(atualizarRelogio, 15000);
        registrarTeclas();
        document.addEventListener('keydown', aoApertar);
        document.addEventListener('visibilitychange', aoVoltar);
        document.addEventListener('webkitvisibilitychange', aoVoltar);

        fecharSessaoPendente();

        carregarApps(function (apps) {
            appsInstalados = apps;
            var fav = [];
            for (var f = 0; f < FAVORITOS.length; f++) { fav.push(criarFavorito(FAVORITOS[f])); }
            preencherLinha('favoritos', fav);

            var todos = [];
            for (var a = 0; a < apps.length; a++) { todos.push(criarPequeno(apps[a])); }
            preencherLinha('todos', todos);
        });

        montarUso();
        carregarClima();
        carregarFilmes();
        setInterval(carregarClima, CONFIG.atualizarClimaMin * 60000);
        setInterval(carregarFilmes, CONFIG.atualizarFilmesMin * 60000);
    }

    iniciar();
}());
