import { motion } from 'framer-motion';

export default function Header({ hasData, onClearData, currentView, onBack, theme, onToggleTheme, onShowProgress, onShowGrammar }) {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border)/50 backdrop-blur-xl bg-(--color-bg-primary)/80 safe-area-top">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-(--color-bg-tertiary)/50 text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors cursor-pointer"
              aria-label="Retour"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-(--color-accent) to-(--color-mauve) flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-(--color-accent)/20">
              漢
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-(--color-text-primary) leading-none">
                漢字マスター
              </h1>
              <p className="text-[10px] text-(--color-text-tertiary) tracking-widest uppercase font-medium">
                Kanji Master
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {currentView !== 'home' && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-medium text-(--color-accent) bg-(--color-accent)/10 px-3 py-1 rounded-full"
            >
              {currentView === 'quiz' ? 'Quiz' : currentView === 'results' ? 'Résultats' : currentView === 'grammar' ? 'Grammaire' : currentView === 'grammar-quiz' ? 'Quiz Grammaire' : 'Progression'}
            </motion.span>
          )}

          {/* Grammar button */}
          {(currentView === 'home' || currentView === 'progress') && (
            <button
              onClick={onShowGrammar}
              className="px-3 py-1.5 mr-2 bg-(--color-accent)/10 rounded-lg hover:bg-(--color-accent)/20 text-(--color-accent) transition-colors cursor-pointer font-bold tracking-tight text-sm flex items-center gap-1.5"
              title="S'entraîner à la grammaire"
            >
              <span>Grammaire</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
            </button>
          )}

          {/* Progress button */}
          {hasData && currentView === 'home' && (
            <button
              onClick={onShowProgress}
              className="p-2 rounded-lg hover:bg-(--color-bg-tertiary)/50 text-(--color-text-tertiary) hover:text-(--color-accent) transition-colors cursor-pointer"
              title="Voir la progression"
              aria-label="Progression"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg hover:bg-(--color-bg-tertiary)/50 text-(--color-text-tertiary) hover:text-(--color-accent) transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Reset */}
          {hasData && currentView === 'home' && (
            <button
              onClick={onClearData}
              className="text-xs text-(--color-text-tertiary) hover:text-(--color-error) transition-colors px-2 py-1.5 rounded-lg hover:bg-(--color-error)/10 cursor-pointer hidden sm:inline-flex"
              title="Supprimer toutes les données"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
