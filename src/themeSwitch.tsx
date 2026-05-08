
import { FiSun, FiMoon } from 'react-icons/fi'; // Certifique-se de ter instalado ou troque por FaSun/FaMoon
import { useTheme } from './themeContext.tsx'; // Importamos o nosso Hook mágico
import styles from './themeSwitch.module.css';
const ThemeSwitch = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <label className={styles.switch}>
      <input 
        type="checkbox" 
        onChange={toggleTheme} 
        checked={isDarkMode} 
        
      />
      <span className={styles.slider}></span>
      
      <div className={styles.iconContainer}>
        <FiSun className={styles.sunIcon} size={16} />
        <FiMoon className={styles.moonIcon} size={16} />
      </div>
    </label>
);
  
};

export default ThemeSwitch;