import { createContext, useContext } from 'react';

// 1. Definimos o formato do nosso contexto (para o TypeScript não reclamar)
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// 2. Criamos o contexto vazio
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

// 3. Criamos o Hook (o atalho que você queria exportar)
export const useTheme = () => useContext(ThemeContext);