import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './TerminalPortfolio.css'; 
import notebookImg from './assets/notebook.png';
import wallpaperImg from './assets/wallpaper.png';

interface TerminalPortfolioProps {
  typingSpeed?: number;
  deletingSpeed?: number;
}

// =========================================================
// COMPONENTE CTA (PAINEL DE BOLSA)
// =========================================================
const CtaPanel = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const tempoEmMs = (1 * 60 + 20) * 60 * 1000;
    const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

    useEffect(() => {
      const TARGET_DATE = new Date().getTime() + tempoEmMs;
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
    }, [tempoEmMs]);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
      <div className="cta-content">
        <h3 className="cta-title">Últimos dias para sua Bolsa!</h3>
        <p className="cta-subtitle">A condição especial encerra em:</p>
        <div className="cta-timer-container">
          <div className="cta-timer-box"><span className="cta-timer-number">{formatNumber(timeLeft.dias)}</span><span className="cta-timer-label">Dias</span></div>
          <div className="cta-timer-box"><span className="cta-timer-number">{formatNumber(timeLeft.horas)}</span><span className="cta-timer-label">Hrs</span></div>
          <div className="cta-timer-box"><span className="cta-timer-number">{formatNumber(timeLeft.minutos)}</span><span className="cta-timer-label">Min</span></div>
          <div className="cta-timer-box"><span className="cta-timer-number">{formatNumber(timeLeft.segundos)}</span><span className="cta-timer-label">Seg</span></div>
        </div>
        <button className="cta-button" onClick={onOpenModal}>
          Garantir minha vaga <FaArrowRight size={12} />
        </button>
      </div>
    );
};

// =========================================================
// COMPONENTE PRINCIPAL (TERMINAL PORTFOLIO)
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

  // ESTADOS DO TERMINAL
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(typingSpeed);

  // ESTADOS DO MODAL E FORMULÁRIO
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnviado, setIsEnviado] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '' });

  // 1. Efeito de Escrita do Terminal
  useEffect(() => {
    const tick = () => {
      const i = textIndex % texts.length;
      const fullText = texts[i];
      const updatedText = isDeleting 
        ? fullText.substring(0, displayedText.length - 1) 
        : fullText.substring(0, displayedText.length + 1);

      setDisplayedText(updatedText);
      if (isDeleting) setDelta(deletingSpeed);
      if (!isDeleting && updatedText === fullText) { setIsDeleting(true); setDelta(2000); }
      else if (isDeleting && updatedText === '') { setIsDeleting(false); setTextIndex(prev => prev + 1); setDelta(typingSpeed); }
    };
    const ticker = setTimeout(tick, delta);
    return () => clearTimeout(ticker);
  }, [displayedText, isDeleting, delta, textIndex, typingSpeed, deletingSpeed, texts]);

  // 2. Efeito para Travar Scroll (Aba Transparente)
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      // Se o modal estiver aberto, impede o scroll no toque (Safari)
      if (isModalOpen) {
        e.preventDefault();
      }
    };

    if (isModalOpen) {
      // Trava para Desktop e outros mobiles
      document.body.style.overflow = 'hidden';
      
      // Trava específica para Safari Mobile (bloqueia o evento de arrastar)
      window.addEventListener('touchmove', preventDefault, { passive: false });
    } else {
      document.body.style.overflow = 'unset';
      window.removeEventListener('touchmove', preventDefault);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('touchmove', preventDefault);
    };
  }, [isModalOpen]);

  // FUNÇÕES DE MANIPULAÇÃO
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setIsEnviado(false); // Reseta o estado ao fechar
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost/api_esup/salvar_contato.php', //URL do servidor local//
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === "sucesso") {
        setIsEnviado(true);
      } else {
        alert("Erro ao salvar: " + result.detalhes);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor local.");
    }
  };

  return (
    <div className="div-container">
      {/* MODAL / ABA DE INSCRIÇÃO */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={toggleModal}>&times;</span>
            
            {!isEnviado ? (
              <div className="modal-form-placeholder">
                <h2>Inscrição 2026.2</h2>
                <p>Você está prestes a transformar sua carreira na Esup.</p>
                <input 
                    name="nome" 
                    type="text" 
                    placeholder="Seu Nome" 
                    className="modal-input" 
                    onChange={handleChange} 
                />
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Seu E-mail" 
                    className="modal-input" 
                    onChange={handleChange} 
                />
                <input 
                    name="telefone" 
                    type="tel" 
                    placeholder="Telefone/WhatsApp" 
                    className="modal-input" 
                    onChange={handleChange} 
                />
                <button className="cta-button" onClick={handleSubmit} style={{ width: '100%', marginTop: '10px' }}>
                  Confirmar Interesse
                </button>
              </div>
            ) : (
              <div className="modal-success-screen" style={{ padding: '20px' }}>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>✅</div>
                <h2>Inscrição realizada com sucesso!</h2>
                <p>Em breve nossa equipe entrará em contato com você.</p>
                <button 
                  className="cta-button" 
                  style={{ marginTop: '20px', padding: '10px 40px' }}
                  onClick={toggleModal}
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DECORAÇÃO DE FUNDO E CTA */}
      <div className="backdrop-decoration">
        <CtaPanel onOpenModal={toggleModal} /> 
      </div>

      {/* ESTRUTURA DO NOTEBOOK */}
      <div className="notebook-container">
        <img src={notebookImg} alt="Notebook" className="notebook-frame" />
        <div className="notebook-screen">
          <div className="screen-background" style={{ backgroundImage: `url(${wallpaperImg})` }}></div>
          <div className="terminal-window">  
            <div className="terminal-header">
              <div className="window-buttons">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title">Faculdade Esup</span>
            </div>
            <div className="terminal-body">
              <div className="prompt-line">
                <span className="prompt-user">Esup@2026.2</span>
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