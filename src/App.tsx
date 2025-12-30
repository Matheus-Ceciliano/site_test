import { useEffect, useState } from 'react';
import { FaWhatsapp, FaUser, FaLaptop, FaCalendarAlt, FaBook, FaBars, FaTimes, FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { FaBriefcase, FaLightbulb, FaUsers } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './Menu.module.css';
// Importe suas imagens corretamente
import logoLightMode from './assets/logo-esup.png';
import logoDarkMode from './assets/logo-esup-white.png';

import banner1 from './assets/direito.webp';
import banner2 from './assets/adm.jpeg';
import banner3 from './assets/contabeis.jpg';
import banner4 from './assets/pedagogia-semipresencial.jpg';
import banner5 from './assets/sis-info.jpg';
import banner6 from './assets/process-gerenciais.jpg';


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
        label: "Graduação Presencial", // Removi a seta ▸ do texto, usaremos ícone
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


//costantes principais//
//costantes principais//
//costantes principais//




const App = () => {
  // ... (estados e funções continuam os mesmos) ...
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(null);

  // CONFIGURAÇÃO: Mostra 3 itens por vez
  const [indexAtual, setIndexAtual] = useState(0);
  const [itensVisiveis, setItensVisiveis] = useState(3);
  const totalSlides = slidesContent.length;

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

  // 2. Funções de Navegação Manual
  const avancarSlide = () => {
    const maxIndex = totalSlides - itensVisiveis;
    // Se estiver no último, volta para o 0 (Loop)
    setIndexAtual((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const voltarSlide = () => {
    const maxIndex = totalSlides - itensVisiveis;
    // Se estiver no 0, vai para o último (Loop)
    setIndexAtual((prev) => (prev === 0 ? maxIndex : prev - 1));
  };


  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSubmenuMobile = (index: number) => setExpandedMenuIndex(expandedMenuIndex === index ? null : index);

  // --- COMPONENTE DO BOTÃO DE TEMA (Para reusar) ---
  const ThemeSwitch = () => (
    <button
      onClick={toggleTheme}
      className={`${styles.switchTrack} ${isDarkMode ? styles.switchTrackActive : ''}`}
      title="Mudar Tema"
      type="button"
    >
      <div className={styles.switchThumb}>
        {isDarkMode ? <FiMoon size={12} /> : <FiSun size={12} color="#f59e0b" />}
      </div>
    </button>
  );



  return (
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

        {/* --- NOVO: CONTEÚDO DO TOPO DENTRO DO MENU --- */}
        <div className={styles.conteudoTopoMobile}>
          <div className={styles.switchContainerMobile}>
            <span>Modo {isDarkMode ? 'Escuro' : 'Claro'}</span>
            <ThemeSwitch />
          </div>

          {/* Grupo de Contatos */}
          <div className={styles.mobileTopGroup}>
            <span className={styles.mobileTopItem}><FaWhatsapp size={18} /> (62) 3300-4400</span>
            <span className={styles.mobileTopItem}><FaCalendarAlt /> Calendário Acadêmico</span>
            <span className={styles.mobileTopItem}><FaBook /> Biblioteca</span>
          </div>

          {/* Grupo de Portais */}
          <div className={styles.mobileTopGroup}>
            <span className={styles.mobileTopItem}><FaUser /> <a target='_blank' href="https://atp.esup.edu.br/?_gl=1*xsldly*_gcl_au*MTE3NzI3MzM5OC4xNzY2MjY1Mjky">Moodle</a></span>
            <span className={styles.mobileTopItem}><FaLaptop /> <a target='_blank' href="https://sei.esup.edu.br/?_gl=1*1hcx7wm*_gcl_au*MTE3NzI3MzM5OC4xNzY2MjY1Mjky"> Portal Acadêmico</a> </span>
          </div>
        </div>
        {/* -------------------------------------------- */}


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


      {/* --- 1. TOPO (HEADER) - Some no mobile via CSS --- */}
      <div className={styles.barraTopo}>
        <div className={styles.grupoIcones}>
          <span className={styles.itemTopo}><FaWhatsapp size={18} /> (62) 3300-4400</span>
          <span className={styles.itemTopo}><FaCalendarAlt /> Calendário</span>
          <span className={styles.itemTopo}><FaBook /> Biblioteca</span>
        </div>

        <div className={styles.grupoIcones}>


          <span className={styles.itemTopo}><FaUser /> <a target='_blan' href="https://atp.esup.edu.br/?_gl=1*xsldly*_gcl_au*MTE3NzI3MzM5OC4xNzY2MjY1Mjky">Moodle </a></span>
          <span className={styles.itemTopo}><FaLaptop /> <a target='_blank' href="https://sei.esup.edu.br/?_gl=1*1hcx7wm*_gcl_au*MTE3NzI3MzM5OC4xNzY2MjY1Mjky"> Portal Acadêmico</a></span>
          {/* Usa o componente do botão */}
          <ThemeSwitch />
        </div>
      </div>

      {/* --- 2. MEIO (MAIN) --- */}
      {/* ... (O resto do seu código permanece idêntico) ... */}
      <main className={styles.meio}>
        <div className={styles.barraBranca}>
          <div className={styles.containerNavegacao}>
            <div className={styles.colunaLateral}>
              <img src={isDarkMode ? logoDarkMode : logoLightMode} alt="Logo ESUP" className={isDarkMode ? styles.logoEscuro : styles.logoClaro} />
            </div>
            <div className={styles.colunaCentral}>

              {/* ... menus desktop ... */}
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

        <div className={styles.containerImagem}>
          <img
            /* src principal (fallback para navegadores antigos) */
            src="https://esup.edu.br/wp-content/uploads/2025/12/Banner-1-vestibular-site-2048x533.png"

            /* alt text */
            alt="Vestibular 2026.1 Matrículas Abertas"

            /* Suas classes de estilo (CSS Modules) */
            className={styles.bannerSite}

            /* A MÁGICA AQUI: Lista de resoluções */
            srcSet="
          https://esup.edu.br/wp-content/uploads/2025/12/Banner-1-vestibular-site.png 3840w, 
          https://esup.edu.br/wp-content/uploads/2025/12/Banner-1-vestibular-site-300x78.png 300w, 
          https://esup.edu.br/wp-content/uploads/2025/12/Banner-1-vestibular-site-1024x267.png 1024w, 
          https://esup.edu.br/wp-content/uploads/2025/12/Banner-1-vestibular-site-768x200.png 768w, 
          https://esup.edu.br/wp-content/uploads/2025/12/Banner-1-vestibular-site-1536x400.png 1536w, 
          https://esup.edu.br/wp-content/uploads/2025/12/Banner-1-vestibular-site-2048x533.png 2048w
        "

            /* Diz ao navegador qual espaço a imagem vai ocupar na tela */
            sizes="(max-width: 3840px) 100vw, 3840px"
          />
          <div className={styles.textoHero}>
            EFETUE <br />
            SUA <br />
            <span className={styles.destaqueEspecial}>Matrícula.</span>
            <br />
          </div>
        </div>


        <section className={styles.sectionCarrossel}>




          <h2 className={styles.tituloSecao}>Conheça Nossos Cursos</h2>
          {/* Janela que esconde os itens fora de visão */}
          <div className={styles.janelaCarrossel}>
            {/* O Trilho que move os itens */}
            {/* BOTÃO ESQUERDA (ANTERIOR) */}
            <button className={`${styles.botaoCarrossel} ${styles.botaoEsquerda}`} onClick={voltarSlide}>
              <FaChevronLeft />
            </button>
            <button className={`${styles.botaoCarrossel} ${styles.botaoDireita}`} onClick={avancarSlide}>
              <FaChevronRight />
            </button>

            {/* TRILHO (Igual ao anterior) */}
            <div
              className={styles.trilhoImagens}
              style={{
                transform: `translateX(-${indexAtual * (100 / itensVisiveis)}%)`
              }}
            >
              {slidesContent.map((item, index) => (


                <div key={index} className={styles.cardSlide}>

                  {/* ADICIONE ESTA DIV 'cardInterior' ENVOLVENDO TUDO */}
                  <div className={styles.cardInterior}>

                    {/* Imagem */}
                    <div className={styles.wrapperImagem}>
                      <img
                        src={item.image}
                        alt={item.titulo}
                        className={styles.imagemSlide}
                      />
                    </div>

                    {/* Conteúdo */}
                    <div className={styles.conteudoCard}>
                      <h3 className={styles.tituloCard}>{item.titulo}</h3>
                      <p className={styles.descricaoCard}>{item.descricao}</p>
                      <a href={item.link} className={styles.linkCard}>
                        Saiba Mais →
                      </a>
                    </div>

                  </div> {/* Fim da cardInterior */}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.sectionDiferenciais}>

          {/* Card 1: Empregabilidade (Delay 0s) */}
          <div className={styles.cardBalao} style={{ animationDelay: '0s' }}>
            <span className={styles.iconeBalao}>
              <FaBriefcase />
            </span>
            <h3 className={styles.tituloBalao}>Conexão com o Mercado</h3>
            <p className={styles.textoBalao}>
              Núcleo de carreiras ativo e parcerias com grandes empresas para facilitar seu acesso a estágios e vagas exclusivas.
            </p>
          </div>

          {/* Card 2: Prática (Delay 1.5s - para desencontrar o movimento) */}
          <div className={styles.cardBalao} style={{ animationDelay: '1.5s' }}>
            <span className={styles.iconeBalao}>
              <FaLightbulb />
            </span>
            <h3 className={styles.tituloBalao}>Ensino Prático</h3>
            <p className={styles.textoBalao}>
              Metodologias ativas e simulações empresariais para que você resolva desafios reais desde o primeiro semestre.
            </p>
          </div>

          {/* Card 3: Networking (Delay 3s) */}
          <div className={styles.cardBalao} style={{ animationDelay: '0.5s' }}>
            <span className={styles.iconeBalao}>
              <FaUsers />
            </span>
            <h3 className={styles.tituloBalao}>Networking Estratégico</h3>
            <p className={styles.textoBalao}>
              Um ambiente que conecta você a uma rede valiosa de alunos, ex-alunos e professores atuantes no mercado.
            </p>
          </div>






        </section>






      </main>

      <footer className={styles.rodape}>
        <p>© 2025 Grupo ESUP - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
