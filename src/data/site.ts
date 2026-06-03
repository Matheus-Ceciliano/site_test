import admImage from '../assets/adm.jpeg';
import bibliotecaImage from '../assets/biblioteca.jpg';
import contabeisImage from '../assets/contabeis.jpg';
import direitoImage from '../assets/direito.webp';
import laboratorioImage from '../assets/laboratorio.jpg';
import logoDark from '../assets/logo-esup-white.png';
import logoLight from '../assets/logo-esup.png';
import pedagogiaImage from '../assets/pedagogia-semipresencial.jpg';
import processosImage from '../assets/process-gerenciais.jpg';
import salaHeroImage from '../assets/sala-hero-hq.jpg';
import salaImage from '../assets/sala.jpg';
import salaAulaImage from '../assets/saladeaula.jpg';
import salaAula2Image from '../assets/saladeaula2.jpg';
import sistemasImage from '../assets/sis-info.jpg';

export const assets = {
  logoDark,
  logoLight,
  hero: salaHeroImage,
};

export const navItems = [
  { label: 'Cursos', href: '#cursos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Ingresso', href: '#ingresso' },
  { label: 'Depoimentos', href: '#depoimentos' },
];

export const metrics = [
  { value: 'Nota 4', label: 'MEC' },
  { value: '20+', label: 'anos de tradição' },
  { value: '6', label: 'programas em destaque' },
];

export const courses = [
  {
    title: 'Direito',
    modality: 'Presencial',
    duration: '10 semestres',
    description:
      'Formação jurídica com prática supervisionada, leitura crítica e atuação em problemas reais desde os primeiros períodos.',
    image: direitoImage,
    highlight: 'Núcleo de prática',
    href: '#ingresso',
  },
  {
    title: 'Administração',
    modality: 'Presencial',
    duration: '8 semestres',
    description:
      'Gestão, estratégia, finanças e liderança aplicadas a desafios de empresas em crescimento.',
    image: admImage,
    highlight: 'Projetos de mercado',
    href: '#ingresso',
  },
  {
    title: 'Ciências Contábeis',
    modality: 'Presencial',
    duration: '8 semestres',
    description:
      'Domínio técnico em contabilidade, controladoria, tributos e análise financeira com foco em empregabilidade.',
    image: contabeisImage,
    highlight: 'Alta demanda',
    href: '#ingresso',
  },
  {
    title: 'Pedagogia Semipresencial',
    modality: 'Semipresencial',
    duration: '8 semestres',
    description:
      'Base pedagógica sólida com flexibilidade de estudos e vivências orientadas para sala de aula contemporânea.',
    image: pedagogiaImage,
    highlight: 'Rotina flexível',
    href: '#ingresso',
  },
  {
    title: 'Sistemas de Informação',
    modality: 'Presencial',
    duration: '8 semestres',
    description:
      'Tecnologia, produto digital, dados e desenvolvimento de software conectados a projetos práticos.',
    image: sistemasImage,
    highlight: 'Laboratórios ativos',
    href: '#ingresso',
  },
  {
    title: 'Processos Gerenciais',
    modality: 'EAD',
    duration: '4 semestres',
    description:
      'Formação objetiva para gestão de operações, pessoas e indicadores com uma trilha digital eficiente.',
    image: processosImage,
    highlight: 'Entrada acelerada',
    href: '#ingresso',
  },
];

export const differentiators = [
  {
    icon: 'career',
    title: 'Carreira como parte do currículo',
    description:
      'Mentorias, conexão com empresas e orientação para transformar aprendizado em posicionamento profissional.',
  },
  {
    icon: 'practice',
    title: 'Aulas com aplicação real',
    description:
      'Menos teoria isolada, mais resolução de casos, simulações, laboratórios e projetos avaliáveis.',
  },
  {
    icon: 'network',
    title: 'Rede acadêmica próxima',
    description:
      'Turmas, coordenação e professores acessíveis para reduzir fricção e acelerar decisões acadêmicas.',
  },
  {
    icon: 'quality',
    title: 'Qualidade reconhecida',
    description:
      'Instituição Nota 4 no MEC, com operação acadêmica focada em clareza, suporte e melhoria contínua.',
  },
];

export const structureItems = [
  {
    title: 'Salas de aula ativas',
    description:
      'Ambientes flexíveis para debate, resolução de problemas e dinâmicas em grupo com tecnologia integrada.',
    image: salaAulaImage,
  },
  {
    title: 'Complexo acadêmico',
    description:
      'Atendimento, convivência e áreas de estudo conectadas para que a rotina do aluno seja simples e previsível.',
    image: salaAula2Image,
  },
  {
    title: 'Laboratórios de inovação',
    description:
      'Espaços preparados para prototipagem, software, pesquisa aplicada e experimentação guiada.',
    image: laboratorioImage,
  },
  {
    title: 'Biblioteca central',
    description:
      'Acervo físico e digital, áreas silenciosas e estações para estudo individual ou em grupo.',
    image: bibliotecaImage,
  },
  {
    title: 'Convivência no campus',
    description:
      'Áreas de pausa, integração entre cursos e suporte à rotina acadêmica de quem passa o dia no campus.',
    image: salaImage,
  },
];

export const admissionSteps = [
  {
    title: 'Escolha sua trilha',
    description: 'Compare cursos, modalidade e rotina ideal para o seu momento.',
  },
  {
    title: 'Agende o vestibular',
    description: 'Receba orientação rápida e escolha o melhor horário de atendimento.',
  },
  {
    title: 'Finalize a matrícula',
    description: 'Envie documentos, confirme a condição e comece com clareza.',
  },
];

export const testimonials = [
  {
    name: 'Weverton Ayres',
    course: 'Egresso de Direito',
    quote:
      'A proximidade com professores e coordenação mudou minha forma de estudar e abriu portas para minha carreira.',
  },
  {
    name: 'Gilda Silva',
    course: 'Egressa de Administração',
    quote:
      'Encontrei suporte acadêmico, professores presentes e uma rotina que me ajudou a crescer com segurança.',
  },
  {
    name: 'Fernando Rodrigues',
    course: 'Egresso de Ciências Contábeis',
    quote:
      'Foram anos de aprendizado prático, acompanhamento próximo e preparo real para atuar no mercado.',
  },
];

export const footerLinks = [
  {
    title: 'Institucional',
    links: ['Sobre a ESUP', 'Corpo docente', 'Editais', 'Ouvidoria'],
  },
  {
    title: 'Aluno',
    links: ['Portal acadêmico', 'Moodle', 'Biblioteca', 'Calendário'],
  },
  {
    title: 'Ingresso',
    links: ['Vestibular', 'Transferência', 'Portador de diploma', 'Bolsas'],
  },
];
