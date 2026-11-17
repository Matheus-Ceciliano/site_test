/* Rota Sênior — casamento (orçamento e cartório) e finanças. */
(function (D) {
  'use strict';

  D.casamento = {
    porConvidado: { espaco: 119, buffet: 143 },
    fonteConvidado: 'Relatório Wedy 2026, citado pela Gazeta SP',
    faixa100: 'de R$ 40 mil a R$ 100 mil, segundo a Serasa; o Relatório Wedy estima de R$ 65 mil a R$ 170 mil para 2027',

    orcamento: [
      { id: 'buffet', nome: 'Buffet e bebidas', pct: 30, dica: 'Maior gasto. Peça degustação e preço por convidado.' },
      { id: 'local', nome: 'Local da festa e cerimônia', pct: 15, dica: 'Sexta e domingo costumam sair mais baratos.' },
      { id: 'foto', nome: 'Fotografia e vídeo', pct: 10, dica: 'Veja um casamento inteiro entregue, não só os melhores cliques.' },
      { id: 'decor', nome: 'Decoração e flores', pct: 10, dica: 'Flores da estação custam menos.' },
      { id: 'traje', nome: 'Trajes e beleza', pct: 8, dica: 'Aluguel e brechó de noivas reduzem muito.' },
      { id: 'musica', nome: 'Música (DJ ou banda)', pct: 6, dica: 'Confira se som e iluminação estão inclusos.' },
      { id: 'alianca', nome: 'Alianças', pct: 4, dica: 'O peso em gramas define o preço do ouro.' },
      { id: 'doces', nome: 'Bolo e doces', pct: 4, dica: 'Bolo cenográfico com bolo de corte na cozinha economiza.' },
      { id: 'assessoria', nome: 'Assessoria do dia', pct: 4, dica: 'Assessoria só no dia libera vocês e a família.' },
      { id: 'cerimonia', nome: 'Cartório, igreja ou celebrante', pct: 3, dica: 'Taxas do cartório variam por estado.' },
      { id: 'convite', nome: 'Convites e papelaria', pct: 2, dica: 'Convite digital custa quase nada.' },
      { id: 'lembranca', nome: 'Lembranças', pct: 1, dica: 'Opcional. Muita gente já dispensa.' },
      { id: 'reserva', nome: 'Imprevistos', pct: 3, dica: 'Sempre aparece algo. Guarde e não gaste antes.' }
    ],

    economia: [
      'Defina o número de convidados primeiro: cada convidado a mais pesa em buffet, espaço, convite e lembrança.',
      'Datas fora de alta temporada e dias que não são sábado têm descontos grandes.',
      'Cerimônia e festa no mesmo lugar economizam transporte e decoração.',
      'Peça pelo menos 3 orçamentos de cada item e negocie pagamento à vista.',
      'Pagamentos parcelados devem terminar antes da data do casamento.',
      'Corte o que ninguém lembra (lembrancinhas caras, convite impresso de luxo) e mantenha o que todos lembram (comida, música, foto).'
    ],

    cartorio: [
      {
        titulo: 'Documentos dos dois',
        itens: [
          'Certidão de nascimento atualizada (muitos cartórios pedem emitida há no máximo 90 dias). Divorciados levam a certidão de casamento com averbação do divórcio.',
          'Documento de identidade com foto e CPF.',
          'Comprovante de residência.',
          'Duas testemunhas maiores de 18 anos, com documento.',
          'Escritura de pacto antenupcial, se o regime não for comunhão parcial.'
        ]
      },
      {
        titulo: 'Como funciona',
        itens: [
          'Vocês pedem a habilitação no cartório de registro civil da residência de um dos dois.',
          'O cartório publica os proclamas (edital) por 15 dias para eventuais impedimentos.',
          'Aprovada, a habilitação gera um certificado válido por 90 dias (Código Civil, art. 1.532).',
          'O casamento civil é celebrado no cartório ou em outro local com o juiz de paz, ou o certificado vai para o celebrante religioso.',
          'Religioso com efeito civil: o registro precisa ser feito em até 90 dias depois da cerimônia.'
        ]
      },
      {
        titulo: 'Custos e gratuidade',
        itens: [
          'As taxas são definidas por lei em cada estado. Exemplo: no DF a habilitação custava cerca de R$ 293 em 2026.',
          'Celebração fora do cartório (na festa) tem custo adicional do juiz de paz.',
          'Quem declara não ter condições de pagar tem direito à gratuidade da habilitação, do registro e da primeira certidão.',
          'Ligue para o cartório do seu bairro e pergunte valores, prazo e se a entrada é presencial ou online.'
        ]
      },
      {
        titulo: 'Nome e depois do casamento',
        itens: [
          'Qualquer um dos dois pode acrescentar o sobrenome do outro. É opcional.',
          'Se mudar o nome, atualize RG, CPF, título de eleitor, CNH, banco e cadastro no trabalho.',
          'A certidão de casamento é o documento para incluir dependente em plano de saúde e no imposto de renda.'
        ]
      }
    ],

    regimes: [
      ['Comunhão parcial', 'O que for comprado durante o casamento é dos dois; o que cada um tinha antes, e heranças, continua individual.', 'Não. É o padrão.'],
      ['Separação total', 'Cada um mantém seus bens, antes e depois do casamento.', 'Sim, pacto antenupcial por escritura pública.'],
      ['Comunhão universal', 'Todos os bens, de antes e de depois, passam a ser dos dois.', 'Sim, pacto antenupcial por escritura pública.'],
      ['Participação final nos aquestos', 'Durante o casamento cada um administra o seu; numa separação, divide-se o que foi construído junto.', 'Sim, pacto antenupcial por escritura pública.']
    ],
    notaCartorio: 'Informação geral com base no Código Civil, não é orientação jurídica. Regras práticas, documentos aceitos e taxas variam por estado e por cartório: confirme sempre no cartório escolhido.'
  };

  D.financas = {
    referencia: {
      data: 'novembro de 2026',
      texto: 'a Selic está em 13,75% ao ano (Copom, 4/11/2026). Tesouro Selic e CDBs que pagam 100% do CDI rendem perto disso antes do imposto de renda. O padrão de 10% ao ano líquido nas contas abaixo já desconta o imposto com margem de segurança.'
    },
    blocos: [
      {
        titulo: 'A ordem certa',
        itens: [
          'Primeiro: parar de fazer dívida nova.',
          'Segundo: quitar dívidas caras (cartão rotativo, cheque especial).',
          'Terceiro: reserva de emergência de 6 meses de custo.',
          'Quarto: metas com data (casamento, casa).',
          'Só depois: investimentos de longo prazo e maior risco.'
        ]
      },
      {
        titulo: 'Cartão e dívidas',
        itens: [
          'Use o cartão como débito: só gaste o que já tem na conta.',
          'Nunca pague o mínimo da fatura.',
          'Some todas as parcelas abertas antes de parcelar algo novo.',
          'Dívida cara? Troque por uma mais barata (consignado, portabilidade) e renegocie.'
        ]
      },
      {
        titulo: 'Investir sem complicar',
        itens: [
          'Reserva: Tesouro Selic ou CDB de liquidez diária de banco sólido.',
          'Meta com data: título ou CDB que vença perto da data da meta.',
          'Respeite o limite do FGC por CPF e por instituição.',
          'Entenda antes de investir. Se não consegue explicar, não invista.'
        ]
      },
      {
        titulo: 'Fuja de golpes',
        itens: [
          'Retorno alto e garantido não existe.',
          'Ninguém sério pede senha, código ou "taxa para liberar" dinheiro.',
          'Consulte a CVM antes de investir com qualquer empresa.',
          'Pressa é a principal ferramenta do golpista: pare e confira.'
        ]
      }
    ]
  };

})(window.RS.dados);
