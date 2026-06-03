import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiClipboard, FiMessageCircle } from 'react-icons/fi';
import { admissionSteps } from '../data/site';
import { fadeUp, stagger } from '../motion';

type AdmissionsSectionProps = {
  onOpenLead: () => void;
};

const stepIcons = [FiClipboard, FiCalendar, FiMessageCircle];

export function AdmissionsSection({ onOpenLead }: AdmissionsSectionProps) {
  return (
    <section className="section admissions-section" id="ingresso" aria-labelledby="admissions-title">
      <div className="container admissions-section__inner">
        <motion.div
          className="section__header"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            Como ingressar
          </motion.span>
          <motion.h2 id="admissions-title" variants={fadeUp}>
            Três passos para sair da dúvida e começar.
          </motion.h2>
          <motion.p variants={fadeUp}>
            O fluxo reduz incerteza: curso certo, atendimento rápido e matrícula acompanhada.
          </motion.p>
        </motion.div>

        <motion.div
          className="steps-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {admissionSteps.map((step, index) => {
            const Icon = stepIcons[index];

            return (
              <motion.article className="step-card" key={step.title} variants={fadeUp}>
                <span className="step-card__number">{String(index + 1).padStart(2, '0')}</span>
                <Icon aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          className="admissions-cta"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <strong>Atendimento de ingresso</strong>
            <span>Receba orientação sobre curso, bolsa, documentos e próxima turma.</span>
          </div>
          <button className="button button--light" type="button" onClick={onOpenLead}>
            Falar com consultor <FiArrowRight aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
