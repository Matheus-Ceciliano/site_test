import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { testimonials } from '../data/site';
import { fadeUp, stagger } from '../motion';

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

export function Testimonials() {
  return (
    <section className="section testimonials-section" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="container">
        <motion.div
          className="section__header"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            Depoimentos
          </motion.span>
          <motion.h2 id="testimonials-title" variants={fadeUp}>
            Histórias que reforçam confiança.
          </motion.h2>
          <motion.p variants={fadeUp}>
            Prova social objetiva, com foco no impacto acadêmico e profissional percebido pelos egressos.
          </motion.p>
        </motion.div>

        <motion.div
          className="testimonial-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {testimonials.map((item) => (
            <motion.article className="testimonial-card" key={item.name} variants={fadeUp}>
              <div className="testimonial-card__top">
                <span className="testimonial-card__avatar" aria-hidden="true">
                  {getInitials(item.name)}
                </span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.course}</p>
                </div>
              </div>
              <blockquote>{item.quote}</blockquote>
              <button type="button" className="icon-button" aria-label={`Ver depoimento completo de ${item.name}`}>
                <FiPlus size={18} />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
