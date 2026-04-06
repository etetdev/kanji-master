import { motion } from 'framer-motion';
import { loadScores } from '../utils/storage';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function ResultsScreen({ results, onBack, onRetry }) {
  const { weekName, mode, correct, total } = results;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const scores = loadScores();

  const getGrade = () => {
    if (percentage >= 90) return { text: '素晴らしい！', sub: 'Excellent !', emoji: '🎌', color: 'text-(--color-success)' };
    if (percentage >= 70) return { text: 'よくできました', sub: 'Bien joué !', emoji: '✨', color: 'text-(--color-accent-light)' };
    if (percentage >= 50) return { text: 'まあまあ', sub: 'Pas mal', emoji: '📖', color: 'text-(--color-warning)' };
    return { text: 'がんばって！', sub: 'Courage !', emoji: '💪', color: 'text-(--color-error)' };
  };

  const grade = getGrade();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8"
    >
      {/* Score circle */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="text-5xl mb-3">{grade.emoji}</div>
        <div className="relative w-40 h-40 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="var(--color-bg-tertiary)"
              strokeWidth="8"
              opacity="0.3"
            />
            <motion.circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke={percentage >= 70 ? 'var(--color-success)' : percentage >= 50 ? 'var(--color-warning)' : 'var(--color-error)'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - percentage / 100) }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="text-4xl font-bold text-(--color-text-primary)"
            >
              {percentage}%
            </motion.span>
            <span className="text-xs text-(--color-text-tertiary)">{correct}/{total}</span>
          </div>
        </div>

        <h2 className={`text-2xl font-bold kanji-display ${grade.color}`}>
          {grade.text}
        </h2>
        <p className="text-(--color-text-secondary) text-sm mt-1">{grade.sub}</p>
      </motion.div>

      {/* Details */}
      <motion.div variants={itemVariants} className="bg-(--color-bg-secondary) rounded-2xl border border-(--color-border)/50 p-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-(--color-text-tertiary) mb-1">Semaine</div>
            <div className="font-semibold text-(--color-text-primary)">{weekName}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-(--color-text-tertiary) mb-1">Mode</div>
            <div className="font-semibold text-(--color-text-primary)">
              {mode === 'mcq' ? 'QCM' : 'Saisie'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-(--color-text-tertiary) mb-1">Correctes</div>
            <div className="font-semibold text-(--color-success)">{correct}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-(--color-text-tertiary) mb-1">Erreurs</div>
            <div className="font-semibold text-(--color-error)">{total - correct}</div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} className="flex gap-3 mb-8">
        <button
          onClick={onRetry}
          className="flex-1 py-3 rounded-xl bg-(--color-accent) text-white font-semibold hover:bg-(--color-accent-dim) transition-colors shadow-lg shadow-(--color-accent)/20 cursor-pointer"
        >
          🔄 Recommencer
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-(--color-bg-secondary) text-(--color-text-primary) font-semibold border border-(--color-border)/50 hover:bg-(--color-bg-tertiary)/50 transition-colors cursor-pointer"
        >
          🏠 Accueil
        </button>
      </motion.div>

      {/* Score history */}
      {scores.length > 0 && (
        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-semibold text-(--color-text-tertiary) uppercase tracking-wider mb-3">
            Historique récent
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {scores.slice(0, 10).map((entry, index) => {
              const pct = Math.round((entry.correct / entry.total) * 100);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-(--color-bg-secondary) rounded-lg border border-(--color-border)/30 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                      entry.mode === 'mcq' ? 'bg-(--color-accent)/15 text-(--color-accent)' : 'bg-(--color-mauve)/15 text-(--color-mauve)'
                    }`}>
                      {entry.mode === 'mcq' ? 'QCM' : 'Saisie'}
                    </span>
                    <span className="text-sm text-(--color-text-secondary) truncate max-w-[150px]">
                      {entry.week}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${
                      pct >= 70 ? 'text-(--color-success)' : pct >= 50 ? 'text-(--color-warning)' : 'text-(--color-error)'
                    }`}>
                      {pct}%
                    </span>
                    <span className="text-xs text-(--color-text-tertiary)">
                      {entry.correct}/{entry.total}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
