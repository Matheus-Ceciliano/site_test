import { useState } from 'react'; 
import styles from './Menu.module.css';

interface ItemMenu {
  id: number;
  texto: string;
  link: string;
}

const linksDoMenu: ItemMenu[] = [
  { id: 1, texto: "Início", link: "/" },
  { id: 2, texto: "Produtos", link: "/produtos" },
  { id: 3, texto: "Sobre", link: "/sobre" },
  { id: 4, texto: "Contato", link: "/contato" },
]; 

const App = () => {
  const [menu1Aberto, setMenu1Aberto] = useState(false);
  const [menu2Aberto, setMenu2Aberto] = useState(false);

  return (
    // A caixa mãe que segura as 3 divisões
    <div className={styles.layoutPrincipal}>

      {/* --- 1. TOPO (HEADER) --- */}
      <header className={styles.topo}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Minha Loja ESUP</h1>
      </header>


      {/* --- 2. MEIO (MAIN) --- */}
      <main className={styles.meio}>
        <p>Bem-vindo ao sistema. Escolha uma opção abaixo:</p>

        {/* Menu 1 */}
        <nav className={styles.navContainer}>
          <div className={styles.logoEsup}>ESUP 1</div>
          <button onClick={() => setMenu1Aberto(!menu1Aberto)} className={styles.botaoMenu}>
            {menu1Aberto ? "Fechar X" : "Menu 1 ☰"}
          </button>
          <ul className={`${styles.lista} ${menu1Aberto ? styles.listaAberta : ''}`}>
            {linksDoMenu.map((item) => (
              <li key={item.id}><a href={item.link} className={styles.link}>{item.texto}</a></li>
            ))}
          </ul>
        </nav>

        {/* Menu 2 */}
        <nav className={styles.navContainer}>
          <div className={styles.logoEsup} style={{ color: 'cyan' }}>ESUP 2</div>
          <button onClick={() => setMenu2Aberto(!menu2Aberto)} className={styles.botaoMenu}>
            {menu2Aberto ? "Fechar X" : "Menu 2 ☰"}
          </button>
          <ul className={`${styles.lista} ${menu2Aberto ? styles.listaAberta : ''}`}>
            {linksDoMenu.map((item) => (
              <li key={item.id}><a href={item.link} className={styles.link}>{item.texto}</a></li>
            ))}
          </ul>
        </nav>
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
