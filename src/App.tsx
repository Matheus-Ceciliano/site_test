import { FaWhatsapp, FaUser, FaLaptop, FaCalendarAlt, FaBook } from 'react-icons/fa';

import styles from './Menu.module.css';


interface SubItem {
  label:string; 
  link?:string;
  subItems?: SubItem[];
}

interface MenuPrincipal {
  titulo: string;
  items: SubItem[];
}



const menus: MenuPrincipal[] = [
  {
    titulo: "A ESUP",
    items: [
      { label: "Quem Somos", link: "#" },
      { label: "Documentos", link: "#" }
    ]
  },
  {
    titulo: "GRADUAÇÃO",
    items: [
      { label: "Direito", link: "#" },
      { 
        label: "Engenharias ▸", // A setinha indica que tem mais
        subItems: [ // AQUI ESTÁ A CASCATA
          { label: "Eng. de Software", link: "#" },
          { label: "Eng. Civil", link: "#" },
          { label: "Eng. Elétrica", link: "#" }
        ]
      },
      { label: "Psicologia", link: "#" }
    ]
  },
  {
    titulo: "PÓS-GRADUAÇÃO",
    items: [
        { label: "Mestrado", link: "#" },
        { label: "Doutorado", link: "#" }
    ]
  }
  
];


const App = () => {


  return (
    // A caixa mãe que segura as 3 divisões
    <div className={styles.layoutPrincipal}>




      {/* --- 1. TOPO (HEADER) --- */}
      {/* --- BARRA DE TOPO AZUL --- */}
        <div className={styles.barraTopo}>

          {/* GRUPO ESQUERDA */}
          <div className={styles.grupoIcones}>
            
            <span className={styles.itemTopo}>
              <FaWhatsapp size={18} />
              WhatsApp: (62) 3300-4400
            </span>
            
            <span className={styles.itemTopo}>
              <FaCalendarAlt />
              Calendário Acadêmico
            </span>

            <span className={styles.itemTopo}>
              <FaBook />
              Biblioteca
            </span>
          </div>

          {/* GRUPO DIREITA */}
          <div className={styles.grupoIcones}>
            <span className={styles.itemTopo}>
              <FaUser />
              Moodle
            </span>

            <span className={styles.itemTopo}>
              <FaLaptop />
              Portal Acadêmico
            </span>
          </div>

        </div>


      {/* --- 2. MEIO (MAIN) --- */}
      <main className={styles.meio}>

        <div className={styles.barraBranca}>
            <div style={{ display: 'flex', gap: '30px' }}>
  {menus.map((menu, index) => (
    
    // NÍVEL 1: O Botão Principal (ex: GRADUAÇÃO)
    <div key={index} className={styles.itemMenuPrincipal}>
      {menu.titulo} ▾
      
      {/* O PRIMEIRO DROPDOWN (Vertical) */}
      <div className={styles.submenuDropdown}>
        
        {menu.items.map((subItem, subIndex) => (
          
          // VERIFICAÇÃO: Tem subitens? (Engenharia) OU é link normal? (Direito)
          subItem.subItems ? (
            
            // CASO 1: TEM CASCATA (Engenharias)
            <div key={subIndex} className={styles.itemComSubmenu}>
              {subItem.label}
              
              {/* O SEGUNDO DROPDOWN (Lateral) */}
              <div className={styles.submenuDropdown}>
                {subItem.subItems.map((neto, netoIndex) => (
                  <a key={netoIndex} href={neto.link} className={styles.linkSubmenu}>
                    {neto.label}
                  </a>
                ))}
              </div>
            </div>

          ) : (
            
            // CASO 2: LINK NORMAL (Direito)
            <a key={subIndex} href={subItem.link} className={styles.linkSubmenu}>
              {subItem.label}
            </a>

          )

        ))}

      </div>
    </div>
  ))}
  </div>
</div>



        {/* Menu 1 */}
       
      </main>


      {/* --- 3. RODAPÉ (FOOTER) --- */}
      <footer className={styles.rodape}>
        <p>© 2025 Grupo ESUP - Todos os direitos reservados.</p>
        <p>Feito com React e TypeScript</p>
      </footer>

    </div>
  );
};

export default App;
