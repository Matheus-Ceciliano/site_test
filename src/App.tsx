import { useEffect, useState } from 'react';
// Ícones
import { 
  FaWhatsapp, FaUser, FaLaptop, FaCalendarAlt, FaBook, FaBars, FaTimes, 
  FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft,
  FaBriefcase, FaLightbulb, FaUsers, FaAward, FaGraduationCap} from 'react-icons/fa';
import { StructureSection } from './structureSection';
import { TestimonialsSection } from './testimonialSection';
// Hook de Animação (Deve ser instalado: npm install react-intersection-observer)
import { useInView } from 'react-intersection-observer';
// Estilos e Componentes
import styles from './Menu.module.css';
import TerminalPortfolio from './TerminalPortfolio';
import { ThemeContext } from './themeContext';
import ThemeSwitch from './themeSwitch'; 
// Imagens
import logoLightMode from './assets/logo-esup.png';
import logoDarkMode from './assets/logo-esup-white.png';
import banner1 from './assets/direito.webp';
import banner2 from './assets/adm.jpeg';
import banner3 from './assets/contabeis.jpg';
import banner4 from './assets/pedagogia-semipresencial.jpg';
import banner5 from './assets/sis-info.jpg';
import banner6 from './assets/process-gerenciais.jpg';

// --- Interfaces e Dados ---
interface SubItem {
  label: string;
  link?: string;
  subItems?: SubItem[];
}
interface MenuPrincipal {
  titulo: string;
  items: SubItem[];
}

const slidesContent = [
  {
    image: banner1,
    titulo: "Curso de Direito",
    descricao: "Formação de excelência com corpo docente renomado e núcleo de prática jurídica ativo.",
    link: "/curso-direito"
  },
  {
    image: banner2,
    titulo: "Administração",
    descricao: "Desenvolva habilidades de liderança e gestão estratégica para o mercado moderno.",
    link: "/curso-adm"
  },
  {
    image: banner3,
    titulo: "Ciências Contábeis",
    descricao: "Prepare-se para atuar na gestão financeira e tributária de grandes empresas.",
    link: "/curso-contabeis"
  },
  {
    image: banner4,
    titulo: "Psicologia",
    descricao: "Explore a mente humana com práticas clínicas e pesquisa inovadora.",
    link: "/curso-psicologia"
  },
  {
    image: banner5,
    titulo: "Sistemas de Informação",
    descricao: "Capacite-se em tecnologia da informação e desenvolvimento de software.",
    link: "/curso-sisinfo"
  },
  {
    image: banner6,
    titulo: "Processos Gerenciais (EAD)",
    descricao: "Curso a distância focado em gestão eficiente e tomada de decisões estratégicas.",
    link: "/curso-processos-gerenciais"
  }
];

const menus: MenuPrincipal[] = [
  {
    titulo: "A Esup",
    items: [
      { label: "Sobre a Esup", link: "#" },
      { label: "Dirigentes", link: "#" },
      { label: "Corpo Docente", link: "#" },
      { label: "Secretaria Geral", link: "#" }
    ]
  },
  {
    titulo: "Como Ingressar",
    items: [
      { label: "Vestibular", link: "#" },
      { label: "Transferência Externa", link: "#" },
      { label: "Portador de Diploma", link: "#" },
      { label: "Bolsas e Financiamentos", link: "#" }
    ]
  },
  {
    titulo: "Programas",
    items: [
      {
        label: "Graduação Presencial",
        subItems: [
          { label: "Direito", link: "#" },
          { label: "Sistema de Informação", link: "#" },
          { label: "Psicologia", link: "#" },
          { label: "Administração", link: "#" },
          { label: "Ciências Contábeis", link: "#" },
        ]
      },
      {
        label: "Graduação EAD",
        subItems: [
          { label: "Processos Gerenciais", link: "#" },
          { label: "Power BI", link: "#" }
        ]
      },
      { label: "Pós-Graduação", link: "#" },
      { label: "Cursos de Extensão", link: "#" }
    ]
  },
  {
    titulo: "Egressos",
    items: [
      { label: "Portal do Aluno", link: "#" },
      { label: "Histórias de Sucesso", link: "#" },
      { label: "Emissão de Diploma", link: "#" }
    ]
  },
  {
    titulo: "Contatos",
    items: [
      { label: "Fale Conosco", link: "#" },
      { label: "Localização", link: "#" },
      { label: "Editais", link: "#" }
    ]
  }
];

const frase = "Conheça Nossos Cursos";

// --- INÍCIO DO COMPONENTE APP ---
const App = () => {
  // 1. HOOKS (Sempre no topo da função)
  
  // Hook de Animação (Detecta quando a seção aparece na tela)
  const { ref: sectionRef, inView: sectionVisible } = useInView({
    triggerOnce: true, 
    threshold: 0.5,    
  });

  // Estados
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(null);
  
  // Estados do Carrossel
  const [indexAtual, setIndexAtual] = useState(0);
  const [itensVisiveis, setItensVisiveis] = useState(3);
  const totalSlides = slidesContent.length;

  // 2. FUNÇÕES AUXILIARES

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const toggleSubmenuMobile = (index: number) => {
    setExpandedMenuIndex(expandedMenuIndex === index ? null : index);
  };

  // Resize Listener (Responsividade do Carrossel)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItensVisiveis(1);
      } else {
        setItensVisiveis(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navegação do Carrossel
  const avancarSlide = () => {
    const maxIndex = totalSlides - itensVisiveis;
    setIndexAtual((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const voltarSlide = () => {
    const maxIndex = totalSlides - itensVisiveis;
    setIndexAtual((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // 3. RENDERIZAÇÃO (JSX)
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`${styles.layoutPrincipal} ${isDarkMode ? styles.temaEscuro : styles.temaClaro}`}>

        {/* --- MENU MOBILE (GAVETA LATERAL) --- */}
        {mobileMenuOpen && (
          <div className={styles.menuMobileOverlay} onClick={toggleMobileMenu}></div>
        )}

        <div className={`${styles.menuMobileContainer} ${mobileMenuOpen ? styles.aberto : ''}`}>
          <div className={styles.cabecalhoMobile}>
            <button onClick={toggleMobileMenu} className={styles.botaoFechar}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.conteudoTopoMobile}>
            <div className={styles.switchContainerMobile}>
              <span>Modo {isDarkMode ? 'Escuro' : 'Claro'}</span>
              <ThemeSwitch />
            </div>

            <div className={styles.mobileTopGroup}>
              <span className={styles.mobileTopItem}><FaWhatsapp size={18} /> (62) 3300-4400</span>
              <span className={styles.mobileTopItem}><FaCalendarAlt /> Calendário Acadêmico</span>
              <span className={styles.mobileTopItem}><FaBook /> Biblioteca</span>
            </div>

            <div className={styles.mobileTopGroup}>
              <span className={styles.mobileTopItem}><FaUser /> <a target='_blank' href="https://atp.esup.edu.br">Moodle</a></span>
              <span className={styles.mobileTopItem}><FaLaptop /> <a target='_blank' href="https://sei.esup.edu.br"> Portal Acadêmico</a> </span>
            </div>
          </div>

          {menus.map((menu, index) => (
            <div key={index} className={styles.itemMobile}>
              <div className={styles.tituloMobile} onClick={() => toggleSubmenuMobile(index)}>
                {menu.titulo}
                {expandedMenuIndex === index ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </div>
              {expandedMenuIndex === index && (
                <div className={styles.listaSubitensMobile}>
                  {menu.items.map((subItem, subIndex) => (
                    <div key={subIndex}>
                      {subItem.subItems ? (
                        <div style={{ marginTop: 10 }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--text-nav)' }}>{subItem.label}</strong>
                          <div style={{ paddingLeft: 10, borderLeft: '2px solid var(--border-color)', marginTop: 5 }}>
                            {subItem.subItems.map((neto, netoIndex) => (
                              <a key={netoIndex} href={neto.link} className={styles.linkMobile}>{neto.label}</a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <a href={subItem.link} className={styles.linkMobile}>{subItem.label}</a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- TOPO (HEADER) --- */}
        <div className={styles.barraTopo}>
          <div className={styles.grupoIcones}>
            <span className={styles.itemTopo}><FaWhatsapp size={18} /> (62) 3300-4400</span>
            <span className={styles.itemTopo}><FaCalendarAlt /> Calendário</span>
            <span className={styles.itemTopo}><FaBook /> Biblioteca</span>
          </div>

          <div className={styles.grupoIcones}>
            <span className={styles.itemTopo}><FaUser /> <a target='_blank' href="https://atp.esup.edu.br">Moodle </a></span>
            <span className={styles.itemTopo}><FaLaptop /> <a target='_blank' href="https://sei.esup.edu.br"> Portal Acadêmico</a></span>
            <ThemeSwitch />
          </div>
        </div>

        {/* --- CORPO (MAIN) --- */}
        <main className={styles.meio}>
          <div className={styles.barraBranca}>
            <div className={styles.containerNavegacao}>
              <div className={styles.colunaLateral}>
                <img src={isDarkMode ? logoDarkMode : logoLightMode} alt="Logo ESUP" className={isDarkMode ? styles.logoEscuro : styles.logoClaro} />
              </div>
              <div className={styles.colunaCentral}>
                {menus.map((menu, index) => (
                  <div key={index} className={styles.itemMenuPrincipal}>
                    {menu.titulo} ▾
                    <div className={styles.submenuDropdown}>
                      {menu.items.map((subItem, subIndex) => (
                        subItem.subItems ? (
                          <div key={subIndex} className={styles.itemComSubmenu}>
                            {subItem.label}
                            <div className={styles.submenuDropdown}>
                              {subItem.subItems.map((neto, netoIndex) => (
                                <a key={netoIndex} href={neto.link} className={styles.linkSubmenu}>{neto.label}</a>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <a key={subIndex} href={subItem.link} className={styles.linkSubmenu}>{subItem.label}</a>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.colunaLateral} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <div className={styles.menuHamburgerIcon} onClick={toggleMobileMenu}>
                  <FaBars />
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.notebookWrapper}>
            <TerminalPortfolio typingSpeed={100} deletingSpeed={50} />
          </div>

          {/* --- SEÇÃO CARROSSEL (Corrigida) --- */}
          <section
            ref={sectionRef}
            className={`${styles.sectionCarrossel} ${sectionVisible ? styles.animarEntrada : ''}`}
          >
            <h2 className={styles.tituloSecao}>
              {frase.split(' ').map((palavra, index) => (
                <span
                  key={index}
                  className={styles.palavraAnimada}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {palavra}&nbsp;
                </span>
              ))}
            </h2>

            <div className={styles.janelaCarrossel}>
              {/* Botões do Carrossel */}
              <button className={`${styles.botaoCarrossel} ${styles.botaoEsquerda} ${styles.botaoAnimado}`} onClick={voltarSlide}>
                <FaChevronLeft />
              </button>
              <button className={`${styles.botaoCarrossel} ${styles.botaoDireita} ${styles.botaoAnimado}`} onClick={avancarSlide}>
                <FaChevronRight />
              </button>

              <div
                className={styles.trilhoImagens}
                style={{ transform: `translateX(-${indexAtual * (100 / itensVisiveis)}%)` }}
              >
                {slidesContent.map((item, index) => {
                  
                  // Lógica de Animação: Só aplica se for desktop E a seção estiver visível
                  let animationClass = '';
                  
        
                  if (index === 0) {
                     animationClass = styles.cardVemDaEsquerda; // Index 0 (Esquerda)
                    } else if (index === 2) {
                      animationClass = styles.cardVemDaDireita;  // Index 2 (Direita Visível)
                    } else {
                      animationClass = styles.cardFadeInCentro;  // Index 1 e restantes
                    }

                  return (
                    <div key={index} className={styles.cardSlide}>
                      <div className={`${styles.cardInterior} ${animationClass}`}>
                        <div className={styles.wrapperImagem}>
                          <img src={item.image} alt={item.titulo} className={styles.imagemSlide} />
                        </div>
                        <div className={styles.conteudoCard}>
                           <h3 className={styles.tituloCard}>{item.titulo}</h3>
                           <p className={styles.descricaoCard}>{item.descricao}</p>
                           <a href={item.link} className={styles.linkCard}>Saiba Mais →</a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* --- SEÇÃO DIFERENCIAIS --- */}
          <section className={styles.sectionDiferenciais}>
            <div className={styles.cardBalao} style={{ animationDelay: '0s' }}>
              <span className={styles.iconeBalao}><FaBriefcase /></span>
              <h3 className={styles.tituloBalao}>Conexão com o Mercado</h3>
              <p className={styles.textoBalao}>Núcleo de carreiras ativo e parcerias com grandes empresas para facilitar seu acesso a estágios e vagas exclusivas.</p>
            </div>

            <div className={styles.cardBalao} style={{ animationDelay: '1.5s' }}>
              <span className={styles.iconeBalao}><FaLightbulb /></span>
              <h3 className={styles.tituloBalao}>Ensino Prático</h3>
              <p className={styles.textoBalao}>Metodologias ativas e simulações empresariais para que você resolva desafios reais desde o primeiro semestre.</p>
            </div>

            <div className={styles.cardBalao} style={{ animationDelay: '0.5s' }}>
              <span className={styles.iconeBalao}><FaUsers /></span>
              <h3 className={styles.tituloBalao}>Networking Estratégico</h3>
              <p className={styles.textoBalao}>Um ambiente que conecta você a uma rede valiosa de alunos, ex-alunos e professores atuantes no mercado.</p>
            </div>

            <div className={styles.cardBalao} style={{ animationDelay: '0.5s' }}>
              <span className={styles.iconeBalao}><FaAward /></span>
              <h3 className={styles.tituloBalao}>Nota 4 MEC</h3>
              <p className={styles.textoBalao}>A Faculdade ESUP é Nota 4 no MEC (escala até 5), demonstrando alta qualidade de ensino.</p>
            </div>

            <div className={styles.cardBalao} style={{ animationDelay: '0.5s' }}>
              <span className={styles.iconeBalao}><FaGraduationCap /></span>
              <h3 className={styles.tituloBalao}>Melhores Professores</h3>
              <p className={styles.textoBalao}>Professores de mercado com amplo conhecimento teórico e profunda experiência prática.</p>
            </div>
          </section>

        

          <StructureSection />

          
        {/* Espaçador opcional entre as seções */}
        <div style={{ height: '40px' }}></div>

        {/* Seção de Depoimentos */}
        <TestimonialsSection/>
        </main>

        <footer className={styles.rodape}>
          <div className={styles.rodapeGrid}>

            {/* Coluna 1 - Logo e Descrição */}
            <div className={styles.rodapeColuna}>
              <img
                src={isDarkMode ? logoDarkMode : logoLightMode}
                alt="Logo ESUP"
                className={styles.rodapeLogo}
              />
              <p className={styles.rodapeDescricao}>
                Formando profissionais de excelência desde 2002. Comprometidos com qualidade, inovação e o futuro dos nossos alunos.
              </p>
              <div className={styles.rodapeRedes}>
                <a href="#" aria-label="Instagram" className={styles.rodapeRedeLink}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className={styles.rodapeRedeLink}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className={styles.rodapeRedeLink}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" aria-label="YouTube" className={styles.rodapeRedeLink}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div className={styles.rodapeColuna}>
              <h4 className={styles.rodapeTituloColuna}>Links Rápidos</h4>
              <ul className={styles.rodapeLista}>
                <li><a href="#" className={styles.rodapeLink}>Sobre a ESUP</a></li>
                <li><a href="#" className={styles.rodapeLink}>Corpo Docente</a></li>
                <li><a href="#" className={styles.rodapeLink}>Vestibular</a></li>
                <li><a href="#" className={styles.rodapeLink}>Bolsas e Financiamentos</a></li>
                <li><a href="#" className={styles.rodapeLink}>Calendário Acadêmico</a></li>
                <li><a href="#" className={styles.rodapeLink}>Editais</a></li>
              </ul>
            </div>

            {/* Coluna 3 - Cursos */}
            <div className={styles.rodapeColuna}>
              <h4 className={styles.rodapeTituloColuna}>Nossos Cursos</h4>
              <ul className={styles.rodapeLista}>
                <li><a href="#" className={styles.rodapeLink}>Direito</a></li>
                <li><a href="#" className={styles.rodapeLink}>Administração</a></li>
                <li><a href="#" className={styles.rodapeLink}>Ciências Contábeis</a></li>
                <li><a href="#" className={styles.rodapeLink}>Psicologia</a></li>
                <li><a href="#" className={styles.rodapeLink}>Sistemas de Informação</a></li>
                <li><a href="#" className={styles.rodapeLink}>Processos Gerenciais (EAD)</a></li>
              </ul>
            </div>

            {/* Coluna 4 - Contato */}
            <div className={styles.rodapeColuna}>
              <h4 className={styles.rodapeTituloColuna}>Contato</h4>
              <ul className={styles.rodapeListaContato}>
                <li className={styles.rodapeContatoItem}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{flexShrink:0,marginTop:'2px'}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span>Av. T-10, Setor Bueno, Goiânia - GO, 74230-030</span>
                </li>
                <li className={styles.rodapeContatoItem}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{flexShrink:0}}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  <a href="tel:+556233004400" className={styles.rodapeLink}>(62) 3300-4400</a>
                </li>
                <li className={styles.rodapeContatoItem}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{flexShrink:0}}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <a href="mailto:contato@esup.edu.br" className={styles.rodapeLink}>contato@esup.edu.br</a>
                </li>
                <li className={styles.rodapeContatoItem}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{flexShrink:0}}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                  <span>Seg–Sex: 8h às 22h | Sáb: 8h às 12h</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Linha divisória + copyright */}
          <div className={styles.rodapeDivisor}></div>
          <div className={styles.rodapeBottom}>
            <p className={styles.rodapeCopyright}>© 2025 Grupo ESUP — Todos os direitos reservados.</p>
            <div className={styles.rodapeBottomLinks}>
              <a href="#" className={styles.rodapeLinkBottom}>Política de Privacidade</a>
              <a href="#" className={styles.rodapeLinkBottom}>Termos de Uso</a>
              <a href="#" className={styles.rodapeLinkBottom}>Ouvidoria</a>
            </div>
          </div>
        </footer>
      </div>

  
        

      

     

    </ThemeContext.Provider>
  );


};

export default App;