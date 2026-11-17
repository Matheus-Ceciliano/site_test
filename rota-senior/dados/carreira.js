/* Rota Sênior — vagas (pesquisadas em 17/11/2026) e modelos do Mentor IA. */
(function (D) {
  'use strict';

  const q = encodeURIComponent;

  D.vagas = {
    conferido: '2026-11-17',

    efetivacao: [
      'Ainda este mês, pergunte ao seu gestor o que alguém precisa demonstrar para ser contratado como júnior no time e marque uma data para revisar.',
      'Escolha uma melhoria que economize tempo ou dinheiro da área (automação, relatório, script, painel) e entregue em até 8 semanas.',
      'Peça feedback a cada 30 dias e anote o que você aplicou depois de cada conversa.',
      'Registre suas entregas com números em um documento simples: ele vira o argumento da efetivação e do currículo.',
      'Três meses antes do fim do contrato (o estágio na mesma empresa dura no máximo 2 anos), peça a conversa formal de efetivação.',
      'Em paralelo, mantenha candidaturas abertas toda semana: se a efetivação atrasar, você não começa do zero.'
    ],

    programas: [
      {
        id: 'vivo-2027', empresa: 'Vivo', programa: 'Programa de Estágio 2027', prazo: '2026-12-16',
        local: 'São Paulo (SP), presencial', url: 'https://estagiovivo2026.com.br/', confirmar: true,
        nota: 'Trilhas Start e Expert. A página cita estagiários de tecnologia; confirme se há vaga de TI para o seu curso e período.'
      },
      {
        id: 'vibra-2027', empresa: 'Vibra', programa: 'Programa de Estágio 2027', prazo: '2026-12-10',
        local: 'Rio de Janeiro, São Paulo, Belém e Marabá', url: 'https://vibra.academiadouniversitario.com.br/',
        nota: 'Mais de 40 vagas para nível superior, inscrições de 10/11 a 10/12/2026. Confira se Sistemas de Informação está entre os cursos aceitos.'
      },
      {
        id: 'blip-2026', empresa: 'Blip', programa: 'Estágio em tecnologia e IA', prazo: '2026-11-30', remoto: true, confirmar: true,
        local: '100% remoto', bolsa: 'R$ 3.300 (segundo o anúncio)', url: 'https://job-boards.greenhouse.io/blip-global',
        nota: 'Um blog noticiou 37 vagas remotas com seleção feita junto com a Ada e inscrições até 30/11/2026. Não encontrei a página oficial do programa: confira no quadro de vagas da Blip.'
      },
      {
        id: 'serasa-2027', empresa: 'Serasa Experian', programa: 'Programa de Estágio 2027', prazo: '', remoto: true, confirmar: true,
        local: '100% remoto, com vagas de TI', url: 'https://www.serasaexperian.com.br/carreiras/',
        nota: 'As fontes divergem: uma diz que as inscrições fecharam em 04/11, outra que seguem em fluxo contínuo até 31/12/2026. Vale conferir hoje.'
      },
      {
        id: 'vtex-2027', empresa: 'VTEX', programa: 'Summer Internship 2027', prazo: '',
        local: 'Confirmar no anúncio', url: 'https://www.estagiotrainee.com/post/summer-internship-vtex-2027',
        nota: 'Programa de férias para estudantes de tecnologia, de janeiro a abril de 2027. O prazo de inscrição não foi informado.'
      },
      {
        id: 'iastech-2027', empresa: 'IASTECH', programa: 'Programa de Estágio 2027', prazo: '',
        local: 'Indaiatuba (SP)', url: 'https://www.iastech.com/en/programa-estagio-iastech-2027/',
        nota: 'Inscrições abertas com vagas que incluem TI. Prazo não informado na página.'
      },
      {
        id: 'vericode-jr', empresa: 'Vericode', programa: 'Desenvolvedor(a) Full Stack Júnior · Node.js e React Native', prazo: '', remoto: true, confirmar: true,
        local: 'Remoto, CLT', url: 'https://casado.dev/vaga/desenvolvedora-full-stack-junior-nodejs-react-native',
        nota: 'Vaga júnior publicada em 19/09/2026. Bom alvo para a fase Profissional; confira se ainda está aberta.'
      },
      {
        id: 'b9-jr', empresa: 'B9 Sistemas', programa: 'Desenvolvedor(a) React / Node.js Júnior', prazo: '', remoto: true, confirmar: true,
        local: 'Home office, PJ', bolsa: 'até R$ 3.500', url: 'https://programathor.com.br/jobs/22075-desenvolvedor-a-react-nodejs-junior',
        nota: 'Pede React e Node.js. Valor abaixo da média de júnior e contrato PJ: analise com a aba Como analisar.'
      },
      {
        id: 'ultrapar-2027', empresa: 'Ultrapar', programa: 'Estágio em tecnologia 2027', prazo: '2026-11-13',
        local: 'Confirmar no anúncio', url: 'https://www.clickguarulhos.com.br/2026/11/11/programa-de-estagio-na-area-de-tecnologia-inscricoes-terminam-na-sexta-feira/',
        nota: 'Já encerrado. Guarde como referência: programas de tecnologia costumam abrir entre agosto e novembro.'
      },
      {
        id: 'nubank-2027', empresa: 'Nubank', programa: 'Programa de Estágio 2027 (foco em IA)', prazo: '2026-08-30',
        local: 'Confirmar no site', url: 'https://estagio.nubank.com.br/',
        nota: 'Já encerrado. Anote para o próximo ciclo: em 2026 as inscrições foram até 30 de agosto.'
      }
    ],

    buscas: [
      { nome: 'LinkedIn Vagas', nota: 'Estágio em desenvolvimento, publicadas na última semana.', url: function (c) { return 'https://www.linkedin.com/jobs/search/?keywords=' + q('estágio desenvolvedor') + '&location=' + q(c || 'Brasil') + '&f_TPR=r604800'; } },
      { nome: 'Indeed', nota: 'Estágio de desenvolvedor remoto ou na sua cidade.', url: function (c) { return c ? 'https://br.indeed.com/jobs?q=' + q('estágio desenvolvedor') + '&l=' + q(c) : 'https://br.indeed.com/empregos-de-Est%C3%A1gio-Desenvolvedor-em-Remoto'; } },
      { nome: 'Gupy', nota: 'Onde muitas empresas grandes publicam estágio e júnior.', url: 'https://portal.gupy.io/job-search/term=' + q('estágio desenvolvedor') },
      { nome: 'CIEE', nota: 'Estágios de todas as áreas, com filtro por cidade e curso.', url: 'https://portal.ciee.org.br/' },
      { nome: 'eu.dev.br · estágio', nota: 'Mais de 200 vagas de estágio em tecnologia, remoto e híbrido.', url: 'https://eu.dev.br/vagas/nivel/estagio/' },
      { nome: 'DevVagas · estágio remoto', nota: 'Lista curada de estágios remotos em programação.', url: 'https://www.devvagas.com.br/vagas/estagio-remoto' },
      { nome: 'DevVagas · React júnior', nota: 'Para quando você estiver na fase Profissional.', url: 'https://www.devvagas.com.br/vagas/react-junior' },
      { nome: 'Programathor', nota: 'Vagas de tecnologia com salário e stack no anúncio.', url: 'https://programathor.com.br/jobs' },
      { nome: 'Glassdoor', nota: 'Vagas e avaliações de empresas: veja o que funcionários dizem.', url: 'https://www.glassdoor.com.br/Vaga/trabalho-remoto-estagi%C3%A1rio-de-desenvolvimento-de-software-vagas-SRCH_IL.0,15_IS12226_KO16,57.htm' },
      { nome: 'Casa do Dev · programas', nota: 'Lista de programas de estágio e trainee com status atualizado.', url: 'https://casado.dev/carreira/programas-de-estagio-e-trainee-2026-lista-atualizada' }
    ],

    analise: [
      {
        titulo: 'Antes de aplicar',
        itens: [
          'Aplique se você cumpre uns 60% dos requisitos. Itens "desejáveis" não eliminam.',
          'A stack bate com a sua trilha? Uma vaga em JavaScript, React ou Node acelera o plano.',
          'Some deslocamento e custo: uma bolsa maior longe de casa pode render menos.',
          'Leia sobre a empresa no Glassdoor e no LinkedIn: como tratam estagiários e juniores?',
          'Veja se existe chance de efetivação e quanto tempo costuma levar.'
        ]
      },
      {
        titulo: 'Seus direitos no estágio',
        itens: [
          'Jornada de até 6 horas por dia e 30 por semana para ensino superior.',
          'No estágio não obrigatório, bolsa e auxílio-transporte são obrigatórios.',
          'Recesso de 30 dias a cada ano de estágio, remunerado se houver bolsa (proporcional se for menos de um ano).',
          'Seguro contra acidentes pessoais pago pela empresa.',
          'Máximo de 2 anos na mesma empresa, com Termo de Compromisso assinado pela faculdade.'
        ]
      },
      {
        titulo: 'Sinais de alerta',
        itens: [
          'Cobram taxa, curso ou material para você começar.',
          'Pedem senha, código do banco ou dados bancários antes de contratar.',
          'Vaga de júnior pedindo 5 anos de experiência e 10 tecnologias.',
          'Estágio como PJ ou sem Termo de Compromisso com a faculdade.',
          'Processo só por WhatsApp, sem empresa identificável, ou salário muito acima do mercado.'
        ]
      },
      {
        titulo: 'Depois de aplicar',
        itens: [
          'Registre a vaga em Minhas vagas e atualize o status.',
          'Ajuste o currículo com as palavras da vaga (sem inventar nada).',
          'Mande uma mensagem curta ao recrutador no LinkedIn com o link do seu melhor projeto.',
          'Teste técnico: entregue no prazo, com README explicando decisões.',
          'Reprovou? Peça feedback educadamente. Muita gente responde e isso vale ouro.'
        ]
      }
    ],

    salarios: [
      { nivel: 'Estágio em desenvolvimento', faixa: 'R$ 1.200 a R$ 2.500', fonte: 'Guias salariais de 2026' },
      { nivel: 'Júnior (CLT)', faixa: 'R$ 3.000 a R$ 6.500', fonte: 'Guias de 2026; média Glassdoor em torno de R$ 3.463 (mar/2026)' },
      { nivel: 'Full stack júnior', faixa: 'R$ 6.850 (mediana)', fonte: 'Robert Half; percentil 75 em R$ 8.750' },
      { nivel: 'Back-end pleno', faixa: 'R$ 12.350 (mediana)', fonte: 'Robert Half' },
      { nivel: 'Back-end sênior', faixa: 'R$ 16.250 (mediana)', fonte: 'Robert Half' }
    ],
    notaSalarios: 'Valores brutos mensais. As fontes usam amostras diferentes e divergem bastante: empresas grandes e vagas remotas para fora pagam bem acima da média. Pesquise a empresa antes de negociar.'
  };

  D.mentor = {
    regras: [
      'Tente sozinho primeiro. Use a IA quando travar, não antes de começar.',
      'Peça dica, não resposta: "não me dê o código, me dê uma pista".',
      'Dê contexto: o que você sabe, o que tentou, o erro exato e o que espera.',
      'Leia e entenda toda linha gerada antes de usar. Se não sabe explicar, não está pronto para usar.',
      'Teste tudo e confira na documentação oficial. IA erra com confiança.',
      'Peça para a IA te fazer perguntas sobre o que você estudou. Lembrar ativamente fixa o conteúdo.',
      'Nunca cole senhas, chaves de API, dados de clientes ou código da empresa sem a política interna permitir.',
      'Use a IA para revisar e testar seu código, e escreva você a primeira versão.',
      'Desconfie de números, leis, preços e datas: peça a fonte e confira.',
      'No trabalho, diga quando algo foi feito com ajuda de IA. Transparência gera confiança.'
    ],
    modelos: [
      {
        id: 'conceito', linha: 'prog', nome: 'Aprender um conceito', quando: 'Para entender um assunto novo da trilha ou da faculdade.',
        campos: [
          { k: 'tema', rotulo: 'Assunto', dica: 'Ex.: closures em JavaScript' },
          { k: 'sabe', rotulo: 'O que você já sabe', dica: 'Ex.: sei o que é função e escopo', opcional: true }
        ],
        texto: 'Quero aprender {tema}. O que eu já sei: {sabe}.\n\nAja como um professor paciente:\n1. Explique o conceito em linguagem simples, com uma analogia do dia a dia.\n2. Mostre um exemplo curto e comentado.\n3. Liste os 3 erros mais comuns de iniciante.\n4. Termine com 3 perguntas para eu responder e conferir se entendi. Não dê as respostas ainda.'
      },
      {
        id: 'dica', linha: 'prog', nome: 'Travei num exercício', quando: 'Quando você tentou e não saiu. Recebe uma pista, não a solução.',
        campos: [
          { k: 'enunciado', rotulo: 'Enunciado', area: true, dica: 'Cole o enunciado do exercício' },
          { k: 'codigo', rotulo: 'Seu código até agora', area: true, mono: true, dica: 'Cole o que você já escreveu' },
          { k: 'tentou', rotulo: 'O que você tentou e o que aconteceu', dica: 'Ex.: o laço não para' }
        ],
        texto: 'Estou resolvendo este exercício e travei.\n\nEnunciado:\n{enunciado}\n\nMeu código:\n```\n{codigo}\n```\n\nO que tentei: {tentou}\n\nNão me dê a solução pronta. Me dê apenas uma pista sobre o que investigar, e uma pergunta que me ajude a perceber o erro. Se eu estiver no caminho errado, diga qual conceito devo revisar.'
      },
      {
        id: 'revisao', linha: 'prog', nome: 'Revisar meu código', quando: 'Depois de terminar, antes de abrir o pull request.',
        campos: [
          { k: 'linguagem', rotulo: 'Linguagem e tecnologia', dica: 'Ex.: React com TypeScript' },
          { k: 'objetivo', rotulo: 'O que o código faz', dica: 'Ex.: formulário de cadastro com validação' },
          { k: 'codigo', rotulo: 'Código', area: true, mono: true, dica: 'Cole o código (sem senhas ou chaves)' }
        ],
        texto: 'Revise este código em {linguagem}. Ele serve para: {objetivo}.\n\n```\n{codigo}\n```\n\nFaça uma revisão como um desenvolvedor sênior faria num pull request, em ordem de prioridade:\n1. Bugs e casos que vão quebrar.\n2. Segurança.\n3. Legibilidade e nomes.\n4. Desempenho, só se fizer diferença real.\nPara cada ponto, explique o porquê e mostre só o trecho alterado. Diga também o que está bom.'
      },
      {
        id: 'erro', linha: 'prog', nome: 'Entender um erro', quando: 'Quando aparece uma mensagem de erro que você não entende.',
        campos: [
          { k: 'erro', rotulo: 'Mensagem de erro completa', area: true, mono: true, dica: 'Cole o erro inteiro, com a pilha' },
          { k: 'contexto', rotulo: 'O que você estava fazendo', dica: 'Ex.: rodando npm run dev depois de instalar uma biblioteca' },
          { k: 'codigo', rotulo: 'Trecho de código relacionado', area: true, mono: true, opcional: true }
        ],
        texto: 'Recebi este erro:\n```\n{erro}\n```\n\nContexto: {contexto}\n\nCódigo relacionado:\n```\n{codigo}\n```\n\nExplique em português simples:\n1. O que a mensagem significa, linha por linha se precisar.\n2. As causas mais prováveis, da mais para a menos provável.\n3. Como eu confirmo qual é a causa (o que testar ou imprimir).\n4. Como corrigir.\nQuero aprender a ler esse tipo de erro sozinho da próxima vez.'
      },
      {
        id: 'entrevista', linha: 'car', nome: 'Simular entrevista', quando: 'Antes de um processo seletivo ou para treinar toda semana.',
        campos: [
          { k: 'vaga', rotulo: 'Vaga', dica: 'Ex.: estágio em desenvolvimento web com React' },
          { k: 'idioma', rotulo: 'Idioma da entrevista', dica: 'português ou inglês' },
          { k: 'projeto', rotulo: 'Seu melhor projeto, em uma frase', opcional: true, dica: 'Ex.: app de cardápio digital com React e Node' }
        ],
        texto: 'Quero treinar para uma entrevista de {vaga}, em {idioma}. Meu melhor projeto: {projeto}.\n\nMonte 6 perguntas, misturando comportamentais e técnicas de nível iniciante. Para cada pergunta:\n- O que o entrevistador quer avaliar.\n- Um roteiro de boa resposta (tópicos, não um texto pronto para decorar).\n- Um erro comum que reprova.\nNo fim, me diga como treinar em voz alta. Se eu enviar minhas respostas depois, avalie cada uma de 0 a 10 com sugestões.'
      },
      {
        id: 'plano', linha: 'car', nome: 'Plano de estudo', quando: 'Para encaixar um assunto novo na sua semana.',
        campos: [
          { k: 'tema', rotulo: 'Assunto', dica: 'Ex.: Node.js com Express e PostgreSQL' },
          { k: 'semanas', rotulo: 'Em quantas semanas', dica: 'Ex.: 6' },
          { k: 'horas', rotulo: 'Horas por semana', dica: 'Ex.: 8' }
        ],
        texto: 'Monte um plano para eu aprender {tema} em {semanas} semanas, com {horas} horas por semana.\n\nPara cada semana: objetivo, o que estudar (prefira documentação oficial e materiais gratuitos), um exercício prático e como sei que aprendi. Termine com um projeto final que eu possa colocar no portfólio. Seja realista com o tempo.'
      },
      {
        id: 'ingles', linha: 'ing', nome: 'Corrigir meu inglês', quando: 'Para mensagens, README, e-mails e o seu "tell me about yourself".',
        campos: [
          { k: 'texto', rotulo: 'Seu texto em inglês', area: true, dica: 'Escreva do seu jeito, sem tradutor' },
          { k: 'uso', rotulo: 'Onde vai usar', dica: 'Ex.: mensagem no Slack para o meu líder' }
        ],
        texto: 'Corrija este texto em inglês que vou usar em: {uso}.\n\n"{texto}"\n\n1. Mostre a versão corrigida, natural para ambiente de trabalho.\n2. Explique em português os 3 erros mais importantes e a regra por trás de cada um.\n3. Me dê 2 frases parecidas para eu praticar.\nNão mude o sentido do que eu quis dizer.'
      },
      {
        id: 'mvp', linha: 'prog', nome: 'Plano de MVP de uma ideia', quando: 'Para transformar uma das 300 ideias em projeto de portfólio.',
        campos: [
          { k: 'ideia', rotulo: 'Ideia', area: true, dica: 'Descreva a ideia ou use o botão "Plano com IA" na página Ideias' },
          { k: 'stack', rotulo: 'Stack que você quer usar', opcional: true, dica: 'Ex.: React, Node, PostgreSQL' }
        ],
        texto: 'Quero construir a primeira versão (MVP) desta ideia como projeto de portfólio:\n{ideia}\n\nStack: {stack}\n\nMonte:\n1. O problema e quem tem esse problema, em 2 frases.\n2. As 5 funcionalidades mínimas, em ordem.\n3. Modelo de dados (tabelas e campos principais).\n4. As telas necessárias.\n5. Um plano de 4 semanas para quem estuda cerca de 10 horas por semana.\n6. Como validar com 5 pessoas reais antes de investir mais.\n7. O que deixar de fora da primeira versão.'
      },
      {
        id: 'seguranca', linha: 'seg', nome: 'Entender uma vulnerabilidade', quando: 'Para estudar segurança pelo lado da defesa.',
        campos: [
          { k: 'vuln', rotulo: 'Vulnerabilidade', dica: 'Ex.: XSS armazenado' },
          { k: 'stack', rotulo: 'Sua stack', dica: 'Ex.: React com API em Node e Express' }
        ],
        texto: 'Estou estudando segurança para proteger meus projetos. Explique {vuln} no contexto de {stack}:\n1. Como a falha acontece, de forma conceitual.\n2. Como identificar se o meu código está vulnerável (o que procurar numa revisão).\n3. Como corrigir e prevenir, com um exemplo de código seguro.\n4. Onde treinar isso de forma legal (laboratórios autorizados).\nFoque em defesa.'
      },
      {
        id: 'pc', linha: 'ti', nome: 'Conferir peças de um PC', quando: 'Antes de comprar qualquer peça.',
        campos: [
          { k: 'uso', rotulo: 'Para que vai usar', dica: 'Ex.: programação, jogos leves e edição de vídeo' },
          { k: 'orcamento', rotulo: 'Orçamento total', dica: 'Ex.: R$ 5.000' },
          { k: 'pecas', rotulo: 'Lista de peças', area: true, dica: 'Uma peça por linha, com modelo' }
        ],
        texto: 'Quero montar um PC para {uso}, com orçamento de {orcamento}. Esta é a lista de peças:\n{pecas}\n\nVerifique:\n1. Compatibilidade: soquete, chipset, memória, potência da fonte, tamanho da placa de vídeo e do cooler no gabinete.\n2. Gargalos e desequilíbrios para o meu uso.\n3. Trocas que melhorariam o custo-benefício.\nNão invente preços: diga quais peças eu devo pesquisar o preço atual.'
      },
      {
        id: 'casamento', linha: 'cas', nome: 'Comparar orçamentos', quando: 'Quando chegarem 2 ou mais propostas de um fornecedor do casamento.',
        campos: [
          { k: 'tipo', rotulo: 'Tipo de fornecedor', dica: 'Ex.: buffet para 100 convidados' },
          { k: 'propostas', rotulo: 'Propostas', area: true, dica: 'Cole o texto de cada proposta (sem dados pessoais)' }
        ],
        texto: 'Estou comparando propostas de {tipo} para o meu casamento:\n{propostas}\n\nMonte uma tabela comparando preço total, preço por convidado quando fizer sentido, o que inclui, o que não inclui, condições de pagamento e multas. Depois liste as perguntas que eu devo fazer a cada fornecedor antes de fechar e os pontos do contrato que preciso conferir.'
      },
      {
        id: 'financas', linha: 'fin', nome: 'Plano para uma meta', quando: 'Para planejar casamento, reserva ou mudança de casa.',
        campos: [
          { k: 'meta', rotulo: 'Meta', dica: 'Ex.: juntar o dinheiro da festa de casamento' },
          { k: 'valor', rotulo: 'Valor e prazo', dica: 'Ex.: R$ 40.000 em 10 meses' },
          { k: 'situacao', rotulo: 'Sua situação', area: true, dica: 'Renda, gastos fixos, dívidas e quanto já tem guardado' }
        ],
        texto: 'Quero um plano para {meta}: {valor}.\n\nMinha situação:\n{situacao}\n\nMe ajude a: 1) ver se a meta é realista, 2) quanto guardar por mês, 3) onde cortar gastos sem sofrer, 4) onde deixar o dinheiro até lá com baixo risco, 5) um plano B se não der. Não recomende produtos de uma instituição específica e explique os termos financeiros que usar.'
      },
      {
        id: 'curriculo', linha: 'car', nome: 'Ajustar currículo à vaga', quando: 'Antes de cada candidatura importante.',
        campos: [
          { k: 'vaga', rotulo: 'Texto da vaga', area: true, dica: 'Cole a descrição da vaga' },
          { k: 'curriculo', rotulo: 'Seu currículo', area: true, dica: 'Cole o texto do currículo (sem endereço, CPF ou telefone)' }
        ],
        texto: 'Vaga:\n{vaga}\n\nMeu currículo:\n{curriculo}\n\n1. Quais requisitos eu já atendo e quais não.\n2. Sugestões de ajustes no texto para destacar o que tenho de relevante, usando as palavras da vaga.\n3. Como transformar minhas atividades em resultados com números.\nNão invente experiências que eu não tenho. Se faltar algo importante, diga o que estudar.'
      }
    ]
  };

})(window.RS.dados);
