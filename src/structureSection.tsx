
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
  const containerRef = useRef<HTMLElement>(null);

  const changeSection = useCallback((nextIndex: number) => {
    setIsScrolling(true);
    setActiveIndex(nextIndex);
    setTimeout(() => setIsScrolling(false), 430); // Tempo da transição
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
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

  return (
    <section ref={containerRef} className={styles.compactContainer}>
      {/* Título fixo que nunca some */}
      <h2 className={styles.mainTitle}>Nossa Estrutura</h2>

      <div className={styles.contentWrapper} key={activeIndex}>
        <div className={styles.imageSide}>
          <img src={dados[activeIndex].img} alt="" className={styles.displayImage} />
        </div>

        <div className={styles.textSide}>
          <h3 className={styles.itemTitle}>{dados[activeIndex].t}</h3>
          <p className={styles.itemDescription}>{dados[activeIndex].d}</p>
          <div className={styles.goldLine}></div>
        </div>
      </div>
    </section>
  );
};