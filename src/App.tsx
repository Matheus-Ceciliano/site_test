import { useEffect, useState } from 'react';
import {FaWhatsapp, FaUser, FaLaptop, FaCalendarAlt, FaBook, FaBars, FaTimes, FaChevronDown, FaChevronUp} from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './Menu.module.css';
// Importe suas imagens corretamente
import logoLightMode from './assets/logo-esup.png';
import logoDarkMode from './assets/logo-esup-white.png';
import bannerSite from './assets/banner-site.png';
import banner1 from './assets/direito.webp';
import banner2 from './assets/adm.jpeg';
import banner3 from './assets/contabeis.jpg';




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


  

  const App = () => {
    // ... (estados e funções continuam os mesmos) ...
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(null);
    const [indexAtual, setIndexAtual] = useState(0);''
      useEffect(() => {
        const intervalo = setInterval(() => {
          setIndexAtual((prevIndex) => 
            prevIndex ===  slidesContent.length - 1 ? 0 : prevIndex + 1
          );
        }, 5000); // Muda a imagem a cada 5 segundos
        return () => clearInterval(intervalo);
      }, []);

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

          {/* Botão de Tema com texto */}
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
              src={bannerSite} 
              alt="Logo da Faculdade ESUP" 
              className={styles.bannerSite} />
              <div className={styles.textoHero}>
                EFETUE <br />
                SUA <br />
                <span className={styles.destaqueEspecial}>Matrícula.</span>
                <br />
              </div>
           </div>


         
          <section className={styles.heroSection}>
        
        {/* LADO ESQUERDO: O Carrossel */}
        <div className={styles.carouselContainer}>
          <div 
            className={styles.trilhoImagens} 
            style={{ transform: `translateX(-${indexAtual * 100}%)` }}
          >
            {slidesContent.map((item, index) => (
              <div key={index} className={styles.slideItem}>
                <img
                  src={item.image} // Agora pegamos .image do objeto
                  alt={item.titulo}
                  className={styles.imagemSlide}
                />
              </div>
            ))}
          </div>
          
          {/* Opcional: Texto "Matricule-se" flutuante ainda pode ficar aqui se quiser */}
        </div>

        {/* LADO DIREITO: A Descrição Dinâmica */}
        <div className={styles.infoContainer}>
          
          {/* A chave 'key' faz a animação reiniciar a cada troca de index */}
          <div key={indexAtual} className={styles.conteudoAnimado}>
            <h1 className={styles.tituloSlide}>
              {slidesContent[indexAtual].titulo}
            </h1>
            
            <p className={styles.descricaoSlide}>
              {slidesContent[indexAtual].descricao}
            </p>

            <a href={slidesContent[indexAtual].link} className={styles.botaoSaibaMais}>
              Saiba Mais
            </a>
          </div>

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