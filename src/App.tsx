
import styles from './Menu.module.css';

interface ItemMenu {
  id: number;
  texto: string;
  link: string;
  ativo?: boolean;
}

const linksDoMenu: ItemMenu[] = [
  { id: 1, texto: "Início", link: "/", ativo: true },
  { id: 2, texto: "Produtos", link: "/produtos" },
  { id: 3, texto: "Sobre", link: "/sobre" },
  { id: 4, texto: "Contato", link: "/contato" },
];

// Renomeado de MenuNavegacao para App para seguir o padrão do arquivo
const App = () => {
  return (
    // Adicionei uma div em volta para simular o layout da página
    <div style={{ width: '100%', padding: '20px' }}>
      
      <nav className={styles.navContainer}>
        <ul className={styles.lista}>
          {linksDoMenu.map((item) => (
            <li key={item.id}>
              <a 
                href={item.link}
                className={`
                  ${styles.link} 
                  ${item.ativo ? styles.ativo : ''}
                `}
              >
                {item.texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Conteúdo exemplo para você ver o menu no topo */}
      <main style={{ maxWidth: '28rem', margin: '40px auto', color: '#888' }}>
        <h1>Bem-vindo</h1>
        <p>O menu agora está fixo no topo e o layout está limpo.</p>
      </main>

    </div>
  );
};

export default App;
