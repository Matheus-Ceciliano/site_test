import { FiMoon, FiSun } from 'react-icons/fi';

export type ThemeMode = 'light' | 'dark';

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      aria-pressed={isDark}
      onClick={onToggle}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">
          {isDark ? <FiMoon size={14} /> : <FiSun size={14} />}
        </span>
      </span>
    </button>
  );
}
