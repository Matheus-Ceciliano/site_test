import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { FiArrowDownRight, FiArrowRight } from 'react-icons/fi';
import { assets } from '../data/site';
import { fadeUp, stagger } from '../motion';

type HeroProps = {
  onOpenLead: () => void;
};

export function Hero({ onOpenLead }: HeroProps) {
  const heroStyle = {
    '--hero-image': `url(${assets.hero})`,
  } as CSSProperties;

  return (
    <section className="hero" style={heroStyle} aria-labelledby="hero-title">
      <div className="hero__overlay" aria-hidden="true" />
      <motion.div className="container hero__inner" variants={stagger} initial="hidden" animate="visible">
        <motion.span className="eyebrow hero__eyebrow" variants={fadeUp}>
          Vestibular 2026.2
        </motion.span>
        <motion.h1 id="hero-title" variants={fadeUp}>
          Graduação prática para acelerar sua carreira.
        </motion.h1>
        <motion.p className="hero__lead" variants={fadeUp}>
          Cursos superiores da ESUP com acompanhamento próximo, estrutura real de aprendizado e foco em empregabilidade.
        </motion.p>
        <motion.div className="hero__actions" variants={fadeUp}>
          <button className="button button--light" type="button" onClick={onOpenLead}>
            Quero minha vaga <FiArrowRight aria-hidden="true" />
          </button>
          <a className="button button--glass" href="#cursos">
            Ver cursos <FiArrowDownRight aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
