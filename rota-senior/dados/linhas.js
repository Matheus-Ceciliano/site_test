/* Rota Sênior — as oito trilhas (linhas), com estações e passos.
   Passo: texto simples ou { t: texto, r: id do material na biblioteca, min: minutos estimados }.
   Na trilha do casamento, "antes" é a janela em meses antes da data: [de, até]. */
(function (D) {
  'use strict';

  D.linhas = [
    {
      id: 'prog', sigla: 'PRG', nome: 'Programação',
      lema: 'De lógica a pleno, com projetos no caminho.',
      porque: 'É o que te contrata. A trilha segue a ordem que o mercado cobra de um desenvolvedor web: fundamentos, front-end, banco, back-end e qualidade.',
      estacoes: [
        {
          nome: 'Lógica e ambiente', meta: 'Pensar como programador e montar sua máquina.',
          passos: [
            { t: 'Assistir aos dois primeiros módulos do Curso de Algoritmos do Curso em Vídeo', r: 'cev-algoritmo', min: 300 },
            { t: 'Instalar VS Code, Git e Node.js LTS e rodar "node -v" no terminal', r: 'node-learn', min: 60 },
            { t: 'Ver o episódio do Akita sobre conhecimentos básicos para iniciantes', r: 'akita-40', min: 60 },
            { t: 'Resolver 10 problemas iniciantes no beecrowd', r: 'beecrowd', min: 300 },
            { t: 'Pedir o GitHub Student Developer Pack com o e-mail da faculdade', r: 'github-student', min: 20 }
          ]
        },
        {
          nome: 'HTML e CSS', meta: 'Páginas bem estruturadas e responsivas.',
          passos: [
            { t: 'Fazer o módulo 1 do curso de HTML5 e CSS3 do Curso em Vídeo', r: 'cev-html', min: 600 },
            { t: 'Ler o guia de aprendizado de desenvolvimento web do MDN (HTML e CSS)', r: 'mdn-web', min: 240 },
            { t: 'Aprender Flexbox e Grid construindo um layout de três colunas que vira uma no celular', min: 180 },
            { t: 'Publicar sua página pessoal no GitHub Pages', min: 120 },
            { t: 'Rodar o Lighthouse do Chrome na sua página e corrigir acessibilidade até passar de 90', min: 60 }
          ]
        },
        {
          nome: 'JavaScript de verdade', meta: 'A linguagem que você vai usar todo dia.',
          passos: [
            { t: 'Fazer o curso de JavaScript do Curso em Vídeo inteiro', r: 'cev-js', min: 900 },
            { t: 'Estudar no javascript.info: tipos, funções, objetos, arrays e métodos de array', r: 'js-info', min: 600 },
            { t: 'Entender o DOM: selecionar, criar elementos e tratar eventos sem copiar código', min: 240 },
            { t: 'Dominar promises, async/await e fetch consumindo uma API pública', min: 240 },
            { t: 'Construir uma lista de tarefas que salva no localStorage', min: 300 },
            { t: 'Fazer 15 exercícios da trilha de JavaScript do Exercism', r: 'exercism', min: 600 }
          ]
        },
        {
          nome: 'Git, GitHub e terminal', meta: 'Trabalhar como um time trabalha.',
          passos: [
            { t: 'Estudar o material do curso de Git e GitHub do Guanabara', r: 'cev-git', min: 300 },
            { t: 'Completar o nível principal do Learn Git Branching', r: 'git-branching', min: 180 },
            { t: 'Ler os capítulos 1 a 3 do Pro Git em português', r: 'pro-git', min: 240 },
            { t: 'Fazer um curso interativo do GitHub Skills (pull requests)', r: 'github-skills', min: 60 },
            { t: 'Usar branch, pull request e revisão em todo projeto daqui em diante', min: 30 },
            { t: 'Assistir às aulas de shell e editores do Missing Semester', r: 'missing-semester', min: 180 }
          ]
        },
        {
          nome: 'Banco de dados e SQL', meta: 'Guardar e consultar dados direito.',
          passos: [
            { t: 'Fazer o Curso de Banco de Dados MySQL do Curso em Vídeo', r: 'cev-mysql', min: 900 },
            { t: 'Completar todas as lições do SQLBolt', r: 'sqlbolt', min: 240 },
            { t: 'Entender chave primária, estrangeira, JOIN, GROUP BY e índices', min: 180 },
            { t: 'Modelar o banco de um sistema real (biblioteca, clínica ou loja) com diagrama', min: 240 },
            { t: 'Aprender a evitar SQL Injection com consultas parametrizadas', r: 'owasp-top10', min: 60 }
          ]
        },
        {
          nome: 'React', meta: 'Interfaces modernas, do jeito que o mercado usa.',
          passos: [
            { t: 'Fazer a seção Aprender da documentação oficial do React', r: 'react-docs', min: 600 },
            { t: 'Criar um projeto com Vite e entender componentes, props e estado', min: 180 },
            { t: 'Usar useEffect para buscar dados de uma API com carregamento e erro', min: 180 },
            { t: 'Adicionar rotas e formulários com validação', min: 240 },
            { t: 'Construir o projeto de portfólio 1 (escolha uma ideia na aba Ideias)', min: 1200 },
            { t: 'Publicar na Vercel ou Netlify com README, prints e link', min: 120 }
          ]
        },
        {
          nome: 'Node.js e APIs', meta: 'O lado do servidor.',
          passos: [
            { t: 'Ler o guia Learn do site oficial do Node.js até "Asynchronous Work"', r: 'node-learn', min: 300 },
            { t: 'Criar uma API REST com Express: CRUD completo e status HTTP corretos', min: 480 },
            { t: 'Conectar a API a um banco (PostgreSQL ou MySQL) com um ORM ou query builder', min: 360 },
            { t: 'Implementar login com senha criptografada (bcrypt) e JWT', min: 360 },
            { t: 'Fazer a parte 3 e 4 do Full Stack Open (back-end com Node)', r: 'fullstackopen', min: 900 },
            { t: 'Colocar a API no ar e documentar os endpoints no README', min: 180 }
          ]
        },
        {
          nome: 'TypeScript, testes e qualidade', meta: 'Código que outra pessoa consegue manter.',
          passos: [
            { t: 'Ler o TypeScript Handbook: tipos básicos, interfaces, generics e narrowing', r: 'ts-handbook', min: 480 },
            { t: 'Converter o projeto de portfólio 1 para TypeScript', min: 480 },
            { t: 'Escrever testes com Vitest ou Jest para as regras de negócio', min: 360 },
            { t: 'Configurar ESLint, Prettier e um GitHub Actions que roda os testes no PR', min: 240 },
            { t: 'Aprender o básico de Docker: imagem, container e docker compose', r: 'docker-start', min: 300 },
            { t: 'Terminar o projeto full stack da fase Profissional com deploy', min: 1800 }
          ]
        },
        {
          nome: 'Rumo a pleno', meta: 'Pensar em sistemas, não só em telas.',
          passos: [
            { t: 'Seguir o roadmap de back-end e marcar o que já sabe', r: 'roadmap-back', min: 120 },
            { t: 'Estudar os primeiros tópicos do System Design Primer (cache, filas, escala)', r: 'system-design', min: 600 },
            { t: 'Resolver os 30 primeiros problemas do roadmap do NeetCode', r: 'neetcode', min: 1200 },
            { t: 'Ler código de um projeto open source que você usa e abrir uma issue ou PR pequeno', min: 600 },
            { t: 'Escrever um documento de decisão técnica de uma escolha do seu projeto', min: 120 }
          ]
        }
      ]
    },

    {
      id: 'ia', sigla: 'IA', nome: 'IA na prática',
      lema: 'Usar IA como mentor, não como muleta.',
      porque: 'Quem sabe usar IA produz mais e aprende mais rápido. Quem usa errado para de aprender. Esta trilha ensina o jeito certo e termina com você construindo com IA.',
      estacoes: [
        {
          nome: 'Como um LLM funciona', meta: 'Saber o que a ferramenta é para usar bem.',
          passos: [
            { t: 'Assistir à palestra introdutória sobre LLMs do Andrej Karpathy (legenda em português)', r: 'karpathy-llm', min: 60 },
            { t: 'Entender por que a IA "alucina" e quando isso acontece mais', min: 30 },
            { t: 'Fazer o curso AI Fluency da Claude Academy', r: 'claude-academy', min: 180 },
            { t: 'Ler as regras de ouro no Mentor IA deste app', min: 10 }
          ]
        },
        {
          nome: 'Prompt bem feito', meta: 'Pedir com contexto, exemplo e formato.',
          passos: [
            { t: 'Fazer os capítulos 1 a 5 do tutorial interativo de prompts da Anthropic', r: 'anthropic-tutorial', min: 240 },
            { t: 'Praticar os 4 elementos: contexto, tarefa, exemplos e formato de saída', min: 60 },
            { t: 'Montar 3 prompts seus com os modelos do Mentor IA e comparar as respostas', min: 60 },
            { t: 'Fazer o curso curto de prompts para desenvolvedores da DeepLearning.AI', r: 'dlai-prompt', min: 90 }
          ]
        },
        {
          nome: 'IA para estudar sem se enganar', meta: 'Aprender mais rápido, de verdade.',
          passos: [
            { t: 'Usar o modelo "Aprender um conceito" no Mentor IA para 5 assuntos da faculdade', min: 120 },
            { t: 'Pedir para a IA criar perguntas sobre o que você estudou e responder sem consultar', min: 60 },
            { t: 'Resolver um exercício sozinho e só depois pedir revisão do seu código', min: 60 },
            { t: 'Fazer o curso Elements of AI (introdução, com certificado)', r: 'elements-ai', min: 600 }
          ]
        },
        {
          nome: 'IA no código', meta: 'Assistentes de código com responsabilidade.',
          passos: [
            { t: 'Fazer o curso Claude Code in Action', r: 'claude-code-action', min: 180 },
            { t: 'Ativar um assistente de código gratuito para estudantes (via GitHub Student Pack)', r: 'github-student', min: 30 },
            { t: 'Regra: ler e entender toda linha gerada antes de aceitar', min: 10 },
            { t: 'Usar IA para escrever testes do seu projeto e revisar se testam o que importa', min: 120 },
            { t: 'Confirmar com o gestor qual é a política de IA no seu estágio', min: 15 }
          ]
        },
        {
          nome: 'Construir com IA', meta: 'Produto com IA no portfólio.',
          passos: [
            { t: 'Fazer a introdução à IA generativa do Google Cloud Skills Boost', r: 'google-genai', min: 60 },
            { t: 'Chamar uma API de modelo de linguagem a partir do seu back-end Node (chave sempre no servidor)', min: 240 },
            { t: 'Construir um projeto com IA: resumo de PDF, chat sobre documentos ou classificador de chamados', min: 1200 },
            { t: 'Fazer os cursos introdutórios do Kaggle Learn (Python e Intro to Machine Learning)', r: 'kaggle-learn', min: 600 },
            { t: 'Ver a série sobre redes neurais do 3Blue1Brown para entender o que tem por baixo', r: '3b1b-nn', min: 120 }
          ]
        }
      ]
    },

    {
      id: 'seg', sigla: 'SEC', nome: 'Hacker ético',
      lema: 'Pensar como atacante para defender.',
      porque: 'Segurança é uma das áreas com mais vaga e menos gente preparada. Mesmo como desenvolvedor, saber como sistemas são atacados te faz escrever código melhor.',
      estacoes: [
        {
          nome: 'Ética e lei', meta: 'Antes de qualquer ferramenta.',
          passos: [
            { t: 'Ler a Lei 12.737/2012 (invasão de dispositivo informático) e entender o que é crime', r: 'lei-12737', min: 30 },
            { t: 'Entender a diferença entre pentest autorizado, bug bounty e invasão', min: 30 },
            { t: 'Ver o roadmap de cibersegurança e escolher entre defesa (blue team) e ataque (red team)', r: 'roadmap-cyber', min: 60 },
            { t: 'Inscrever-se no programa gratuito Hackers do Bem (nivelamento)', r: 'hackers-bem', min: 30 }
          ]
        },
        {
          nome: 'Linux e terminal', meta: 'O sistema onde segurança acontece.',
          passos: [
            { t: 'Fazer os módulos iniciais do Linux Journey', r: 'linux-journey', min: 300 },
            { t: 'Instalar uma máquina virtual Linux (VirtualBox + Ubuntu ou Kali)', min: 120 },
            { t: 'Completar os níveis 0 a 15 do OverTheWire Bandit', r: 'overthewire', min: 600 },
            { t: 'Escrever um script em Bash que automatize uma tarefa sua', min: 120 }
          ]
        },
        {
          nome: 'Redes para segurança', meta: 'Ninguém protege o que não entende.',
          passos: [
            { t: 'Assistir às primeiras aulas do Curso de Redes do Curso em Vídeo', r: 'cev-redes', min: 600 },
            { t: 'Entender modelo OSI, TCP/IP, portas, DNS, HTTP e HTTPS', min: 240 },
            { t: 'Capturar seu próprio tráfego no Wireshark e identificar uma requisição HTTP', min: 120 },
            { t: 'Fazer o curso Networking Basics ou Introduction to Cybersecurity da Cisco', r: 'cisco-netacad', min: 1200 }
          ]
        },
        {
          nome: 'Segurança web', meta: 'Onde o desenvolvedor mais erra.',
          passos: [
            { t: 'Ler o OWASP Top 10 atual', r: 'owasp-top10', min: 120 },
            { t: 'Fazer os laboratórios de SQL Injection e XSS da PortSwigger Web Security Academy', r: 'portswigger', min: 600 },
            { t: 'Revisar seu projeto full stack contra o Top 10 e corrigir o que achar', min: 240 },
            { t: 'Configurar cabeçalhos de segurança e HTTPS no seu deploy', min: 60 }
          ]
        },
        {
          nome: 'Laboratórios e CTF', meta: 'Prática em ambiente autorizado.',
          passos: [
            { t: 'Concluir a trilha Pre Security do TryHackMe', r: 'tryhackme', min: 1200 },
            { t: 'Fazer os módulos gratuitos de fundamentos da Hack The Box Academy', r: 'htb-academy', min: 600 },
            { t: 'Participar de um CTF para iniciantes (picoCTF tem desafios o ano todo)', r: 'picoctf', min: 480 },
            { t: 'Publicar no GitHub o relatório (writeup) de 3 desafios resolvidos', min: 240 }
          ]
        },
        {
          nome: 'Defesa e carreira', meta: 'Transformar em profissão.',
          passos: [
            { t: 'Fazer o curso Ethical Hacker gratuito da Cisco Networking Academy', r: 'cisco-netacad', min: 2100 },
            { t: 'Ver a introdução à engenharia reversa da Mente Binária', r: 'mente-binaria', min: 300 },
            { t: 'Fazer o curso introdutório gratuito da Solyd', r: 'solyd', min: 300 },
            { t: 'Decidir: seguir em AppSec (dev + segurança) ou SOC/pentest, e anotar o próximo curso', min: 30 }
          ]
        }
      ]
    },

    {
      id: 'ti', sigla: 'PC', nome: 'Montagem de PC e suporte',
      lema: 'Do parafuso ao sistema funcionando.',
      porque: 'Técnico de TI que entende hardware resolve problema que ninguém resolve, e ainda economiza montando o próprio PC. Também ajuda no seu estágio de TI hoje.',
      estacoes: [
        {
          nome: 'Peças e o que cada uma faz', meta: 'Reconhecer tudo dentro do gabinete.',
          passos: [
            { t: 'Fazer o curso de fundamentos de TI (hardware e software) da Fundação Bradesco', r: 'ev-bradesco', min: 600 },
            { t: 'Explicar com suas palavras: processador, placa-mãe, memória, SSD, placa de vídeo, fonte e gabinete', min: 60 },
            { t: 'Abrir um PC velho (desligado da tomada) e identificar cada peça', min: 90 },
            { t: 'Assistir às aulas gratuitas de hardware do Professor Messer (CompTIA A+)', r: 'messer', min: 600 }
          ]
        },
        {
          nome: 'Escolher e comparar peças', meta: 'Compatibilidade e custo-benefício.',
          passos: [
            { t: 'Entender soquete (AM5, LGA 1700/1851), chipset e geração de memória (DDR4 x DDR5)', min: 90 },
            { t: 'Calcular a fonte: consumo da placa de vídeo + processador + 30% de folga, com selo 80 Plus', min: 60 },
            { t: 'Montar uma lista no PCPartPicker e conferir os avisos de compatibilidade', r: 'pcpartpicker', min: 60 },
            { t: 'Comparar a mesma lista no monte seu PC da KaBuM e no guia da Terabyte', r: 'kabum-monte', min: 60 }
          ]
        },
        {
          nome: 'Montagem passo a passo', meta: 'Montar sem medo e sem quebrar nada.',
          passos: [
            { t: 'Assistir a um passo a passo completo de montagem em vídeo', r: 'video-montagem', min: 60 },
            { t: 'Ler o manual da placa-mãe: conectores do painel frontal e slots de memória certos', min: 45 },
            { t: 'Montar processador, cooler e memória na placa fora do gabinete e testar o boot', min: 90 },
            { t: 'Montar no gabinete, organizar cabos e verificar temperaturas na BIOS', min: 180 },
            { t: 'Documentar a montagem com fotos (vira post no LinkedIn)', min: 30 }
          ]
        },
        {
          nome: 'Sistema, drivers e manutenção', meta: 'Deixar a máquina pronta para uso.',
          passos: [
            { t: 'Criar um pendrive de instalação do Windows e do Linux', min: 60 },
            { t: 'Instalar o sistema, drivers do fabricante e atualizar a BIOS com segurança', min: 120 },
            { t: 'Fazer o caminho de PowerShell do Microsoft Learn', r: 'powershell', min: 300 },
            { t: 'Montar uma rotina de backup 3-2-1 (3 cópias, 2 mídias, 1 fora de casa)', min: 60 }
          ]
        },
        {
          nome: 'Redes e suporte no dia a dia', meta: 'O que o técnico de TI resolve.',
          passos: [
            { t: 'Configurar um roteador doméstico: senha forte, WPA3 ou WPA2, firmware atualizado', min: 60 },
            { t: 'Diagnosticar internet lenta com ping, tracert e teste de DNS', min: 60 },
            { t: 'Fazer o Azure Fundamentals (parte 1) no Microsoft Learn', r: 'az900', min: 240 },
            { t: 'Escrever um passo a passo de suporte que você usa no estágio e compartilhar com o time', min: 60 }
          ]
        }
      ]
    },

    {
      id: 'ing', sigla: 'ENG', nome: 'Inglês',
      lema: 'Do A2 à entrevista em inglês.',
      porque: 'Documentação, erros, cursos e as vagas que pagam melhor estão em inglês. Com B1/B2 você dobra o número de vagas possíveis, incluindo as remotas para fora.',
      estacoes: [
        {
          nome: 'Diagnóstico e hábito', meta: 'Saber o nível e estudar todo dia.',
          passos: [
            { t: 'Fazer o teste gratuito EF SET e anotar a nota', r: 'efset', min: 50 },
            { t: 'Ler o guia gratuito do Mairo Vergara sobre como aprender inglês', r: 'mairo-guia', min: 90 },
            { t: 'Instalar o Anki e criar um baralho com as frases deste app', r: 'anki', min: 30 },
            { t: 'Trocar o idioma do celular e do VS Code para inglês', min: 10 }
          ]
        },
        {
          nome: 'Base A2: entender', meta: 'Vocabulário e gramática de trabalho.',
          passos: [
            { t: 'Fazer o currículo A2 English for Developers do freeCodeCamp', r: 'fcc-a2', min: 1800 },
            { t: 'Ouvir 10 minutos de inglês por dia (podcast, série ou BBC Learning English)', r: 'bbc-english', min: 600 },
            { t: 'Revisar 20 cartões do Anki por dia durante a fase', min: 300 },
            { t: 'Escrever 5 frases por dia sobre o que você fez (diário em inglês)', min: 300 }
          ]
        },
        {
          nome: 'Inglês técnico', meta: 'Ler documentação sem tradutor.',
          passos: [
            { t: 'Ler a documentação do React ou do Node em inglês, tradutor só para palavras soltas', min: 600 },
            { t: 'Escrever o README dos seus projetos em inglês', min: 120 },
            { t: 'Escrever mensagens de commit e PR em inglês', min: 30 },
            { t: 'Usar o YouGlish para ouvir como se pronunciam termos técnicos', r: 'youglish', min: 60 }
          ]
        },
        {
          nome: 'Falar (B1)', meta: 'Sair do "entendo mas não falo".',
          passos: [
            { t: 'Fazer o currículo B1 English for Developers do freeCodeCamp', r: 'fcc-b1', min: 1800 },
            { t: 'Gravar 1 áudio de 2 minutos por semana falando da semana', min: 120 },
            { t: 'Treinar conversação com IA por voz 3 vezes por semana', min: 300 },
            { t: 'Corrigir textos seus no Write & Improve da Cambridge', r: 'write-improve', min: 120 }
          ]
        },
        {
          nome: 'Entrevista em inglês', meta: 'Responder sobre você e seus projetos.',
          passos: [
            { t: 'Escrever e decorar o "tell me about yourself" em 1 minuto', min: 60 },
            { t: 'Treinar as perguntas em inglês da aba Entrevista em voz alta', min: 120 },
            { t: 'Explicar em inglês, em 2 minutos, o seu melhor projeto', min: 60 },
            { t: 'Refazer o EF SET e comparar com a nota da Partida', r: 'efset', min: 50 }
          ]
        }
      ]
    },

    {
      id: 'cas', sigla: 'CAS', nome: 'Casamento',
      lema: 'Organizado, dentro do orçamento e sem estresse.',
      porque: 'Casamento é um projeto com prazo fixo, orçamento e muitos fornecedores. Tratado como projeto, ele cabe junto com a carreira.',
      estacoes: [
        {
          nome: 'Decisões de base', antes: [12, 10], meta: 'O que define todo o resto.',
          passos: [
            'Definir a dois o teto do orçamento e quanto cada um consegue guardar por mês',
            'Fazer a lista preliminar de convidados (A: obrigatórios, B: se der)',
            'Decidir o formato: civil e festa, religioso com efeito civil ou mini wedding',
            'Abrir uma conta ou caixinha só para o casamento',
            'Conversar sobre onde vão morar e os custos da casa nova'
          ]
        },
        {
          nome: 'Grandes reservas', antes: [10, 8], meta: 'O que esgota primeiro.',
          passos: [
            'Visitar ao menos 3 locais e pedir orçamento por escrito',
            'Fechar local e data (cerimônia e festa)',
            'Contratar buffet depois de degustação',
            'Reservar igreja ou celebrante, se houver cerimônia religiosa',
            'Decidir se vale contratar assessoria só para o dia'
          ]
        },
        {
          nome: 'Fornecedores e visual', antes: [8, 5], meta: 'A cara da festa.',
          passos: [
            'Contratar fotografia e vídeo (veja um casamento inteiro entregue por eles)',
            'Contratar música: DJ ou banda',
            'Fechar decoração e flores',
            'Escolher trajes e marcar provas',
            'Convidar padrinhos e criar o site ou lista de presentes'
          ]
        },
        {
          nome: 'Convites e casa', antes: [5, 3], meta: 'Gente avisada e casa encaminhada.',
          passos: [
            'Enviar save the date e depois os convites',
            'Comprar as alianças',
            'Fechar bolo e doces',
            'Planejar a lua de mel dentro do orçamento',
            'Resolver a moradia: contrato de aluguel ou financiamento'
          ]
        },
        {
          nome: 'Cartório', antes: [3, 1], meta: 'A parte legal sem susto.',
          passos: [
            'Escolher o regime de bens e, se não for comunhão parcial, fazer o pacto antenupcial em cartório de notas',
            'Pedir certidões de nascimento atualizadas',
            'Separar RG, CPF e comprovante de residência dos dois',
            'Escolher 2 testemunhas maiores de 18 anos',
            'Dar entrada na habilitação dentro da janela de datas (aba Cartório)',
            'Agendar a cerimônia civil ou entregar o certificado ao celebrante religioso'
          ]
        },
        {
          nome: 'Último mês', antes: [1, 0], meta: 'Confirmar, pagar e descansar.',
          passos: [
            'Confirmar presença dos convidados e passar o número final ao buffet',
            'Fazer os pagamentos finais e guardar os comprovantes',
            'Montar o roteiro do dia com horários e contatos de cada fornecedor',
            'Preparar um kit de emergência (remédios, costura, carregador)',
            'Dormir bem na semana do casamento'
          ]
        },
        {
          nome: 'Depois do sim', antes: [0, -2], meta: 'Vida nova organizada.',
          passos: [
            'Atualizar documentos se alguém mudou de sobrenome',
            'Incluir dependente no plano de saúde, se fizer sentido',
            'Combinar o orçamento do casal: contas fixas, metas e reserva',
            'Agradecer convidados e fornecedores'
          ]
        }
      ]
    },

    {
      id: 'fin', sigla: 'FIN', nome: 'Finanças',
      lema: 'Dinheiro organizado antes de investir.',
      porque: 'Casar, mudar de casa e crescer na carreira ficam muito mais leves com orçamento, reserva e metas. Não é sobre ganhar mais primeiro: é sobre saber para onde vai.',
      estacoes: [
        {
          nome: 'Organizar', meta: 'Saber para onde o dinheiro vai.',
          passos: [
            { t: 'Ler o Caderno de Educação Financeira do Banco Central', r: 'bcb-caderno', min: 180 },
            { t: 'Anotar todos os gastos de um mês, até o cafezinho', min: 60 },
            { t: 'Separar gastos em essenciais, estilo de vida e futuro (calculadora em Finanças)', min: 30 },
            { t: 'Listar dívidas e parcelas abertas com juros de cada uma', min: 30 }
          ]
        },
        {
          nome: 'Reserva de emergência', meta: 'Seis meses de tranquilidade.',
          passos: [
            { t: 'Fazer o curso Gestão de Finanças Pessoais do Banco Central', r: 'gov-financas', min: 1200 },
            { t: 'Calcular sua meta de reserva no app (6 meses de custo de vida)', min: 15 },
            { t: 'Abrir conta no Tesouro Direto ou CDB com liquidez diária', r: 'tesouro', min: 60 },
            { t: 'Programar transferência automática no dia que a bolsa cai', min: 15 }
          ]
        },
        {
          nome: 'Investir o básico', meta: 'Fazer o dinheiro trabalhar sem cair em golpe.',
          passos: [
            { t: 'Fazer um curso gratuito da B3 Educação sobre renda fixa', r: 'b3-edu', min: 300 },
            { t: 'Entender Selic, CDI, IPCA, liquidez e o Fundo Garantidor de Créditos', min: 60 },
            { t: 'Simular a meta do casamento na Calculadora do Cidadão do Banco Central', r: 'bcb-calc', min: 30 },
            { t: 'Aprender a reconhecer golpe: promessa de retorno alto e garantido é sinal de fraude', min: 20 }
          ]
        },
        {
          nome: 'Vida a dois', meta: 'Combinar o dinheiro do casal.',
          passos: [
            'Decidir o modelo: tudo junto, proporcional à renda ou contas separadas com um fundo comum',
            'Montar o orçamento da casa nova (aluguel, contas, mercado, transporte)',
            'Definir metas do casal para o primeiro ano',
            'Marcar uma conversa mensal sobre dinheiro, sem culpa e sem surpresa'
          ]
        }
      ]
    },

    {
      id: 'car', sigla: 'CAR', nome: 'Carreira',
      lema: 'Do estágio ao júnior, do júnior ao sênior.',
      porque: 'Saber programar não basta: é preciso ser encontrado, mostrar o que sabe e passar na entrevista. Esta trilha cuida da vitrine e do processo.',
      estacoes: [
        {
          nome: 'Vitrine', meta: 'GitHub e LinkedIn que trabalham por você.',
          passos: [
            'Foto profissional simples e headline clara no LinkedIn: "Estudante de SI | Estagiário de TI | JavaScript, React, Node"',
            'README de perfil no GitHub com quem você é, stack e projetos fixados',
            'Seção "Sobre" do LinkedIn com o que você faz no estágio em números',
            'Seguir 20 desenvolvedores e empresas que você admira'
          ]
        },
        {
          nome: 'Portfólio que contrata', meta: 'Três projetos bem feitos.',
          passos: [
            'Escolher 3 ideias da aba Ideias que resolvem problemas reais',
            'Cada projeto com README: problema, solução, prints, stack, como rodar e link',
            'Pelo menos um projeto com back-end, banco e login',
            'Pedir para alguém da área revisar um projeto e aplicar o retorno'
          ]
        },
        {
          nome: 'Efetivação no estágio', meta: 'O caminho mais curto para a contratação.',
          passos: [
            'Perguntar ao gestor o que é esperado de um júnior no time',
            'Entregar um projeto que gera resultado mensurável para a área',
            'Pedir feedback a cada 30 dias e registrar o que aplicou',
            'Documentar o que você entregou para a conversa de efetivação',
            { t: 'Conferir seus direitos na Lei do Estágio (jornada, recesso e prazo máximo)', r: 'lei-estagio', min: 30 }
          ]
        },
        {
          nome: 'Currículo e candidatura', meta: 'Ser chamado para entrevista.',
          passos: [
            'Currículo de 1 página: projetos e resultados antes de cursos',
            'Uma versão em inglês do currículo',
            'Aplicar para 3 vagas boas por semana e registrar em Minhas vagas',
            { t: 'Inscrever-se no próximo bootcamp gratuito (DIO, Santander ou Oracle ONE)', r: 'dio', min: 30 },
            'Avisar 10 pessoas da sua rede que você está buscando vaga júnior'
          ]
        },
        {
          nome: 'Entrevistas', meta: 'Treino até virar conversa.',
          passos: [
            'Preparar 5 histórias no formato STAR (situação, tarefa, ação, resultado)',
            'Responder em voz alta todas as perguntas da aba Entrevista',
            'Simular 3 entrevistas técnicas com o Mentor IA',
            'Resolver um desafio técnico com prazo de 1 semana como treino',
            { t: 'Pesquisar a faixa salarial antes de falar em valores', r: 'tabnews-salario', min: 30 }
          ]
        },
        {
          nome: 'Crescer depois de contratado', meta: 'O caminho até sênior começa no dia 1.',
          passos: [
            'Escrever o plano dos primeiros 90 dias no emprego',
            'Combinar com o gestor reuniões individuais quinzenais',
            'Manter um "diário de conquistas" para as avaliações',
            'Ensinar algo ao time a cada trimestre (palestra interna ou documentação)'
          ]
        }
      ]
    }
  ];

})(window.RS.dados);
