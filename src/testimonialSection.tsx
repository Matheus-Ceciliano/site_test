import React from 'react';
import styles from './Menu.module.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "WEVERTON AYRES FERNANDES DA SILVA",
    role: "Ex-Aluno de Direito da Faculdade ESUP",
    text: "A minha experiência com a ESUP foi uma das melhores! A minha aproximação com os professores me deu tudo que eu tenho hoje, a partir disso tive ótimas...",
    image: "URL_DA_FOTO_1"
  },
  {
    id: 2,
    name: "GILDA SILVA ALVES",
    role: "Ex-Aluna do curso de Graduação em Administração na ESUP",
    text: "Tive a oportunidade de estudar na ESUP no curso de Administração com excelentes professores, toda administração nos deu um suporte muito...",
    image: "URL_DA_FOTO_2"
  },
  {
    id: 3,
    name: "FERNANDO RODRIGUES FERREIRA",
    role: "Ex-Aluno Graduação em Ciências Contábeis na ESUP",
    text: "Gostaria de agradecer a ESUP por todo apoio que tive tanto no ensino quanto na secretária, coordenação... pois foram 4 anos com professores que davam aulas...",
    image: "URL_DA_FOTO_3"
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.mainTitle}>Depoimentos</h2>
      
      <div className={styles.grid}>
        {testimonialsData.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.name} className={styles.avatar} />
            </div>
            
            <h3 className={styles.name}>{item.name}</h3>
            <p className={styles.role}>{item.role}</p>
            
            <div className={styles.quoteIcon}>“</div>
            
            <p className={styles.feedback}>{item.text}</p>
            
            <button className={styles.plusButton}>+</button>
          </div>
        ))}
      </div>
    </section>
  );
};