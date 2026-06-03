import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiBookOpen, FiLogIn, FiMenu, FiPhone, FiX } from 'react-icons/fi';
import { assets, navItems } from '../data/site';
import type { ThemeMode } from './ThemeToggle';
import { ThemeToggle } from './ThemeToggle';

type HeaderProps = {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenLead: () => void;
};

export function Header({ theme, onToggleTheme, onOpenLead }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const logo = theme === 'dark' ? assets.logoDark : assets.logoLight;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleLeadClick = () => {
    closeMenu();
    onOpenLead();
  };

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <a href="tel:+556233004400" className="utility-bar__link">
            <FiPhone aria-hidden="true" /> (62) 3300-4400
          </a>
          <a href="#estrutura" className="utility-bar__link">
            <FiBookOpen aria-hidden="true" /> Biblioteca e estrutura
          </a>
          <a
            href="https://atp.esup.edu.br"
            target="_blank"
            rel="noreferrer"
            className="utility-bar__link utility-bar__link--desktop"
          >
            <FiLogIn aria-hidden="true" /> Moodle
          </a>
        </div>
      </div>

      <div className="container nav-shell">
        <a className="brand" href="#" aria-label="Voltar para o início">
          <img src={logo} alt="ESUP" width="128" height="46" />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button className="button button--primary header-actions__cta" type="button" onClick={onOpenLead}>
            Inscreva-se
          </button>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              className="mobile-menu-backdrop"
              type="button"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={closeMenu}
            />
            <motion.aside
              id="mobile-menu"
              className="mobile-menu"
              aria-label="Menu mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="mobile-menu__header">
                <img src={logo} alt="ESUP" width="112" height="40" />
                <button className="icon-button" type="button" aria-label="Fechar menu" onClick={closeMenu}>
                  <FiX size={22} />
                </button>
              </div>

              <nav className="mobile-menu__nav" aria-label="Navegação mobile">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMenu}>
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mobile-menu__footer">
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                <button className="button button--primary button--full" type="button" onClick={handleLeadClick}>
                  Quero estudar na ESUP
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
