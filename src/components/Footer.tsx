import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { assets, footerLinks } from '../data/site';
import type { ThemeMode } from './ThemeToggle';

type FooterProps = {
  theme: ThemeMode;
};

export function Footer({ theme }: FooterProps) {
  const logo = theme === 'dark' ? assets.logoDark : assets.logoLight;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="ESUP" width="132" height="48" />
          <p>
            Faculdade ESUP. Ensino superior com prática, suporte acadêmico e conexão com carreira em Goiânia.
          </p>
          <div className="social-links" aria-label="Redes sociais">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {footerLinks.map((group) => (
          <div className="footer-column" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <a href="#" key={link}>
                {link}
              </a>
            ))}
          </div>
        ))}

        <div className="footer-column footer-contact">
          <h2>Contato</h2>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            <FiMapPin aria-hidden="true" /> Av. T-10, Setor Bueno, Goiânia - GO
          </a>
          <a href="tel:+556233004400">
            <FiPhone aria-hidden="true" /> (62) 3300-4400
          </a>
          <a href="mailto:contato@esup.edu.br">
            <FiMail aria-hidden="true" /> contato@esup.edu.br
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Faculdade ESUP. Todos os direitos reservados.</span>
        <div>
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Ouvidoria</a>
        </div>
      </div>
    </footer>
  );
}
