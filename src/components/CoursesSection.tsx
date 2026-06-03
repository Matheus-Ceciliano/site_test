import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FiArrowRight, FiClock, FiMapPin, FiMonitor } from 'react-icons/fi';
import { courses } from '../data/site';
import { fadeUp, stagger } from '../motion';
import { ProgressiveImage } from './ProgressiveImage';

type CourseFilter = 'Todos' | 'Presencial' | 'Semipresencial' | 'EAD';

const filters: CourseFilter[] = ['Todos', 'Presencial', 'Semipresencial', 'EAD'];

export function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState<CourseFilter>('Todos');

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'Todos') {
      return courses;
    }

    return courses.filter((course) => course.modality === activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (filter: CourseFilter) => {
    setActiveFilter((currentFilter) => {
      if (filter === 'Todos') {
        return 'Todos';
      }

      return currentFilter === filter ? 'Todos' : filter;
    });
  };

  return (
    <section className="section courses-section" id="cursos" aria-labelledby="courses-title">
      <div className="container">
        <motion.div
          className="section__header section__header--split"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUp}>
            <span className="eyebrow">Cursos</span>
            <h2 id="courses-title">Escolha uma graduação com direção desde o primeiro semestre.</h2>
          </motion.div>
          <motion.div className="section__aside" variants={fadeUp}>
            <p>
              Modalidades presenciais, semipresenciais e EAD organizadas para rotina, suporte e empregabilidade.
            </p>
            <div className="segmented" aria-label="Filtrar cursos por modalidade">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  className={activeFilter === filter ? 'is-active' : ''}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="course-grid"
            aria-live="polite"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            {filteredCourses.map((course, index) => (
              <motion.article
                className="course-card"
                key={course.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.035, ease: 'easeOut' }}
              >
                <ProgressiveImage
                  src={course.image}
                  alt={`Imagem do curso de ${course.title}`}
                  className="course-card__image"
                />
                <div className="course-card__body">
                  <div className="course-card__meta">
                    <span>
                      {course.modality === 'EAD' ? <FiMonitor aria-hidden="true" /> : <FiMapPin aria-hidden="true" />}
                      {course.modality}
                    </span>
                    <span>
                      <FiClock aria-hidden="true" />
                      {course.duration}
                    </span>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-card__footer">
                    <span>{course.highlight}</span>
                    <a href={course.href} aria-label={`Iniciar inscrição em ${course.title}`}>
                      Inscrever <FiArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
