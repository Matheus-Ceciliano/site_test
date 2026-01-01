import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './TerminalPortfolio.css'; 
import notebookImg from './assets/notebook.png';
import wallpaperImg from './assets/wallpaper.png';


interface TerminalPortfolioProps {
  typingSpeed?: number;
  deletingSpeed?: number;
}

const TARGET_DATE = new Date(2026, 1, 20).getTime(); // 20 de Fev de 2026

const CtaPanel = () => {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;
      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      }
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="cta-content">
      <h3 className="cta-title">Últimos dias para sua Bolsa</h3>
      <p className="cta-subtitle">A condição especial encerra em:</p>

      <div className="cta-timer-container">
        <div className="cta-timer-box">
          <span className="cta-timer-number">{formatNumber(timeLeft.dias)}</span>
          <span className="cta-timer-label">Dias</span>
        </div>
        <div className="cta-timer-box">
          <span className="cta-timer-number">{formatNumber(timeLeft.horas)}</span>
          <span className="cta-timer-label">Hrs</span>
        </div>
        <div className="cta-timer-box">
          <span className="cta-timer-number">{formatNumber(timeLeft.minutos)}</span>
          <span className="cta-timer-label">Min</span>
        </div>
        <div className="cta-timer-box">
          <span className="cta-timer-number">{formatNumber(timeLeft.segundos)}</span>
          <span className="cta-timer-label">Seg</span>
        </div>
      </div>

      <button className="cta-button" onClick={() => alert("Redirecionar!")}>
        Garantir minha vaga
        <FaArrowRight size={12} />
      </button>
    </div>
  );
};

// =========================================================
// 2. COMPONENTE PRINCIPAL (TERMINAL)
// =========================================================

const TerminalPortfolio: React.FC<TerminalPortfolioProps> = ({
  typingSpeed = 100,
  deletingSpeed = 50,
}) => {
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const texts: string[] = [
        "Matrículas abertas para 2026.",
        "Garanta já a sua vaga.",
        "O seu futuro começa agora!",
        "Venha transformar sua carreira!",
        "Agende seu vestibular hoje!",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(typingSpeed);

  useEffect(() => {
    const tick = () => {
      const i = textIndex % texts.length;
      const fullText = texts[i];
      
      const updatedText = isDeleting 
        ? fullText.substring(0, displayedText.length - 1) 
        : fullText.substring(0, displayedText.length + 1);

      setDisplayedText(updatedText);

      if (isDeleting) {
        setDelta(deletingSpeed);
      }

      if (!isDeleting && updatedText === fullText) {
        setDelta(2000); // Espera 2 segundos antes de começar a apagar
        setIsDeleting(true);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => prev + 1); // Passa para a próxima frase
        setDelta(typingSpeed);
      } else if (!isDeleting && updatedText !== fullText) {
        // Pequena variação para parecer digitação humana
        setDelta(typingSpeed + Math.random() * 30); 
      }
    };

    const ticker = setTimeout(tick, delta);
    return () => clearTimeout(ticker);
  }, [displayedText, isDeleting, delta, textIndex, typingSpeed, deletingSpeed, texts]);

  // =========================================================
// 2. COMPONENTE PRINCIPAL (TERMINAL)
// =========================================================

  return (
    <div className="div-container">

        {/* Você pode escrever algo aqui ou deixar vazio apenas como forma geométrica */}
        <div className="backdrop-decoration">
        <CtaPanel /> 
      </div>


      <div className="notebook-container">
        <img 
          src={notebookImg} 
          alt="Notebook Frame" 
          className="notebook-frame" />

        {/* A tela preta (Posicionada com CSS Absolute) */}
        <div className="notebook-screen">

         <div 
            className="screen-background"
            style={{ backgroundImage: `url(${wallpaperImg})` }}>
          </div>
    
          <div className="terminal-window">  
            {/* Barra de título do Terminal */}
            <div className="terminal-header">
              <div className="window-buttons">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title">Faculdade Esup</span>
            </div>

            {/* Área de texto */}
            <div className="terminal-body">
              <div className="prompt-line">
                <span className="prompt-user">Esup@2026.1</span>
                <span className="typing-text">
                  {displayedText}
                  <span className="cursor">|</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;
