/* Rota Sênior — vida: Casamento (checklist, orçamento, cartório), Finanças e Perfil. */
(function (RS) {
  'use strict';

  const esc = RS.esc;
  const moeda = function (n) { return RS.fmt.moeda(n); };

  /* Campo de dinheiro: aceita "45.000", "45000" ou "45000,50". */
  function campoValor(id, rotulo, valor, acao, extra) {
    return '<label class="campo"><span class="rotulo">' + esc(rotulo) + '</span>' +
      '<input class="entrada mono" id="' + id + '" inputmode="decimal" data-mudar="' + acao + '"' + (extra || '') +
      ' value="' + (valor ? esc(String(valor).replace('.', ',')) : '') + '" placeholder="0"></label>';
  }

  /* ===================== CASAMENTO ===================== */

  function contagemCasamento() {
    const casamento = RS.deISO(RS.estado.perfil.casamento);
    if (!casamento) {
      return '<form class="cartao pilha" data-enviar="definir-casamento"><h2 class="titulo-sec">Qual é a data?</h2>' +
        '<p class="lide">Com a data, o app calcula a janela do cartório e encaixa o checklist mês a mês.</p>' +
        '<div class="fila" style="align-items:flex-end"><label class="campo"><span class="rotulo">Data do casamento</span><input class="entrada" type="date" id="cas-data" name="data" required></label>' +
        '<button class="btn btn-placa" type="submit">Salvar data</button></div></form>';
    }
    const hoje = RS.hoje();
    const dias = RS.diasEntre(hoje, casamento);
    if (dias < 0) {
      return '<section class="cartao pilha-p"><p class="sobre">Casados desde ' + RS.fmt.data(casamento, 'media') + '</p>' +
        '<p class="contagem"><b>' + (-dias) + '</b><span>dias de casados</span></p></section>';
    }
    let sabados = 0;
    for (let d = RS.maisDias(hoje, 1); d < casamento; d = RS.maisDias(d, 1)) if (d.getDay() === 6) sabados++;
    const pend = RS.passosDaLinha(RS.idx.linhas.cas).filter(function (p) { return !RS.feito(p.id); }).length;
    return '<section class="cartao pilha-p" aria-label="Contagem regressiva">' +
      '<p class="sobre">' + RS.fmt.data(casamento, 'longa') + ' de ' + casamento.getFullYear() + '</p>' +
      '<p class="contagem"><b>' + dias + '</b><span>' + (dias === 1 ? 'dia' : 'dias') + ' para o casamento</span></p>' +
      '<p class="pequeno">' + Math.floor(dias / 7) + ' semanas · ' + sabados + ' sábados livres para resolver as coisas · ' + pend + ' itens pendentes no checklist</p></section>';
  }

  function htmlChecklist() {
    const l = RS.idx.linhas.cas;
    return '<p class="lide">Cada etapa mostra a janela de datas ideal, calculada a partir do dia do casamento. Combine as tarefas com quem vai casar com você: a reunião de domingo na rotina serve para isso.</p>' +
      RS.htmlEstacoes(l);
  }

  function htmlOrcamento() {
    const C = RS.dados.casamento;
    const o = RS.estado.orcamento;
    const teto = Number(o.teto) || 0;
    const conv = Number(o.convidados) || 0;
    let contratado = 0, pago = 0;
    C.orcamento.forEach(function (it) {
      const x = o.itens[it.id] || {};
      contratado += Number(x.valor) || 0;
      if (x.pago) pago += Number(x.valor) || 0;
    });
    const saldo = teto - contratado;
    let h = '<div class="campos">' +
      campoValor('orc-teto', 'Teto do orçamento (R$)', teto, 'orc-teto') +
      '<label class="campo"><span class="rotulo">Convidados</span><input class="entrada mono" id="orc-conv" inputmode="numeric" data-mudar="orc-conv" value="' + (conv || '') + '" placeholder="100"></label>' +
    '</div>';
    if (conv) {
      const ref = conv * (C.porConvidado.espaco + C.porConvidado.buffet);
      h += '<p class="faixa pequeno">Referência de mercado para ' + conv + ' convidados: espaço + buffet giram em torno de <span class="mono forte">' + moeda(ref) + '</span> (' + esc(C.fonteConvidado) + '). Faixa total comum para 100 convidados: ' + esc(C.faixa100) + '.</p>';
    }
    h += '<div class="resumo">' +
      '<div><b class="mono" style="font-size:1.25rem">' + moeda(contratado) + '</b><span>contratado</span></div>' +
      '<div><b class="mono" style="font-size:1.25rem">' + moeda(pago) + '</b><span>já pago</span></div>' +
      '<div><b class="mono" style="font-size:1.25rem;color:' + (saldo < 0 ? 'var(--erro)' : 'inherit') + '">' + moeda(saldo) + '</b><span>' + (saldo < 0 ? 'acima do teto' : 'livre no teto') + '</span></div></div>';
    if (teto) h += RS.barra(Math.min(100, Math.round((contratado / teto) * 100)), 'cas', 'Parte do teto já contratada');
    h += '<div class="tabela-rolo"><table class="tabela"><thead><tr><th>Item</th><th class="num">Sugerido</th><th class="num">Contratado (R$)</th><th>Pago</th></tr></thead><tbody>';
    C.orcamento.forEach(function (it) {
      const x = o.itens[it.id] || {};
      h += '<tr><td><span class="forte">' + esc(it.nome) + '</span><br><span class="pequeno mudo">' + it.pct + '% · ' + esc(it.dica) + '</span></td>' +
        '<td class="num mono">' + (teto ? moeda(teto * it.pct / 100) : '—') + '</td>' +
        '<td class="num"><input class="entrada mono" id="orc-' + it.id + '" inputmode="decimal" aria-label="Valor contratado: ' + esc(it.nome) + '" data-mudar="orc-item" data-id="' + it.id + '" value="' + (x.valor ? esc(String(x.valor).replace('.', ',')) : '') + '" placeholder="0"></td>' +
        '<td><label class="alvo"><input class="marca" type="checkbox" id="orc-pago-' + it.id + '" data-mudar="orc-pago" data-id="' + it.id + '"' + (x.pago ? ' checked' : '') + '><span class="so-leitor">Pago: ' + esc(it.nome) + '</span></label></td></tr>';
    });
    h += '</tbody></table></div>';
    h += '<section class="cartao texto"><h3 class="titulo-sec">Como economizar sem estragar a festa</h3><ul>';
    C.economia.forEach(function (d) { h += '<li>' + esc(d) + '</li>'; });
    return h + '</ul></section>';
  }

  function htmlCartorio() {
    const C = RS.dados.casamento;
    const casamento = RS.deISO(RS.estado.perfil.casamento);
    let h = '';
    if (casamento) {
      const de = RS.maisDias(casamento, -90), ate = RS.maisDias(casamento, -30), ideal = RS.maisDias(casamento, -70);
      const certidao = RS.maisDias(ideal, -60);
      h += '<section class="painel painel-datas"><div class="painel-topo"><span>Datas do cartório</span><strong>' + RS.fmt.data(casamento, 'media') + '</strong></div>' +
        '<div class="partida"><div class="partida-hora">' + RS.fmt.data(certidao) + '</div><div><div class="partida-titulo">Pedir certidões novas</div><p class="partida-como">Muitos cartórios exigem certidão de nascimento emitida há no máximo 90 dias na entrada.</p></div><span></span></div>' +
        '<div class="partida"><div class="partida-hora">' + RS.fmt.data(de) + '</div><div><div class="partida-titulo">Abre a janela de entrada</div><p class="partida-como">O certificado de habilitação vale 90 dias (Código Civil, art. 1.532). Antes disso ele venceria antes do casamento.</p></div><span></span></div>' +
        '<div class="partida"><div class="partida-hora">' + RS.fmt.data(ideal) + '</div><div><div class="partida-titulo">Data recomendada para dar entrada</div><p class="partida-como">Sobra folga para os 15 dias de proclamas e uma eventual análise mais longa.</p></div><span></span></div>' +
        '<div class="partida"><div class="partida-hora">' + RS.fmt.data(ate) + '</div><div><div class="partida-titulo">Último momento seguro</div><p class="partida-como">Depois disso o prazo fica apertado. Confirme a agenda direto no cartório do seu bairro.</p></div><span></span></div>' +
        '</section>';
    } else {
      h += '<p class="faixa">Coloque a data do casamento para ver as datas do cartório calculadas.</p>';
    }
    h += '<div class="grade-2">';
    C.cartorio.forEach(function (b) {
      h += '<section class="cartao texto"><h3 class="titulo-sec">' + esc(b.titulo) + '</h3><ul>';
      b.itens.forEach(function (i) { h += '<li>' + esc(i) + '</li>'; });
      h += '</ul></section>';
    });
    h += '</div><section class="pilha-p"><h3 class="titulo-sec">Regimes de bens</h3><div class="tabela-rolo"><table class="tabela" style="min-width:34rem"><thead><tr><th>Regime</th><th>Na prática</th><th>Precisa de pacto?</th></tr></thead><tbody>';
    C.regimes.forEach(function (r) { h += '<tr><td class="forte">' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>'; });
    h += '</tbody></table></div><p class="pequeno mudo">' + esc(C.notaCartorio) + '</p>' +
      '<div class="fila">' + RS.externo('https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilado.htm', 'Código Civil (arts. 1.511 a 1.570)') + '</div></section>';
    return h;
  }

  RS.paginas.casamento = {
    titulo: 'Casamento',
    desenhar: function (param) {
      const aba = param === 'orcamento' ? 'orcamento' : param === 'cartorio' ? 'cartorio' : 'checklist';
      let h = RS.cabecalho('Casamento', 'Rumo ao sim', 'Checklist com datas, orçamento que soma sozinho e o passo a passo do cartório.');
      h += contagemCasamento();
      h += RS.sub([
        { id: 'checklist', nome: 'Checklist', hash: 'casamento' },
        { id: 'orcamento', nome: 'Orçamento', hash: 'casamento-orcamento' },
        { id: 'cartorio', nome: 'Cartório', hash: 'casamento-cartorio' }
      ], aba);
      if (aba === 'checklist') h += htmlChecklist();
      else if (aba === 'orcamento') h += htmlOrcamento();
      else h += htmlCartorio();
      return h;
    }
  };

  RS.acoes['definir-casamento'] = function (form) {
    if (!form.elements.data.value) return;
    RS.estado.perfil.casamento = form.elements.data.value;
    RS.salvar();
    RS.desenhar();
  };
  RS.acoes['orc-teto'] = function (el) { RS.estado.orcamento.teto = RS.numero(el.value); RS.salvar(); RS.desenhar(); };
  RS.acoes['orc-conv'] = function (el) { RS.estado.orcamento.convidados = Math.max(0, Math.round(RS.numero(el.value))); RS.salvar(); RS.desenhar(); };
  RS.acoes['orc-item'] = function (el) {
    const id = el.getAttribute('data-id');
    const itens = RS.estado.orcamento.itens;
    itens[id] = Object.assign({}, itens[id], { valor: RS.numero(el.value) });
    RS.salvar(); RS.desenhar();
  };
  RS.acoes['orc-pago'] = function (el) {
    const id = el.getAttribute('data-id');
    const itens = RS.estado.orcamento.itens;
    itens[id] = Object.assign({}, itens[id], { pago: el.checked });
    RS.salvar(); RS.desenhar();
  };

  /* ===================== FINANÇAS ===================== */

  /* Aporte mensal para chegar a um alvo: considera o que já está guardado rendendo. */
  RS.aporteMensal = function (alvo, guardado, meses, taxaAno) {
    if (meses <= 0) return Math.max(0, alvo - guardado);
    const i = Math.pow(1 + taxaAno / 100, 1 / 12) - 1;
    if (i === 0) return Math.max(0, (alvo - guardado) / meses);
    const fator = Math.pow(1 + i, meses);
    const falta = alvo - guardado * fator;
    return Math.max(0, falta * i / (fator - 1));
  };

  function mesesAte(iso) {
    const d = RS.deISO(iso);
    if (!d) return 12;
    const h = RS.hoje();
    return Math.max(1, (d.getFullYear() - h.getFullYear()) * 12 + d.getMonth() - h.getMonth());
  }

  RS.paginas.financas = {
    titulo: 'Finanças',
    desenhar: function () {
      const F = RS.dados.financas;
      const f = RS.estado.financas;
      const meses = mesesAte(RS.estado.perfil.casamento);
      const alvo = f.alvo || RS.estado.orcamento.teto || 0;
      const aporte = RS.aporteMensal(alvo, f.guardado || 0, meses, f.taxa || 0);
      const reserva = (f.custo || 0) * 6;

      let h = RS.cabecalho('Finanças', 'Dinheiro com método', 'Três contas que resolvem 80% da vida financeira de quem está começando: orçamento, reserva e meta.');
      h += '<p class="nota"><strong>Referência de ' + esc(F.referencia.data) + ':</strong> ' + esc(F.referencia.texto) + '</p>';

      // 1. orçamento 50-30-20
      const r = f.renda || 0;
      h += '<section class="cartao pilha" aria-labelledby="f1-t"><h2 class="titulo-sec" id="f1-t">1. Para onde vai a renda</h2>' +
        '<div class="campos">' + campoValor('fin-renda', 'Renda mensal líquida (bolsa + extras)', r, 'fin-campo', ' data-k="renda"') + '</div>' +
        '<div class="resumo">' +
          '<div><b class="mono" style="font-size:1.25rem">' + moeda(r * .5) + '</b><span>50% essenciais</span></div>' +
          '<div><b class="mono" style="font-size:1.25rem">' + moeda(r * .3) + '</b><span>30% estilo de vida</span></div>' +
          '<div><b class="mono" style="font-size:1.25rem">' + moeda(r * .2) + '</b><span>20% futuro</span></div></div>' +
        '<p class="pequeno mudo">Com casamento em vista, inverta: tente 30% para o futuro e corte o estilo de vida para 20% até a data.</p></section>';

      // 2. reserva
      h += '<section class="cartao pilha" aria-labelledby="f2-t"><h2 class="titulo-sec" id="f2-t">2. Reserva de emergência</h2>' +
        '<div class="campos">' + campoValor('fin-custo', 'Custo de vida mensal', f.custo, 'fin-campo', ' data-k="custo"') + '</div>' +
        '<p>Meta: <span class="mono forte">' + moeda(reserva) + '</span> (6 meses de custo). Deixe em Tesouro Selic ou CDB com liquidez diária que pague 100% do CDI ou mais.</p></section>';

      // 3. meta
      h += '<section class="cartao pilha" aria-labelledby="f3-t"><h2 class="titulo-sec" id="f3-t">3. Meta com data</h2>' +
        '<div class="campos">' +
          campoValor('fin-alvo', 'Quanto precisa juntar (R$)', alvo, 'fin-campo', ' data-k="alvo"') +
          campoValor('fin-guardado', 'Já guardado (R$)', f.guardado, 'fin-campo', ' data-k="guardado"') +
          campoValor('fin-taxa', 'Rendimento ao ano, líquido (%)', f.taxa, 'fin-campo', ' data-k="taxa"') +
        '</div>' +
        '<p class="resultado">' + moeda(aporte) + '<span class="pequeno mudo" style="font-family:var(--f-texto);font-weight:400"> por mês, durante ' + meses + ' meses</span></p>' +
        '<p class="pequeno mudo">' + (RS.estado.perfil.casamento ? 'Prazo até o casamento. ' : '') + (RS.estado.orcamento.teto && !f.alvo ? 'Alvo puxado do teto do orçamento do casamento. ' : '') + 'O cálculo considera que o dinheiro já guardado também rende.</p></section>';

      h += '<section class="pilha" aria-labelledby="f4-t"><h2 class="titulo-sec" id="f4-t">Regras que valem ouro</h2><div class="grade-2">';
      F.blocos.forEach(function (b) {
        h += '<div class="cartao texto"><h3 class="titulo-item">' + esc(b.titulo) + '</h3><ul>';
        b.itens.forEach(function (i) { h += '<li>' + esc(i) + '</li>'; });
        h += '</ul></div>';
      });
      h += '</div><div class="fila"><a class="btn" href="#linha-fin">' + RS.icone('linhas', 18) + ' Trilha de finanças</a><a class="btn" href="#biblioteca-fin">' + RS.icone('biblioteca', 18) + ' Cursos grátis de finanças</a></div></section>';
      return h;
    }
  };

  RS.acoes['fin-campo'] = function (el) {
    RS.estado.financas[el.getAttribute('data-k')] = RS.numero(el.value);
    RS.salvar();
    RS.desenhar();
  };

  /* ===================== PERFIL ===================== */

  RS.paginas.perfil = {
    titulo: 'Perfil',
    desenhar: function () {
      const p = RS.estado.perfil;
      const temas = [['auto', 'Automático'], ['claro', 'Claro'], ['escuro', 'Escuro']];
      let h = RS.cabecalho('Perfil', 'Seus dados');
      h += '<form class="cartao pilha" data-enviar="perfil-salvar">' +
        '<div class="campos">' +
          '<label class="campo"><span class="rotulo">Nome</span><input class="entrada" id="pf-nome" name="nome" value="' + esc(p.nome) + '" autocomplete="given-name"></label>' +
          '<label class="campo"><span class="rotulo">Data do casamento</span><input class="entrada" id="pf-casamento" name="casamento" type="date" value="' + esc(p.casamento) + '"></label>' +
          '<label class="campo"><span class="rotulo">Início do plano</span><input class="entrada" id="pf-inicio" name="inicio" type="date" value="' + esc(p.inicio) + '"></label>' +
          '<label class="campo"><span class="rotulo">Cidade</span><input class="entrada" id="pf-cidade" name="cidade" value="' + esc(p.cidade) + '" autocomplete="address-level2"></label>' +
        '</div>' +
        '<label class="campo"><span class="rotulo">Contexto para o Mentor IA</span><textarea class="entrada" id="pf-contexto" name="contexto" rows="3" placeholder="Ex.: estudante de Sistemas de Informação, estagiário de TI, sei o básico de JavaScript, quero vaga júnior full stack.">' + esc(p.contexto) + '</textarea>' +
        '<span class="pequeno mudo">Entra no começo de todo prompt. Não coloque senhas, dados de clientes nem informações internas da empresa.</span></label>' +
        '<div><button class="btn btn-placa" type="submit">Salvar perfil</button></div></form>';

      h += '<section class="pilha" aria-labelledby="tm-t"><h2 class="titulo-sec" id="tm-t">Aparência</h2><div class="chips">';
      temas.forEach(function (t) { h += '<button type="button" class="chip" data-acao="perfil-tema" data-v="' + t[0] + '" aria-pressed="' + (p.tema === t[0]) + '">' + t[1] + '</button>'; });
      h += '</div></section>';

      h += '<section class="cartao pilha" aria-labelledby="sv-t"><h2 class="titulo-sec" id="sv-t">Onde seu progresso fica</h2>' +
        '<p class="fila"><span class="etiqueta">' + RS.icone('certo', 12) + ' <span id="nuvem-txt">' + esc(RS.textoNuvem()) + '</span></span></p>' +
        '<p class="pequeno">' + (RS.noClaude
          ? 'Publicado no Claude, o progresso vai para uma área privada da sua conta: abra o mesmo link no celular e no computador e ele aparece nos dois. Ninguém mais vê esses dados.'
          : 'Aberto direto no navegador, o progresso fica salvo neste navegador. Use o backup para levar para outro aparelho.') + '</p>' +
        '<div class="fila">' +
          '<button class="btn" type="button" data-acao="backup-exportar">' + RS.icone('baixar', 18) + ' Exportar backup</button>' +
          '<button class="btn" type="button" data-acao="backup-importar">' + RS.icone('subir', 18) + ' Importar backup</button>' +
        '</div></section>';

      h += '<section class="cartao pilha" aria-labelledby="zr-t"><h2 class="titulo-sec" id="zr-t">Recomeçar</h2>' +
        '<p class="pequeno">Apaga passos marcados, respostas, afazeres, vagas salvas e orçamento. Seus dados de perfil continuam.</p>' +
        '<div><button class="btn" type="button" data-acao="zerar" style="color:var(--erro);border-color:var(--erro)">Apagar meu progresso</button></div></section>';

      h += '<section class="faixa texto pequeno"><h2 class="rotulo">Sobre o app</h2>' +
        '<p>Rota Sênior junta cronograma, trilhas, biblioteca gratuita, perguntas, vagas, casamento, finanças e 300 ideias de produto. Conteúdo revisado em novembro de 2026. Links externos abrem em outra aba; cursos que pedem cadastro precisam ser feitos com a sua própria conta.</p>' +
        (RS.noClaude ? '' : '<p>No celular, use "Adicionar à tela inicial" no menu do navegador para abrir como app.</p>') + '</section>';
      return h;
    }
  };

  RS.acoes['perfil-salvar'] = function (form) {
    const p = RS.estado.perfil;
    p.nome = form.elements.nome.value.trim();
    p.casamento = form.elements.casamento.value || '';
    p.inicio = form.elements.inicio.value || p.inicio;
    p.cidade = form.elements.cidade.value.trim();
    p.contexto = form.elements.contexto.value.trim();
    p.pronto = true;
    RS.salvar();
    RS.desenhar();
    RS.aviso('Perfil salvo');
  };

  RS.acoes['perfil-tema'] = function (el) {
    RS.estado.perfil.tema = el.getAttribute('data-v');
    RS.ui.temaMexido = true;
    RS.salvar();
    RS.aplicarTema();
    RS.desenhar();
  };

  RS.acoes['backup-exportar'] = function () {
    const json = JSON.stringify(RS.estado, null, 2);
    RS.baixar('rota-senior-backup-' + RS.iso(RS.hoje()) + '.json', json).then(function (ok) {
      if (!ok) RS.copiar(json, 'Backup copiado. Cole num arquivo de texto para guardar.');
    });
  };

  RS.acoes['backup-importar'] = function () {
    const veu = RS.dialogo(
      '<div class="pilha"><h2 class="titulo-sec">Importar backup</h2>' +
        '<p class="pequeno">Escolha o arquivo .json exportado antes ou cole o conteúdo abaixo. O progresso atual será substituído.</p>' +
        '<input class="entrada" type="file" id="imp-arquivo" accept=".json,application/json">' +
        '<textarea class="entrada" id="imp-texto" rows="6" placeholder="{ ... }" data-foco></textarea>' +
        '<p class="pequeno" id="imp-erro" style="color:var(--erro)" hidden></p>' +
        '<div class="fila" style="justify-content:flex-end"><button class="btn" type="button" data-fechar>Cancelar</button>' +
        '<button class="btn btn-placa" type="button" id="imp-ok">Importar</button></div></div>');
    const texto = veu.querySelector('#imp-texto');
    const erro = veu.querySelector('#imp-erro');
    veu.querySelector('#imp-arquivo').addEventListener('change', function (e) {
      const arq = e.target.files && e.target.files[0];
      if (!arq) return;
      const leitor = new FileReader();
      leitor.onload = function () { texto.value = String(leitor.result || ''); };
      leitor.readAsText(arq);
    });
    veu.querySelector('#imp-ok').addEventListener('click', function () {
      let dados;
      try { dados = JSON.parse(texto.value); } catch (e) { dados = null; }
      if (!dados || typeof dados !== 'object' || !dados.perfil) {
        erro.textContent = 'Esse texto não é um backup do Rota Sênior. Confira se copiou o arquivo inteiro.';
        erro.hidden = false;
        return;
      }
      RS.substituirEstado(dados);
      RS.fecharDialogo();
      RS.aplicarTema();
      RS.desenhar();
      RS.aviso('Backup importado');
    });
  };

  RS.acoes.zerar = function () {
    RS.confirmar({
      titulo: 'Apagar todo o progresso?',
      texto: 'Isso não pode ser desfeito. Exporte um backup antes se quiser guardar.',
      sim: 'Apagar tudo',
      aoConfirmar: function () { RS.zerarEstado(); RS.desenhar(); RS.aviso('Progresso apagado'); }
    });
  };

})(window.RS);
