import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { structureItems } from '../data/site';
import { fadeUp, stagger } from '../motion';
import { ProgressiveImage } from './ProgressiveImage';

export function StructureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = structureItems[activeIndex];

  return (
    <section className="section structure-section" id="estrutura" aria-labelledby="structure-title">
      <div className="container">
        <motion.div
          className="section__header section__header--split"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUp}>
            <span className="eyebrow">Estrutura</span>
            <h2 id="structure-title">Campus pensado para estudo profundo e rotina simples.</h2>
          </motion.div>
          <motion.p className="section__aside" variants={fadeUp}>
            Cada ambiente foi tratado como parte da experiência do aluno: aprender, pausar, pesquisar e resolver.
          </motion.p>
        </motion.div>

        <div className="structure-layout">
          <div className="structure-tabs" aria-label="Ambientes do campus">
            {structureItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-pressed={activeIndex === index}
                className={activeIndex === index ? 'is-active' : ''}
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeItem.title}
              className="structure-panel"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <ProgressiveImage src={activeItem.image} alt={activeItem.title} className="structure-panel__image" />
              <div className="structure-panel__content">
                <h3>{activeItem.title}</h3>
                <p>{activeItem.description}</p>
                <a className="text-link" href="#ingresso">
                  Agendar visita <FiArrowRight aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
