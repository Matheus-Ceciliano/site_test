/* Rota Sênior — plano: perfil inicial, fases, rotina semanal, níveis de carreira e dicas. */
(function (D) {
  'use strict';

  /* Perfil inicial vazio: a tela de boas-vindas pede nome e data.
     A versão publicada no Claude é montada com o perfil já preenchido (ferramentas/montar.mjs). */
  D.perfilPadrao = D.perfilPadrao || { nome: '', casamento: '', cidade: '', contexto: '', pronto: false };

  /* Fases do plano. "semanas" é a duração; a última vai até o casamento quando há data. */
  D.fases = [
    {
      id: 'f0', nome: 'Partida', semanas: 2,
      lema: 'Arrumar a mala antes de viajar.',
      resumo: 'Duas semanas para montar o ambiente, medir de onde você parte e alinhar o casamento e o dinheiro a dois. Sem isso, o resto vira improviso.',
      ritmo: 'Leve: o objetivo é criar o hábito diário, não estudar muito. 30 a 60 minutos por dia bastam.',
      estacoes: ['prog-1', 'ing-1', 'ia-1', 'fin-1', 'car-1', 'cas-1'],
      entregas: [
        'Conta no GitHub com foto, bio e o primeiro repositório (mesmo que seja só um README)',
        'Nota do teste de inglês EF SET anotada (é o seu ponto de partida)',
        'Orçamento total do casamento e lista preliminar de convidados definidos a dois',
        'Todos os gastos do último mês anotados em uma planilha ou app',
        'Conversa com seu gestor no estágio: "o que eu preciso mostrar para ser efetivado?"'
      ]
    },
    {
      id: 'f1', nome: 'Fundamentos', semanas: 8,
      lema: 'Base forte, prédio alto.',
      resumo: 'Lógica, HTML, CSS, JavaScript e Git até ficarem naturais. Em paralelo: inglês todo dia, primeiras peças de hardware e as regras do jogo hacker. É a fase que mais gente pula e depois paga caro.',
      ritmo: 'Padrão: cerca de 11 horas por semana. Em semana de prova da faculdade, troque para o ritmo leve sem culpa.',
      estacoes: ['prog-2', 'prog-3', 'prog-4', 'ia-2', 'ing-2', 'ti-1', 'seg-1', 'fin-2', 'cas-2'],
      entregas: [
        'Página pessoal em HTML e CSS publicada no GitHub Pages',
        '3 mini projetos em JavaScript puro (lista de tarefas, calculadora, consumo de uma API pública)',
        'Commits em pelo menos 4 dias por semana durante a fase',
        'Reserva de emergência com o primeiro mês de custo guardado',
        'Local da festa e buffet com orçamento comparado (3 opções cada)'
      ]
    },
    {
      id: 'f2', nome: 'Construção', semanas: 10,
      lema: 'Quem constrói aprende o dobro.',
      resumo: 'Banco de dados, React e o primeiro projeto de portfólio de verdade. Linux, redes e segurança começam a fazer sentido juntos. Você monta (ou simula) um PC do zero.',
      ritmo: 'Padrão. Use os sábados para o projeto: é ali que o portfólio nasce.',
      estacoes: ['prog-5', 'prog-6', 'ia-3', 'seg-2', 'seg-3', 'ti-2', 'ti-3', 'ing-3', 'car-2', 'cas-3'],
      entregas: [
        'Projeto de portfólio 1 em React publicado, com README, prints e link funcionando',
        'Modelo de banco de dados de um sistema real desenhado e implementado em SQL',
        '20 desafios do OverTheWire Bandit ou trilha Pre Security do TryHackMe concluída',
        'Lista de peças de um PC montada e conferida no PCPartPicker, com justificativa de cada escolha',
        'Fornecedores principais do casamento contratados (foto, música e decoração)'
      ]
    },
    {
      id: 'f3', nome: 'Profissional', semanas: 10,
      lema: 'Código que outra pessoa consegue manter.',
      resumo: 'Back-end com Node.js, TypeScript, testes e deploy. Projeto full stack completo. Inglês para conversar, primeira certificação e candidaturas toda semana. Aqui você começa a parecer júnior.',
      ritmo: 'Padrão ou intenso nas férias de julho. Mantenha 3 candidaturas boas por semana.',
      estacoes: ['prog-7', 'prog-8', 'ia-4', 'seg-4', 'ti-4', 'ing-4', 'car-3', 'car-4', 'cas-4', 'fin-3'],
      entregas: [
        'Projeto full stack (front React + API Node + banco) com login, testes e deploy',
        'Certificação gratuita concluída (freeCodeCamp, Cisco ou Microsoft Learn)',
        'Currículo de 1 página revisado e LinkedIn com headline, sobre e projetos',
        '10 candidaturas registradas em Minhas vagas',
        'Convites enviados e alianças escolhidas'
      ]
    },
    {
      id: 'f4', nome: 'Contratado', semanas: 10,
      lema: 'Entrevista é treino, não sorte.',
      resumo: 'Entrevistas simuladas, desafios técnicos, inglês de entrevista e um projeto com IA. O cartório entra no radar. A meta da fase é sair com proposta de efetivação ou de júnior.',
      ritmo: 'Padrão. Se surgir processo seletivo, troque projeto do sábado por preparação para ele.',
      estacoes: ['ia-5', 'seg-5', 'ti-5', 'ing-5', 'car-5', 'cas-5'],
      entregas: [
        '5 entrevistas simuladas (2 delas em inglês) com anotações do que melhorar',
        'Projeto com IA (chat, resumo ou classificação usando uma API) publicado',
        'Proposta de efetivação ou de vaga júnior em negociação',
        'Habilitação de casamento protocolada no cartório dentro da janela de datas'
      ]
    },
    {
      id: 'f5', nome: 'Reta final', semanas: 6, ateCasamento: true,
      lema: 'Casar em paz, com a carreira andando.',
      resumo: 'Carga de estudo menor, foco no casamento e no começo do novo emprego. Mantém só o essencial: inglês diário e um passo técnico por semana.',
      ritmo: 'Leve. Proteja o sono e o relacionamento. A rota continua depois do sim.',
      estacoes: ['prog-9', 'seg-6', 'car-6', 'cas-6', 'fin-4'],
      entregas: [
        'Orçamento do casal depois do casamento combinado (contas, metas e reserva)',
        'Plano de 90 dias no emprego anotado: o que aprender e entregar',
        'Todos os fornecedores pagos e o roteiro do dia distribuído'
      ]
    }
  ];

  /* Rotina semanal. Dias: 0 = domingo ... 6 = sábado. "desloc" são minutos após a âncora. */
  D.rotina = {
    ancoras: {
      manha: { nome: 'Manhã (antes do estágio)', padrao: '06:30' },
      almoco: { nome: 'Almoço', padrao: '12:30' },
      noite: { nome: 'Noite (depois da faculdade ou do estágio)', padrao: '20:30' },
      sabado: { nome: 'Sábado', padrao: '09:00' },
      domingo: { nome: 'Domingo', padrao: '17:00' }
    },
    ritmos: {
      leve: { nome: 'Leve · semana de prova', resumo: 'Cerca de 6 horas na semana: inglês, um bloco curto à noite e o projeto de sábado reduzido.' },
      normal: { nome: 'Padrão', resumo: 'Cerca de 11 horas na semana, cabendo entre faculdade e estágio. É o ritmo do plano.' },
      intenso: { nome: 'Intenso · férias', resumo: 'Cerca de 18 horas na semana. Use nas férias da faculdade ou perto de um processo seletivo.' }
    },
    blocos: [
      { id: 'ing', dias: [1, 2, 3, 4, 5], ancora: 'manha', min: { leve: 15, normal: 20, intenso: 30 }, linha: 'ing', titulo: 'Inglês', como: 'Anki com as frases do app e 10 minutos de áudio em inglês no trajeto.' },
      { id: 'almoco', dias: [1, 2, 3, 4, 5], ancora: 'almoco', min: { leve: 0, normal: 15, intenso: 20 }, linha: 'ia', titulo: 'IA e revisão', como: 'Pergunta do dia e 5 perguntas do quiz. O que errar, peça para a IA explicar com um exemplo.' },
      {
        id: 'noite', dias: [1, 2, 3, 4], ancora: 'noite', min: { leve: 30, normal: 50, intenso: 80 }, linha: 'prog', titulo: 'Programação',
        como: 'Um passo da trilha e código no GitHub. Commit antes de dormir.',
        linhaPorDia: { 3: 'seg' }, tituloPorDia: { 3: 'Hacker ético' },
        comoPorDia: { 3: 'Laboratório guiado ou estudo de redes e Linux. Só em ambiente autorizado.' }
      },
      { id: 'sexta', dias: [5], ancora: 'noite', min: { leve: 0, normal: 30, intenso: 45 }, linha: 'car', titulo: 'Carreira', como: 'Atualize GitHub e LinkedIn, salve 3 vagas e mande 1 candidatura bem feita.' },
      { id: 'projeto', dias: [6], ancora: 'sabado', min: { leve: 90, normal: 150, intenso: 210 }, linha: 'prog', titulo: 'Projeto de portfólio', como: 'Construa o projeto da fase. Termine o dia com algo publicado.' },
      { id: 'pc', dias: [6], ancora: 'sabado', desloc: 210, min: { leve: 0, normal: 45, intenso: 60 }, linha: 'ti', titulo: 'Hardware e suporte', como: 'Um passo da trilha de PC: identificar, montar, formatar, documentar.' },
      { id: 'casal', dias: [0], ancora: 'domingo', min: { leve: 30, normal: 30, intenso: 30 }, linha: 'cas', titulo: 'Reunião a dois', como: 'Checklist do casamento, orçamento e quanto guardaram na semana.' },
      { id: 'dinheiro', dias: [0], ancora: 'domingo', desloc: 35, min: { leve: 15, normal: 20, intenso: 20 }, linha: 'fin', titulo: 'Finanças da semana', como: 'Lance os gastos, confira a meta e transfira o valor da reserva.' },
      { id: 'semana', dias: [0], ancora: 'domingo', desloc: 60, min: { leve: 20, normal: 30, intenso: 30 }, linha: 'car', titulo: 'Planejar a semana', como: 'Revise o que fez, marque os passos e escolha 3 metas para a semana.' },
      { id: 'conversa', dias: [0], ancora: 'domingo', desloc: 95, min: { leve: 0, normal: 0, intenso: 45 }, linha: 'ing', titulo: 'Conversação', como: 'Fale em voz alta: grave um áudio contando sua semana em inglês ou treine com a IA.' }
    ]
  };

  /* Caminho até sênior. */
  D.niveis = {
    aviso: 'Sênior não é tempo de casa, é autonomia e impacto. A média de mercado fica entre 5 e 8 anos de experiência, mas quem estuda com método, entrega com qualidade e aprende o negócio costuma encurtar esse caminho. Este plano cobre a parte que depende de você.',
    lista: [
      {
        nome: 'Estagiário', quando: 'agora',
        resumo: 'Aprende fazendo, com supervisão de perto.',
        provas: ['Entrega tarefas pequenas sem esquecer detalhes', 'Faz perguntas boas: tentou antes, explica o que testou', 'Usa Git sem medo e escreve commits claros'],
        como: ['Peça para pegar tickets um pouco acima do seu nível', 'Anote tudo que aprende do sistema da empresa', 'Lembre: pela Lei do Estágio, o contrato na mesma empresa dura no máximo 2 anos. Planeje a efetivação antes disso']
      },
      {
        nome: 'Júnior', quando: 'meta: até 2027',
        resumo: 'Resolve problemas definidos com alguma ajuda.',
        provas: ['Entrega funcionalidades completas, com testes', 'Lê código dos outros e encontra bugs sozinho', 'Estima prazos de tarefas pequenas e cumpre'],
        como: ['Revise seu próprio PR antes de pedir revisão', 'Domine profundamente uma stack em vez de tocar em dez', 'Peça feedback a cada 30 dias e mostre que aplicou']
      },
      {
        nome: 'Pleno', quando: '2 a 4 anos',
        resumo: 'Trabalha com autonomia em problemas pouco definidos.',
        provas: ['Quebra um problema grande em tarefas e conduz até o fim', 'Toma decisões técnicas e explica as trocas', 'Ajuda os juniores e melhora o processo do time'],
        como: ['Estude desenho de sistemas e banco de dados a fundo', 'Assuma uma parte do sistema como "dono"', 'Inglês para reunião: abre vagas remotas que pagam em dólar']
      },
      {
        nome: 'Sênior', quando: '5 anos ou mais',
        resumo: 'Multiplica o time e resolve o que ninguém sabe resolver.',
        provas: ['Desenha soluções que aguentam crescimento e falhas', 'Antecipa riscos técnicos e de negócio', 'Forma outras pessoas e influencia decisões fora do time'],
        como: ['Escreva documentos de decisão técnica (RFCs)', 'Mentore alguém toda semana', 'Entenda como a empresa ganha dinheiro e conecte o código a isso']
      }
    ]
  };

  /* Dicas curtas, mostradas uma por dia e no fim de cada trilha. */
  D.dicas = [
    { l: 'prog', t: 'Programar é ler e escrever código todo dia. Meia hora diária vence cinco horas no domingo.' },
    { l: 'prog', t: 'Travou mais de 30 minutos? Escreva a dúvida como se fosse perguntar a alguém. Metade das vezes a resposta aparece no meio do texto.' },
    { l: 'prog', t: 'Tutorial assistido não é projeto feito. Depois de cada aula, refaça sem olhar e mude alguma coisa.' },
    { l: 'prog', t: 'Antes de aprender um framework novo, garanta JavaScript puro: arrays, objetos, funções, promises e fetch.' },
    { l: 'prog', t: 'Leia a mensagem de erro inteira, de baixo para cima. Ela quase sempre diz a linha e o motivo.' },
    { l: 'ia', t: 'Peça dicas, não respostas: "não me dê o código, me dê uma pista para eu tentar de novo".' },
    { l: 'ia', t: 'IA erra com confiança. Toda resposta técnica precisa ser testada ou conferida na documentação oficial.' },
    { l: 'ia', t: 'Nunca cole na IA senhas, chaves de API, dados de clientes ou código da empresa sem a política interna permitir.' },
    { l: 'ia', t: 'Dê contexto: o que você já sabe, o que tentou, o erro exato e o que espera. Prompt bom é briefing bom.' },
    { l: 'seg', t: 'Hacker ético só ataca o que tem autorização por escrito. Fora disso é crime (Lei 12.737/2012).' },
    { l: 'seg', t: 'Linux e redes são 70% do caminho em segurança. Ferramenta sem fundamento vira só apertar botão.' },
    { l: 'seg', t: 'Escreva um relatório de cada laboratório que fizer. Relatório bom vale mais que a invasão no currículo.' },
    { l: 'ti', t: 'Antes de comprar peças, confira soquete da placa-mãe, geração da memória e potência da fonte.' },
    { l: 'ti', t: 'Toque em metal sem pintura do gabinete antes de mexer nas peças: eletricidade estática mata componente.' },
    { l: 'ti', t: 'Monte primeiro fora do gabinete (processador, memória e cooler na placa) e teste o boot. Achar defeito depois dá trabalho.' },
    { l: 'ing', t: 'Mude o idioma do celular e do VS Code para inglês. Exposição diária de graça.' },
    { l: 'ing', t: 'Leia a documentação oficial em inglês, com o tradutor só para palavras soltas. É o inglês que o trabalho exige.' },
    { l: 'ing', t: 'Falar errado é o único caminho para falar certo. Grave áudios curtos e escute depois.' },
    { l: 'cas', t: 'Feche o teto do orçamento antes de visitar qualquer fornecedor. Visita sem teto vira sonho caro.' },
    { l: 'cas', t: 'Contrato sempre por escrito, com data, horário, multa e o que acontece se chover ou atrasar.' },
    { l: 'cas', t: 'Reserve uma conversa por semana a dois só sobre o casamento. O resto da semana é sobre vocês.' },
    { l: 'fin', t: 'Pague-se primeiro: no dia que a bolsa cai, a parte da meta já sai para outra conta.' },
    { l: 'fin', t: 'Parcelamento sem juros ainda é dívida. Some todas as parcelas abertas antes de assumir uma nova.' },
    { l: 'fin', t: 'Reserva de emergência fica em lugar com liquidez diária e baixo risco. Não é dinheiro para render muito, é para existir.' },
    { l: 'car', t: 'Seu GitHub é o currículo que o recrutador técnico lê. Três projetos bem feitos valem mais que trinta pela metade.' },
    { l: 'car', t: 'No estágio, mostre resultado em números: "reduzi o tempo do relatório de 2 horas para 10 minutos".' },
    { l: 'car', t: 'Candidatura boa é personalizada. Cinco bem feitas por semana vencem cinquenta no automático.' }
  ];

})(window.RS.dados);
