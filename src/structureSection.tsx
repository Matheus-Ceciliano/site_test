
import React, { useEffect, useRef, useState } from 'react';

import styles from './Menu.module.css';
import banner1 from './assets/saladeaula.jpg'
import banner2 from './assets/saladeaula2.jpg'
import banner3 from './assets/laboratorio.jpg'
import banner4 from './assets/biblioteca.jpg'
import banner5 from './assets/sala.jpg'


interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img 
          src={imageUrl} 
          alt={title}
          className={styles.image} 
          // Se quiser zoom na imagem, faça no CSS (explicado abaixo)
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.goldLine}></div>
      </div>
    </div>
  );
};

 
export const StructureSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.1}
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
    return () => observer.disconnect();
    }, []);



  const dados = [
    { t: "Salas de Aula Ativas", d: "Espaços modernos projetados para o aprendizado colaborativo.", img: banner1 },
    { t: "Complexo Acadêmico", d: "Infraestrutura completa para o suporte ao aluno.", img: banner2 },
    { t: "Laboratórios de Inovação", d: "Tecnologia de ponta para práticas de engenharia e TI.", img: banner3 },
    { t: "Biblioteca Central", d: "Vasto acervo e áreas de estudo silencioso para pesquisa.", img: banner4 },
    { t: "Espaço de Convivência", d: "Ambientes integrados para networking e descanso.", img: banner5 }
  ];



    return (
    <section 
    ref={sectionRef}
    className={`${styles.waterfallContainer} ${isVisible ? styles.visible : ''}`}
    >
      {dados.map((item, i) => (
        <Card 
          key={i} 
          title={item.t} 
          description={item.d} 
          imageUrl={item.img} 
        />
      ))}
    </section>
  );
};
