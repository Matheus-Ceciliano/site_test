# Rota Sênior

App pessoal de estudo e planejamento: cronograma até o casamento, oito trilhas de estudo, biblioteca de cursos gratuitos, perguntas, vagas, casamento, finanças e 300 ideias de produto. Funciona no celular e no computador, em tema claro e escuro.

Não precisa de instalação nem de build: é HTML, CSS e JavaScript puro.

## Como abrir

- **Mais simples:** abra `rota-senior/index.html` no navegador. O progresso fica salvo no próprio navegador.
- **Com vídeos embutidos:** sirva a pasta por HTTP, por exemplo `npx serve rota-senior` ou `python3 -m http.server -d rota-senior`, e abra o endereço mostrado. Abrindo o arquivo direto, os vídeos abrem no YouTube em vez de tocar na página.
- **Versão no Claude:** `node rota-senior/ferramentas/montar.mjs saida.html [perfil.json]` gera um arquivo único para publicar como Artifact. Publicado lá, o progresso sincroniza entre celular e computador na área privada da sua conta, o Mentor IA responde na própria página e as frases em inglês podem ser ouvidas.

## O que tem

| Seção | Conteúdo |
| --- | --- |
| Hoje | Painel de partidas do dia (horários da rotina), fase atual, pergunta e frase do dia, sequência de dias |
| Cronograma | 6 fases com entregas, semana modelo em 3 ritmos, botões para o Google Agenda e arquivo .ics, caminho até sênior |
| Trilhas | Programação, IA na prática, Hacker ético, PC e suporte, Inglês, Casamento, Finanças e Carreira: 47 estações e 215 passos |
| Biblioteca | 91 materiais gratuitos (videoaulas, cursos com certificado, PDFs, ferramentas) com filtros |
| Perguntas | 99 perguntas com explicação, 26 perguntas de entrevista com roteiro de resposta e 60 frases de inglês em cartões |
| Mentor IA | Regras para usar IA do jeito certo e 13 modelos de prompt |
| Vagas | Plano de efetivação, programas de estágio com prazo, buscas prontas, controle das suas candidaturas e salários de referência |
| Ideias | 200 ideias de SaaS (20 categorias) e 100 soluções por área de trabalho (20 áreas) |
| Casamento | Contagem, checklist por janela de meses, orçamento que soma sozinho e datas do cartório |
| Finanças | Regra 50-30-20, reserva de emergência e aporte mensal para uma meta com data |

## Estrutura

```
rota-senior/
  index.html            página e ordem dos scripts
  css/estilo.css        visual (tokens de cor para claro e escuro)
  js/nucleo.js          estado salvo, datas, fases, sincronização opcional
  js/interface.js       ícones, diálogos, copiar, baixar, voz, texto formatado
  js/app.js             menu, rotas (#pagina) e eventos
  js/paginas-*.js       páginas: dia a dia, estudo, carreira e vida
  dados/*.js            todo o conteúdo editável
  ferramentas/montar.mjs  gera o arquivo único para o Claude
```

## Como editar o conteúdo

Todo o conteúdo está em `dados/`, em listas fáceis de mudar:

- `plano.js`: fases, entregas, rotina semanal, níveis e dicas
- `linhas.js`: trilhas, estações e passos (um passo pode apontar para um material da biblioteca pelo `r`)
- `biblioteca.js`: materiais; para vídeo use `yt` (id do vídeo), `pl` (id da playlist) ou `busca`
- `perguntas.js`: quiz, entrevista e frases
- `carreira.js`: vagas e modelos do Mentor IA
- `vida.js`: orçamento do casamento, cartório e finanças
- `ideias-saas.js` e `ideias-areas.js`: as 300 ideias

O perfil (nome, data do casamento, contexto) não fica no repositório: o app pergunta na primeira vez que abre.

Links, prazos de vagas, Selic e valores foram conferidos em 17/11/2026. Prazos e páginas mudam: confira sempre no site oficial antes de se inscrever.

## Próxima versão

`docs/prompt-plataforma-v2.md` é o prompt (em inglês, para o Claude Code) que descreve a versão profissional para dois usuários: trilhas com questionário, radar de vagas diário, laboratório de negócios com ClickUp, analisador de currículo, LinkedIn e GitHub, e agentes de teste automatizados.
