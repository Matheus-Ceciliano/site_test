import { useEffect, useState } from 'react';
// Ícones
import { 
  FaWhatsapp, FaUser, FaLaptop, FaCalendarAlt, FaBook, FaBars, FaTimes, 
  FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft,
  FaBriefcase, FaLightbulb, FaUsers, FaAward, FaGraduationCap} from 'react-icons/fa';
import { StructureSection } from './structureSection';
// Hook de Animação (Deve ser instalado: npm install react-intersection-observer)
import { useInView } from 'react-intersection-observer';
// Estilos e Componentes
import styles from './Menu.module.css';
import TerminalPortfolio from './TerminalPortfolio';
import { ThemeContext } from './themeContext';
import ThemeSwitch from './themeSwitch'; // Verifique se o nome do arquivo é themeSwitch ou ThemeSwitch

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

          <h2 style={{
            textAlign:'center',
            fontFamily:'serif',
            marginTop:'80px',
            marginBottom: '40px',
            fontSize: '2.5rem'
          }}>
            Nossa estrutura
          </h2>

          <StructureSection />
        </main>

        <footer className={styles.rodape}>
          <p>© 2025 Grupo ESUP - Todos os direitos reservados.</p>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;