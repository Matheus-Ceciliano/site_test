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
  
  const [menuAberto, setMenuAberto] = useState(false);
  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <nav className={styles.navContainer}>
      
      <div className={styles.logoEsup}>
        ESUP
      </div>
      
      <h1>Texto teste!</h1>
      <button 
        onClick={alternarMenu} 
        className={styles.botaoMenu}>
        {menuAberto ? "Fechar X" : "Menu ☰"}
      </button>
       <ul className={`${styles.lista} ${menuAberto ? styles.listaAberta : ''}`}>
          {linksDoMenu.map((item) => (
            <li key={item.id}>
              <a href={item.link} className={styles.link}>
                {item.texto}
              </a>
            </li>
          ))}
        </ul>

    </nav>
  );  
};

export default App;
