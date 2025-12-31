import React, { useState, useEffect } from 'react';
import './TerminalPortfolio.css'; 
import notebookImg from './assets/notebook.png';
import wallpaperImg from './assets/wallpaper.png';

interface TerminalPortfolioProps {
  typingSpeed?: number;
  deletingSpeed?: number;
}

const TerminalPortfolio: React.FC<TerminalPortfolioProps> = ({
  typingSpeed = 100,
  deletingSpeed = 50,
}) => {
  
  // FRASES QUE VÃO APARECER NA TELA
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

  return (
    <div className="div-container">

        <div className="backdrop-decoration">
        {/* Você pode escrever algo aqui ou deixar vazio apenas como forma geométrica */}
        <h3 className="backdrop-text">Matriculas abertas</h3> 
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