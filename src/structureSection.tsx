
  import React, { useEffect, useState, useRef, useCallback } from 'react';
  import styles from './Menu.module.css';
  import banner1 from './assets/saladeaula.jpg';
  import banner2 from './assets/saladeaula2.jpg';
  import banner3 from './assets/laboratorio.jpg';
  import banner4 from './assets/biblioteca.jpg';
  import banner5 from './assets/sala.jpg';

  const dados = [
      { 
        t: "Salas de Aula Ativas", 
        d: "Projetadas para romper o modelo tradicional, nossas salas utilizam mobiliário flexível e tecnologia integrada que facilitam o debate e a resolução de problemas em grupo, colocando você no centro do aprendizado.", 
        img: banner1 
      },
      { 
        t: "Complexo Acadêmico", 
        d: "Um ecossistema completo que une áreas administrativas e de convivência, pensado para oferecer suporte integral à sua jornada, desde o atendimento estudantil até espaços de estudo dinâmico.", 
        img: banner2 
      },
      { 
        t: "Laboratórios de Inovação", 
        d: "Equipados com tecnologia de última geração, são espaços de experimentação prática onde teoria e mercado se encontram. Aqui, projetos de engenharia e TI ganham vida com hardware e software de ponta.", 
        img: banner3 
      },
      { 
        t: "Biblioteca Central", 
        d: "Mais do que um acervo, é um santuário de concentração. Oferece desde coleções físicas raras até bases de dados digitais globais, com cabines individuais e salas de estudo silencioso para máxima produtividade.", 
        img: banner4 
      },
      { 
        t: "Espaço de Convivência", 
        d: "O coração social do campus. Um ambiente integrado e moderno, ideal para pausas revigorantes, networking entre cursos e o descanso necessário para manter a mente criativa e produtiva durante o dia.", 
        img: banner5 
      }
    ];  
    

    export const StructureSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [inProp, setInProp] = useState(true); // Controla a animação
    const containerRef = useRef<HTMLElement>(null);

    const changeSection = useCallback((nextIndex: number) => {
    if (isScrolling) return;

    setIsScrolling(true);
    setInProp(false); // Inicia animação de saída (fadeOut)

    setTimeout(() => {
      setActiveIndex(nextIndex);
      setInProp(true); // Inicia animação de entrada (fadeIn)
      setIsScrolling(false);
    }, 400); // Tempo deve bater com o CSS transition
  }, [isScrolling,, activeIndex]);

    // Lógica de Clique (Para Mobile)
    const handleImageClick = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        const nextIndex = activeIndex < dados.length - 1 ? activeIndex + 1 : 0;
        changeSection(nextIndex);
      }
    };

    const handleWheel = useCallback((e: WheelEvent) => {
      // Só trava o scroll se NÃO for mobile
      if (window.innerWidth <= 768) return;

      if (isScrolling) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      if (e.deltaY > 0 && activeIndex < dados.length - 1) {
        if (e.cancelable) e.preventDefault();
        changeSection(activeIndex + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        if (e.cancelable) e.preventDefault();
        changeSection(activeIndex - 1);
      }
    }, [activeIndex, isScrolling, changeSection]);

    useEffect(() => {
      const section = containerRef.current;
      if (section) {
        section.addEventListener('wheel', handleWheel, { passive: false });
      }
      return () => section?.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);
    

    useEffect(() => {
    // Calcula qual é o próximo índice (se for o último, volta pro primeiro)
    const nextIndex = (activeIndex + 1) % dados.length;
    const nextImgUrl = dados[nextIndex].img;

    // Cria um objeto de imagem "invisível" para forçar o download pelo browser
    const img = new Image();
    img.src = nextImgUrl;
  }, [activeIndex]);

  



    return (
    <section ref={containerRef} className={styles.compactContainer}>
      <h2 className={styles.mainTitle}>Nossa Estrutura</h2>

      <div className={styles.contentWrapper}>
        <div 
          className={`${styles.slideContent} ${inProp ? styles.fadeIn : styles.fadeOut}`}
          onClick={handleImageClick}
        >
          <div className={styles.imageSide}>
            <img src={dados[activeIndex].img} alt="" className={styles.displayImage} />
            <span className={styles.mobileHint}>Toque para mudar</span>
          </div>

          <div className={styles.textSide}>
            <h3 className={styles.itemTitle}>{dados[activeIndex].t}</h3>
            <p className={styles.itemDescription}>{dados[activeIndex].d}</p>
            <div className={styles.goldLine}></div>
          </div>
        </div>
      </div>
    </section>
  );
  };