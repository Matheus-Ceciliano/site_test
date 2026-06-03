import { useEffect, useState } from 'react';
import './App.css';
import { AdmissionsSection } from './components/AdmissionsSection';
import { CoursesSection } from './components/CoursesSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LeadDialog } from './components/LeadDialog';
import { StructureShowcase } from './components/StructureShowcase';
import { Testimonials } from './components/Testimonials';
import type { ThemeMode } from './components/ThemeToggle';

const getInitialTheme = (): ThemeMode => {
  const storedTheme = window.localStorage.getItem('esup-theme');

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('esup-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const openLeadDialog = () => setLeadDialogOpen(true);
  const closeLeadDialog = () => setLeadDialogOpen(false);

  return (
    <div className="app">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} onOpenLead={openLeadDialog} />
      <main id="conteudo">
        <Hero onOpenLead={openLeadDialog} />
        <CoursesSection />
        <DifferentialsSection />
        <StructureShowcase />
        <AdmissionsSection onOpenLead={openLeadDialog} />
        <Testimonials />
      </main>
      <Footer theme={theme} />
      <LeadDialog open={leadDialogOpen} onClose={closeLeadDialog} />
    </div>
  );
}

export default App;
