import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { FiCheckCircle, FiSend, FiX } from 'react-icons/fi';

type LeadDialogProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  course: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  course: '',
};

export function LeadDialog({ open, onClose }: LeadDialogProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 120);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setStatus('idle');
        onClose();
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setStatus('success');
    setForm(initialForm);
  };

  const handleClose = () => {
    setStatus('idle');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialog-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onMouseDown={handleClose}
        >
          <motion.div
            ref={dialogRef}
            className="lead-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-dialog-title"
            aria-describedby="lead-dialog-description"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="icon-button lead-dialog__close" type="button" aria-label="Fechar" onClick={handleClose}>
              <FiX size={20} />
            </button>

            {status === 'success' ? (
              <div className="lead-success" aria-live="polite">
                <FiCheckCircle size={48} aria-hidden="true" />
                <h2 id="lead-dialog-title">Interesse registrado</h2>
                <p id="lead-dialog-description">
                  Recebemos seus dados. A equipe da ESUP entrará em contato para orientar os próximos passos.
                </p>
                <button className="button button--primary" type="button" onClick={handleClose}>
                  Concluir
                </button>
              </div>
            ) : (
              <form className="lead-form" onSubmit={handleSubmit}>
                <span className="eyebrow">Inscrição 2026.2</span>
                <h2 id="lead-dialog-title">Receba orientação para sua matrícula</h2>
                <p id="lead-dialog-description">
                  Preencha seus dados e fale com a equipe de ingresso sem sair da página.
                </p>

                <label className="field">
                  <span>Nome completo</span>
                  <input
                    ref={firstFieldRef}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>E-mail</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>WhatsApp</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>Curso de interesse</span>
                  <select
                    name="course"
                    value={form.course}
                    onChange={(event) => updateField('course', event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option>Direito</option>
                    <option>Administração</option>
                    <option>Ciências Contábeis</option>
                    <option>Pedagogia Semipresencial</option>
                    <option>Sistemas de Informação</option>
                    <option>Processos Gerenciais</option>
                  </select>
                </label>

                <button
                  className={`button button--primary button--full ${status === 'sending' ? 'is-loading' : ''}`}
                  type="submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? <span className="button__spinner" aria-hidden="true" /> : <FiSend />}
                  {status === 'sending' ? 'Enviando' : 'Enviar interesse'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
