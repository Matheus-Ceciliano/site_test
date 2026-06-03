import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FaAward, FaBriefcase, FaLightbulb, FaUsers } from 'react-icons/fa';
import { differentiators } from '../data/site';
import { fadeUp, stagger } from '../motion';

const iconMap: Record<string, ReactNode> = {
  career: <FaBriefcase />,
  practice: <FaLightbulb />,
  network: <FaUsers />,
  quality: <FaAward />,
};

export function DifferentialsSection() {
  return (
    <section className="section differentials-section" id="diferenciais" aria-labelledby="differentials-title">
      <div className="container">
        <motion.div
          className="section__header"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            Diferenciais
          </motion.span>
          <motion.h2 id="differentials-title" variants={fadeUp}>
            Menos ruído. Mais suporte, prática e avanço.
          </motion.h2>
          <motion.p variants={fadeUp}>
            A experiência foi reorganizada para responder rápido o que importa: onde estudar, por que confiar e como começar.
          </motion.p>
        </motion.div>

        <motion.div
          className="feature-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {differentiators.map((item) => (
            <motion.article className="feature-card" key={item.title} variants={fadeUp}>
              <span className="feature-card__icon" aria-hidden="true">
                {iconMap[item.icon]}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
