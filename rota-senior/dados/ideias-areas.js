/* Rota Sênior — 100 ideias de como resolver problemas em 20 áreas de trabalho, 5 por área.
   Cada ideia: [nome, nível 1-3, problema, solução, como funcionaria]. */
(function (D) {
  'use strict';

  const lista = [];
  function area(nome, ideias) {
    ideias.forEach(function (x) {
      lista.push({ area: nome, nome: x[0], nivel: x[1], problema: x[2], solucao: x[3], como: x[4] });
    });
  }

  area('Direito', [
    ['Linha do tempo do processo para o cliente', 1, 'O cliente não entende o andamento do processo e liga toda semana para o escritório.', 'Uma página do cliente com a linha do tempo do processo explicada em linguagem simples.', 'O advogado marca as movimentações importantes e escreve uma frase explicando cada uma. O cliente recebe aviso a cada novidade e consulta quando quiser, com login.'],
    ['Calculadora de prazos com feriados locais', 2, 'Perder um prazo processual é um dos piores erros de um escritório.', 'Cálculo de prazo em dias úteis com feriados nacionais, estaduais e do tribunal.', 'Uma base de feriados e suspensões por tribunal alimenta o cálculo. O prazo vai para a agenda com alertas em 5, 2 e 1 dia antes, com confirmação de quem cuidou.'],
    ['Triagem de casos trabalhistas', 2, 'O escritório gasta horas em consultas de casos que não têm fundamento.', 'Questionário guiado que organiza fatos, documentos e datas antes da consulta.', 'A pessoa responde perguntas sobre vínculo, jornada e verbas e anexa documentos. O advogado recebe um resumo organizado e decide rápido se aceita o caso.'],
    ['Modelos de petição com cláusulas validadas', 2, 'Cada advogado usa uma versão diferente do mesmo modelo e erros se repetem.', 'Biblioteca única de modelos com cláusulas revisadas e versão controlada.', 'Os modelos têm campos variáveis e trechos opcionais. Uma mudança revisada atualiza todos os documentos futuros e o histórico mostra quem alterou o quê.'],
    ['Pesquisa em decisões com citação obrigatória', 3, 'Pesquisar jurisprudência toma tempo e IAs genéricas inventam decisões.', 'Busca por significado que só responde com trechos reais e o link da decisão.', 'Decisões públicas são indexadas com embeddings. A resposta mostra os trechos encontrados e o link oficial; se não achar, diz que não encontrou em vez de inventar.']
  ]);

  area('Saúde', [
    ['Lista de espera inteligente para consultas', 2, 'Faltas deixam horários vazios enquanto pacientes esperam semanas.', 'Lista de espera que oferece automaticamente o horário liberado.', 'Quando alguém cancela, o sistema envia o horário para os próximos da lista por ordem; o primeiro que aceitar fica com a vaga e a agenda se atualiza sozinha.'],
    ['Resumo da pré-consulta', 2, 'O médico gasta metade da consulta coletando informações básicas.', 'Formulário enviado antes da consulta que gera um resumo estruturado.', 'O paciente responde no celular sobre sintomas, remédios e alergias. O profissional abre um resumo de uma tela e os dados vão para o prontuário com um clique.'],
    ['Adesão ao tratamento acompanhada', 2, 'Pacientes param o tratamento no meio e o médico só descobre no retorno.', 'Lembretes e registro de doses com alerta à equipe quando a adesão cai.', 'O paciente marca as doses; se perder várias seguidas, a equipe da clínica recebe aviso para entrar em contato antes que o problema piore.'],
    ['Estoque da farmácia de UBS', 2, 'Remédios vencem na prateleira enquanto outros faltam.', 'Controle de lote e validade com alerta e sugestão de remanejamento.', 'Cada entrada registra lote e validade. O sistema avisa o que vence em 60 dias e sugere transferir para unidades com mais demanda daquele remédio.'],
    ['Painel de leitos', 3, 'Hospitais perdem tempo descobrindo quais leitos estão livres.', 'Painel em tempo real do status de cada leito: ocupado, em limpeza, livre.', 'A enfermagem e a limpeza atualizam o status pelo celular. O painel mostra o tempo de cada etapa e avisa a regulação quando um leito fica pronto.']
  ]);

  area('Educação', [
    ['Mapa de dificuldades da turma', 2, 'O professor só descobre o que a turma não entendeu na prova.', 'Perguntas rápidas ao fim da aula que mostram os temas com mais erros.', 'Três perguntas por aula, respondidas pelo celular. O painel mostra por tema quantos acertaram, para o professor retomar o assunto na aula seguinte.'],
    ['Alerta de evasão', 3, 'Alunos abandonam o curso sem que ninguém perceba os sinais.', 'Indicadores de risco a partir de faltas, notas e entregas.', 'O sistema cruza frequência, notas e atrasos e aponta alunos em risco para a coordenação conversar a tempo. Nada é decidido automaticamente sobre o aluno.'],
    ['Feedback de redação mais rápido', 3, 'Professores levam semanas para devolver redações corrigidas.', 'Pré-correção por competência com IA e revisão final do professor.', 'A IA sugere nota e comentários por competência; o professor ajusta e aprova. O aluno recebe a devolutiva em dias e pode reescrever.'],
    ['Portfólio do estudante', 1, 'Projetos feitos na faculdade se perdem e não viram prova de competência.', 'Portfólio público com os projetos da graduação, validados pelos professores.', 'O aluno publica o projeto com descrição e link; o professor da disciplina valida. Recrutadores veem projetos reais em vez de só notas.'],
    ['Comunicação com a família por áudio', 1, 'Muitas famílias não leem comunicados longos da escola.', 'Comunicados curtos com versão em áudio e confirmação de recebimento.', 'A escola escreve o aviso e o sistema gera o áudio. A família ouve no celular e confirma com um toque, e a escola vê quem ainda não recebeu.']
  ]);

  area('Restaurantes', [
    ['Prato em 3D na mesa', 3, 'O cliente não sabe o tamanho e a aparência do prato e acaba pedindo errado.', 'Cardápio em realidade aumentada: o prato aparece em 3D sobre a mesa pela câmera do celular.', 'Cada prato é fotografado por vários ângulos e vira um modelo 3D. O QR Code da mesa abre o cardápio e o botão "ver na mesa" mostra o prato em tamanho real, sem instalar app.'],
    ['Tela da cozinha por setor', 2, 'Comandas de papel se perdem e pratos saem fora de ordem.', 'Tela na cozinha que separa pedidos por setor e mostra o tempo de cada um.', 'O pedido feito no salão aparece na tela da chapa, da fritadeira e das bebidas. Cada setor marca pronto e o garçom é avisado quando o pedido inteiro está completo.'],
    ['Custo do prato em tempo real', 2, 'O preço do insumo sobe e o restaurante continua vendendo no prejuízo.', 'Ficha técnica conectada às notas de compra.', 'Ao lançar a nota do fornecedor, o custo dos pratos é recalculado e o dono recebe alerta quando a margem cai abaixo do limite definido.'],
    ['Reserva com confirmação', 1, 'Mesas reservadas ficam vazias por falta de aviso.', 'Reserva online com confirmação no dia e liberação automática.', 'O cliente reserva pelo link, confirma na manhã do dia e, se não confirmar até certo horário, a mesa volta a ficar disponível.'],
    ['Pesquisa no fim da conta', 1, 'O restaurante só descobre a reclamação pela avaliação pública.', 'Avaliação rápida no momento do pagamento com alerta para nota baixa.', 'Ao pagar, o cliente dá uma nota. Nota baixa avisa o gerente, que conversa com o cliente ainda no salão.']
  ]);

  area('Varejo', [
    ['Ruptura de prateleira detectada', 3, 'Produto acaba na prateleira mas existe no estoque, e a venda é perdida.', 'Alerta de produto que parou de vender de repente.', 'O sistema compara as vendas de cada hora com o padrão. Se um produto que sempre vende para de sair, avisa a equipe para conferir a prateleira.'],
    ['Reserve e retire na loja', 2, 'Clientes desistem de ir à loja sem saber se o produto existe.', 'Estoque da loja online com reserva para retirada.', 'O cliente vê o estoque da loja mais próxima, reserva e recebe aviso quando está separado. A loja tem prazo para separar e a reserva expira sozinha.'],
    ['Etiqueta de preço sem divergência', 2, 'O preço da prateleira é diferente do caixa e gera reclamação.', 'Lista diária de etiquetas a trocar gerada pelas mudanças de preço.', 'Cada alteração de preço gera a etiqueta para imprimir e uma tarefa para a equipe trocar, com conferência pela câmera do celular.'],
    ['Vendedor com catálogo no bolso', 1, 'O vendedor não sabe tamanhos, cores e estoque e perde a venda.', 'App do vendedor com estoque de todas as lojas e encomenda na hora.', 'O vendedor consulta o produto pelo código de barras, vê o estoque em outras lojas e faz a encomenda para entrega na casa do cliente.'],
    ['Clientes que sumiram', 2, 'A loja não percebe quando bons clientes param de comprar.', 'Lista de clientes frequentes que deixaram de comprar.', 'O sistema identifica quem comprava todo mês e parou. A loja manda uma mensagem personalizada ou um convite, respeitando o consentimento.']
  ]);

  area('Construção civil', [
    ['Diário de obra pelo celular', 1, 'O diário de obra em papel fica incompleto e sem fotos.', 'Registro diário com fotos, clima, equipes e ocorrências.', 'O mestre de obras registra o dia em poucos minutos. O engenheiro e o cliente acompanham de longe e o histórico serve de prova em caso de disputa.'],
    ['Pedido de material sem atraso', 2, 'A obra para porque o material não foi pedido a tempo.', 'Cronograma ligado à lista de materiais com alerta de compra.', 'Cada etapa do cronograma tem os materiais necessários e o prazo de entrega do fornecedor. O sistema avisa quando é hora de comprar.'],
    ['Medição de empreiteiros', 2, 'Discussões sobre quanto o empreiteiro executou e quanto deve receber.', 'Medição por serviço com fotos e aprovação.', 'O empreiteiro informa o que fez, o engenheiro confere com foto e aprova. O pagamento sai pelo valor aprovado e tudo fica registrado.'],
    ['Orçamento de reforma para o cliente final', 2, 'O cliente não entende orçamentos de reforma cheios de termos técnicos.', 'Orçamento visual por cômodo com opções de acabamento.', 'Cada cômodo mostra os serviços e três opções de acabamento com preço. O cliente escolhe e o total se atualiza na hora.'],
    ['Segurança no canteiro', 2, 'Treinamentos e EPIs vencidos colocam trabalhadores em risco.', 'Controle de treinamentos, EPIs e liberação de acesso ao canteiro.', 'Na entrada, o crachá é lido e o sistema confere se os treinamentos e EPIs estão em dia. Pendência gera aviso ao técnico de segurança.']
  ]);

  area('Agronegócio', [
    ['Janela de pulverização', 2, 'Aplicar defensivo com vento ou chuva desperdiça produto e polui.', 'Alerta das melhores janelas de aplicação por talhão.', 'O sistema cruza a previsão de vento, chuva e umidade com a localização de cada talhão e indica os horários adequados.'],
    ['Pesagem do rebanho sem planilha', 2, 'Anotações de pesagem em papel se perdem e não geram decisões.', 'Pesagem ligada à balança com histórico e ganho de peso por animal.', 'A balança envia o peso, o animal é identificado pelo brinco e o sistema mostra o ganho diário e quem está abaixo da média.'],
    ['Caderno de campo para certificação', 1, 'Pequenos produtores perdem certificações por falta de registros.', 'Registro simples e offline de todas as atividades por talhão.', 'O produtor registra no celular mesmo sem sinal. Os dados viram o relatório exigido pela certificadora.'],
    ['Venda direta do produtor', 2, 'O pequeno produtor vende barato ao intermediário.', 'Vitrine para vender direto a restaurantes e consumidores da região.', 'O produtor publica o que tem na semana, os compradores reservam e a entrega é organizada por rota.'],
    ['Irrigação por umidade do solo', 3, 'Irrigar por horário fixo desperdiça água e energia.', 'Sensores de umidade que acionam a irrigação só quando precisa.', 'Sensores medem a umidade do solo e enviam os dados. Abaixo do limite, a bomba liga; com previsão de chuva, a irrigação é adiada.']
  ]);

  area('Logística', [
    ['Prova de entrega com foto', 1, 'Clientes dizem que não receberam e a empresa não tem como provar.', 'Comprovante com foto, assinatura e localização na hora da entrega.', 'O entregador fotografa a encomenda no local, coleta assinatura e o comprovante vai para o cliente e para o sistema.'],
    ['Janela de entrega combinada', 2, 'Entregas falham porque não tem ninguém em casa.', 'O cliente escolhe a janela de horário e recebe aviso quando o entregador está perto.', 'A rota respeita as janelas escolhidas e o cliente recebe a previsão atualizada, podendo pedir para deixar com o vizinho ou a portaria.'],
    ['Devolução organizada', 2, 'Devoluções chegam ao armazém sem identificação e se perdem.', 'Etiqueta de devolução gerada no pedido de troca.', 'Ao pedir a devolução, o cliente recebe uma etiqueta com código. No armazém, a leitura do código mostra o pedido e o destino do produto.'],
    ['Ocupação dos caminhões', 3, 'Caminhões saem com espaço sobrando e a empresa paga frete a mais.', 'Planejamento de carga por volume e peso.', 'O sistema calcula o volume e o peso de cada pedido e sugere a combinação de cargas que enche os veículos com menos viagens.'],
    ['Motorista bem informado', 1, 'O motorista liga para a central para saber endereço, contato e regras de cada entrega.', 'App com todas as informações da parada e chat com a central.', 'Cada parada mostra endereço, contato, horário de recebimento e observações. Problemas são registrados com foto pelo próprio app.']
  ]);

  area('Recursos humanos', [
    ['Intranet que as pessoas leem', 2, 'Comunicados se perdem em e-mails e grupos de mensagem.', 'Intranet com mural, documentos, diretório e confirmação de leitura.', 'Comunicados importantes pedem confirmação de leitura; quem não leu recebe lembrete. Políticas, manuais e o diretório de pessoas ficam num só lugar, com busca.'],
    ['Primeiro dia sem improviso', 1, 'O novo funcionário chega e não tem computador, acesso nem tarefa.', 'Checklist de onboarding com responsáveis e prazos.', 'Ao cadastrar a contratação, TI, RH e gestor recebem suas tarefas com prazo. No primeiro dia, tudo já está pronto.'],
    ['Banco de horas transparente', 2, 'Funcionários não sabem o saldo de horas e há conflito no fechamento.', 'Painel do banco de horas para o funcionário e o gestor.', 'O saldo é atualizado a cada marcação de ponto, com histórico e alerta quando ultrapassa o limite combinado.'],
    ['Feedback contínuo', 2, 'A avaliação anual surpreende as pessoas com problemas antigos.', 'Registros curtos de feedback ao longo do ano.', 'Gestor e funcionário registram feedbacks e conquistas. Na avaliação, o histórico mostra a evolução real, não só a memória do último mês.'],
    ['Vagas internas', 1, 'Funcionários saem porque não sabem das oportunidades dentro da empresa.', 'Portal de vagas internas com candidatura simples.', 'Vagas abertas aparecem primeiro para quem já está na empresa, com requisitos claros e candidatura em um clique.']
  ]);

  area('Contabilidade', [
    ['Documentos do cliente sem correria', 1, 'Clientes mandam documentos atrasados e incompletos todo mês.', 'Portal com a lista de documentos pendentes e lembretes automáticos.', 'Cada cliente vê o que falta enviar no mês. Lembretes saem automaticamente e o escritório acompanha quem está atrasado.'],
    ['Leitura automática de notas', 2, 'Digitar notas fiscais à mão consome horas do escritório.', 'Importação dos XMLs e classificação sugerida.', 'O sistema importa os arquivos das notas, sugere a conta contábil com base em lançamentos anteriores e o contador só confirma.'],
    ['Agenda fiscal do cliente', 1, 'Pequenos empresários perdem prazos de impostos e pagam multa.', 'Calendário de obrigações com guias e lembretes.', 'O escritório publica as guias e o cliente recebe lembrete com o valor e o vencimento, confirmando o pagamento no próprio portal.'],
    ['Simulador de regime tributário', 3, 'O empresário não sabe se compensa mudar de regime tributário.', 'Comparação entre regimes com base no faturamento e na folha.', 'O contador informa os números e o sistema simula os impostos em cada regime, gerando um relatório para a conversa com o cliente.'],
    ['Painel do dono do negócio', 2, 'O empresário recebe relatórios contábeis que não entende.', 'Painel simples com faturamento, lucro e impostos do mês.', 'Os dados da contabilidade viram poucos números claros, com comparação com o mês anterior e explicação de cada variação.']
  ]);

  area('Imobiliário e condomínios', [
    ['Portaria sem interfone', 2, 'Visitantes esperam na portaria enquanto o porteiro tenta falar com o morador.', 'Convite com QR Code criado pelo morador.', 'O morador gera o convite com data e hora. O visitante mostra o código, a portaria libera e o morador recebe aviso da chegada.'],
    ['Assembleia que acontece', 3, 'Assembleias presenciais não atingem quórum.', 'Assembleia online com votação por unidade e ata automática.', 'Convocação com pauta, presença registrada, votação com peso por fração ideal e ata gerada ao final.'],
    ['Vistoria sem briga', 2, 'Discussões sobre danos na saída do inquilino.', 'Vistoria com fotos de entrada e saída comparadas lado a lado.', 'O roteiro por cômodo garante as mesmas fotos nas duas vistorias. O laudo mostra a comparação e as duas partes assinam.'],
    ['Encomendas sem confusão', 1, 'Encomendas se acumulam na portaria e somem.', 'Registro com foto e retirada com código.', 'O porteiro fotografa a etiqueta, o morador é avisado e retira informando um código, que dá baixa no registro.'],
    ['Anúncio com custo total', 1, 'O inquilino descobre o custo real do imóvel só depois da visita.', 'Anúncio que soma aluguel, condomínio, IPTU e estimativa de contas.', 'O anunciante informa os valores e o anúncio mostra o custo mensal total, filtrando por quanto a pessoa pode pagar.']
  ]);

  area('Eventos e casamentos', [
    ['Confirmação de presença sem ligações', 1, 'Os noivos passam semanas ligando para saber quem vai.', 'Site do casamento com confirmação por família e lembretes.', 'Cada família recebe um link com seus nomes. A confirmação atualiza a lista do buffet e quem não respondeu recebe lembrete automático.'],
    ['Orçamento do casamento sob controle', 1, 'O orçamento estoura porque ninguém soma as parcelas de todos os fornecedores.', 'Planilha viva com teto, contratos e pagamentos.', 'Cada fornecedor é lançado com valor e parcelas. O painel mostra quanto já foi comprometido e quanto falta pagar por mês até a data.'],
    ['Fotos dos convidados num só lugar', 2, 'As melhores fotos ficam espalhadas nos celulares dos convidados.', 'Álbum colaborativo acessado pelo QR Code da mesa.', 'Os convidados enviam fotos pelo navegador, sem instalar nada. O casal modera e baixa tudo em alta resolução.'],
    ['Roteiro do dia para fornecedores', 1, 'Fornecedores chegam em horários errados e ninguém sabe quem resolve cada coisa.', 'Cronograma do evento compartilhado com todos.', 'Horários, responsáveis e contatos num link. Qualquer mudança avisa todos os fornecedores ao mesmo tempo.'],
    ['Credenciamento rápido', 2, 'Filas enormes na entrada de eventos corporativos.', 'Check-in por QR Code com impressão de crachá.', 'O participante recebe o QR Code por e-mail. Na entrada, a leitura confirma a presença e o crachá sai impresso em segundos.']
  ]);

  area('Academias e esportes', [
    ['Treino no celular do aluno', 1, 'Fichas de treino em papel se perdem e o professor não acompanha a evolução.', 'Ficha digital com vídeos dos exercícios e registro de cargas.', 'O professor monta o treino; o aluno vê o vídeo de cada exercício e registra a carga, e o professor acompanha a evolução.'],
    ['Alerta de aluno sumido', 2, 'Alunos param de ir e cancelam sem a academia perceber.', 'Aviso quando um aluno frequente para de aparecer.', 'O sistema acompanha as entradas e avisa a recepção quando alguém some por duas semanas, para uma mensagem de incentivo.'],
    ['Aulas com vagas limitadas', 1, 'Aulas coletivas lotam enquanto outras ficam vazias.', 'Reserva de vaga em aulas com lista de espera.', 'O aluno reserva pelo celular; quem desiste libera a vaga para a lista de espera, e faltas repetidas bloqueiam reservas por um tempo.'],
    ['Escolinha esportiva organizada', 2, 'Escolinhas perdem controle de mensalidades, presença e uniformes.', 'Gestão de turmas, presença e cobrança.', 'Cada turma tem lista de presença pelo celular do professor, cobrança recorrente e comunicação com os pais.'],
    ['Campeonato amador sem planilha', 2, 'Organizar tabela, súmulas e classificação dá muito trabalho.', 'Tabela automática com súmula digital e classificação ao vivo.', 'O organizador cadastra os times, o sistema gera os jogos, o mesário registra a súmula pelo celular e a tabela se atualiza para todos.']
  ]);

  area('Beleza e estética', [
    ['Agenda sem buracos', 1, 'Faltas deixam a agenda do salão com horários vazios.', 'Confirmação automática e lista de espera.', 'Lembrete no dia anterior pede confirmação; quem cancela libera o horário para a lista de espera, que é avisada na hora.'],
    ['Ficha de anamnese digital', 2, 'Procedimentos estéticos exigem histórico de saúde e termo de consentimento.', 'Ficha e termo preenchidos e assinados no celular.', 'A cliente responde antes do atendimento, assina o termo e a profissional vê alertas como alergias antes de começar.'],
    ['Pacotes e sessões', 1, 'Clientes perdem a conta das sessões de pacotes pagos.', 'Controle de pacotes com saldo de sessões.', 'Cada atendimento dá baixa no pacote; a cliente vê quantas sessões restam e recebe aviso perto do fim.'],
    ['Comissão das profissionais', 2, 'O cálculo de comissões no fim do mês gera conflito.', 'Comissão calculada a cada atendimento.', 'Cada serviço tem a regra de comissão. A profissional acompanha seu saldo durante o mês e o fechamento sai sem planilha.'],
    ['Antes e depois com consentimento', 1, 'Fotos de antes e depois ficam espalhadas no celular pessoal.', 'Galeria por cliente com autorização de uso registrada.', 'As fotos ficam no prontuário da cliente e só vão para divulgação se ela autorizar, com o registro da autorização.']
  ]);

  area('Pets e veterinária', [
    ['Lembrete de vacina e vermífugo', 1, 'Tutores esquecem as doses e os animais ficam desprotegidos.', 'Carteira digital com lembretes automáticos.', 'A clínica registra a vacina e o tutor recebe lembrete da próxima dose, com botão para agendar.'],
    ['Pet pronto para buscar', 1, 'Tutores ligam várias vezes para saber se o banho terminou.', 'Aviso com foto quando o pet está pronto.', 'A tosadora marca concluído e o tutor recebe a foto e o aviso para buscar.'],
    ['Internação acompanhada', 2, 'Tutores ficam aflitos sem notícias do pet internado.', 'Boletim diário com fotos e evolução.', 'A equipe registra medicações e observações, e o tutor recebe um boletim simples com foto em horários definidos.'],
    ['Alerta de pet perdido na vizinhança', 1, 'Avisos de pet perdido não chegam a quem está perto.', 'Alerta para vizinhos num raio do local.', 'O tutor publica foto e local; quem estiver perto recebe o alerta e pode marcar no mapa onde viu o animal.'],
    ['Adoção responsável', 2, 'Animais adotados são devolvidos por falta de preparo.', 'Formulário, conversa e acompanhamento pós-adoção.', 'A ONG avalia o perfil, combina a visita e acompanha os primeiros meses com check-ins.']
  ]);

  area('Indústria', [
    ['Parada de máquina registrada', 2, 'Ninguém sabe ao certo por que e por quanto tempo as máquinas param.', 'Apontamento de paradas com motivo pelo tablet do posto.', 'O operador escolhe o motivo da parada em um toque. O painel mostra as principais causas e o tempo perdido por turno.'],
    ['Manutenção que se antecipa', 3, 'Quebras inesperadas param a linha inteira.', 'Sensores de vibração e temperatura com alerta de anomalia.', 'Os sensores enviam leituras contínuas; o sistema aprende o padrão de cada máquina e avisa a manutenção quando algo foge do normal.'],
    ['Instrução de trabalho atualizada', 1, 'Operadores seguem instruções impressas desatualizadas.', 'Instruções digitais com vídeo pelo QR Code da máquina.', 'O QR Code abre sempre a versão vigente. Quando a instrução muda, os operadores do posto recebem aviso para ler.'],
    ['Qualidade com foto do defeito', 1, 'Defeitos são descritos de formas diferentes e difíceis de analisar.', 'Inspeção com catálogo de defeitos e foto obrigatória.', 'O inspetor escolhe o defeito num catálogo visual e tira foto. Os dados mostram onde e quando os defeitos se concentram.'],
    ['Sugestões do chão de fábrica', 1, 'Boas ideias dos operadores se perdem.', 'Canal de sugestões com votação e retorno.', 'Qualquer pessoa sugere uma melhoria; o comitê avalia, responde e mostra o ganho obtido quando a ideia é implantada.']
  ]);

  area('Igrejas e ONGs', [
    ['Voluntários sem grupo lotado', 1, 'Escalas de voluntários em grupos de mensagem viram confusão.', 'Escala com confirmação, troca e lembrete.', 'Cada voluntário informa disponibilidade e confirma sua escala. Trocas são pedidas pelo app e o líder vê quem está confirmado.'],
    ['Doações com prestação de contas', 2, 'Doadores deixam de contribuir por não saber como o dinheiro é usado.', 'Página pública de transparência com projetos e comprovantes.', 'Cada gasto é lançado com comprovante e ligado a um projeto. O doador vê o impacto da sua doação.'],
    ['Cesta básica sem duplicidade', 2, 'Algumas famílias recebem várias vezes e outras nenhuma.', 'Cadastro de famílias com registro de atendimentos.', 'Cada atendimento fica registrado e o sistema avisa quando a família já recebeu no período, respeitando a privacidade dos dados.'],
    ['Inscrição online para retiros', 1, 'Inscrições por papel e transferência bancária geram erros.', 'Inscrição online com pagamento e lista.', 'O participante se inscreve e paga pelo link, recebe confirmação e a organização tem a lista atualizada em tempo real.'],
    ['Relatório para editais', 2, 'ONGs perdem editais por não comprovar resultados.', 'Indicadores coletados durante o projeto e relatório pronto.', 'A equipe registra atendimentos e resultados em campo e o relatório para o financiador é gerado com gráficos e evidências.']
  ]);

  area('Setor público', [
    ['Buraco na rua resolvido', 2, 'A população não sabe para quem reclamar e não acompanha a solução.', 'Registro de problemas urbanos com foto, mapa e protocolo.', 'O cidadão fotografa e marca no mapa. A prefeitura encaminha para a secretaria certa e o cidadão acompanha até a conclusão.'],
    ['Fila da UBS pelo celular', 2, 'Pacientes chegam de madrugada para garantir senha.', 'Agendamento e senha digital para atendimentos.', 'O cidadão agenda pelo celular ou pelo telefone; quem não tem celular é atendido na recepção com a mesma fila.'],
    ['Merenda sem desperdício', 2, 'Escolas jogam fora comida enquanto faltam itens em outras.', 'Controle de estoque da merenda por escola com remanejamento.', 'Cada escola lança consumo e estoque. A secretaria vê excessos e faltas e remaneja antes de vencer.'],
    ['Transparência fácil', 1, 'Os portais de transparência são difíceis de entender.', 'Painel simples dos gastos públicos com explicações.', 'Os dados abertos são organizados por área (saúde, educação) e explicados em linguagem simples, com comparação entre anos.'],
    ['Vagas de creche transparentes', 2, 'Famílias não sabem a posição na fila da creche.', 'Fila única pública com critérios claros.', 'A família acompanha sua posição por protocolo, sem dados pessoais expostos, e vê os critérios de prioridade aplicados.']
  ]);

  area('Turismo e hotelaria', [
    ['Check-in sem fila', 2, 'Hóspedes esperam na recepção para preencher fichas.', 'Check-in online antes da chegada.', 'O hóspede envia documentos e dados antes de chegar. Na recepção, só retira a chave ou recebe o código de acesso.'],
    ['Pedidos do quarto pelo QR Code', 1, 'Pedidos por telefone se perdem e o hóspede não sabe o que o hotel oferece.', 'Cardápio de serviços pelo QR Code do quarto.', 'Toalhas, room service e passeios pedidos pelo celular, com acompanhamento do status.'],
    ['Governança organizada', 2, 'Quartos liberados com atraso porque a limpeza não sabe a prioridade.', 'Painel de status dos quartos para a governança.', 'A recepção marca saídas e chegadas; a camareira vê a ordem de prioridade e marca cada quarto como pronto.'],
    ['Roteiro local de quem conhece', 1, 'Turistas recebem sempre as mesmas dicas genéricas.', 'Guia digital do hotel com roteiros feitos pela equipe local.', 'A equipe monta roteiros por perfil (família, aventura, gastronomia) e o hóspede salva os favoritos no celular.'],
    ['Avaliação antes de sair', 1, 'Problemas só aparecem nas avaliações públicas, quando já é tarde.', 'Pesquisa curta durante a estadia.', 'No segundo dia, o hóspede recebe uma pergunta rápida. Uma nota baixa avisa a gerência para resolver ainda durante a estadia.']
  ]);

  area('Empresas em geral', [
    ['Intranet com busca de verdade', 2, 'Ninguém acha a política, o formulário ou o contato certo.', 'Intranet com busca única em documentos, pessoas e sistemas.', 'Uma barra de busca encontra documentos, pessoas do diretório e atalhos para sistemas. Os mais buscados aparecem na página inicial.'],
    ['Chamados de TI organizados', 1, 'Pedidos de TI chegam por mensagem, corredor e e-mail e se perdem.', 'Portal de chamados com categorias e prazos.', 'O funcionário abre o chamado escolhendo a categoria; a TI prioriza, atende e mede o tempo de resolução. Os problemas mais frequentes viram artigos de autoatendimento.'],
    ['Notebook com dono e histórico', 1, 'A empresa não sabe quem está com qual notebook.', 'Cadastro de equipamentos com responsável e histórico.', 'Cada equipamento tem etiqueta com QR Code. A entrega e a devolução registram o responsável e o estado do equipamento.'],
    ['Reserva de salas e mesas', 1, 'Salas de reunião vivem disputadas e vazias ao mesmo tempo.', 'Reserva com check-in e liberação automática.', 'Quem reserva confirma presença pelo QR Code da sala. Sem check-in em 10 minutos, a sala é liberada para outros.'],
    ['Base de conhecimento viva', 2, 'Quando alguém sai, o conhecimento vai junto.', 'Base de procedimentos escrita pelos próprios times.', 'Cada processo vira um artigo com responsável e data de revisão. Artigos antigos pedem revisão e os mais acessados são destacados.']
  ]);

  D.ideiasAreas = lista;

})(window.RS.dados);
