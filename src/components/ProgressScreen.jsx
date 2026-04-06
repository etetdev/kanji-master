import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { loadScores } from '../utils/storage';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function ProgressScreen({ weeksData, onBack }) {
  const scores = useMemo(() => loadScores(), []);

  const stats = useMemo(() => {
    if (scores.length === 0) return null;
    const totalCorrect = scores.reduce((s, e) => s + e.correct, 0);
    const totalQuestions = scores.reduce((s, e) => s + e.total, 0);
    const avgPercent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const bestScore = scores.reduce((best, e) => {
      const pct = Math.round((e.correct / e.total) * 100);
      return pct > best ? pct : best;
    }, 0);
    const weekStats = {};
    for (const entry of scores) {
      if (!weekStats[entry.week]) {
        weekStats[entry.week] = { attempts: 0, totalCorrect: 0, totalQ: 0 };
      }
      weekStats[entry.week].attempts++;
      weekStats[entry.week].totalCorrect += entry.correct;
      weekStats[entry.week].totalQ += entry.total;
    }
    return { totalCorrect, totalQuestions, avgPercent, bestScore, sessionsCount: scores.length, weekStats };
  }, [scores]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 pb-12"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-(--color-text-primary) mb-6">
        📊 Progression
      </motion.h2>

      {!stats ? (
        <motion.div variants={itemVariants} className="text-center py-16">
          <div className="text-5xl mb-4 opacity-30">📈</div>
          <p className="text-(--color-text-tertiary) text-lg">Aucune session terminée</p>
          <p className="text-(--color-text-tertiary)/60 text-sm mt-1">Complétez un quiz pour voir votre progression</p>
        </motion.div>
      ) : (
        <>
          {/* Global stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Sessions', value: stats.sessionsCount, color: 'text-(--color-accent)' },
              { label: 'Moyenne', value: `${stats.avgPercent}%`, color: stats.avgPercent >= 70 ? 'text-(--color-success)' : 'text-(--color-warning)' },
              { label: 'Meilleur', value: `${stats.bestScore}%`, color: 'text-(--color-success)' },
              { label: 'Réponses', value: `${stats.totalCorrect}/${stats.totalQuestions}`, color: 'text-(--color-text-primary)' },
            ].map(s => (
              <div key={s.label} className="bg-(--color-bg-secondary) rounded-xl p-4 border border-(--color-border)/40 text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-(--color-text-tertiary) mt-1 font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Per-week breakdown */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-(--color-text-tertiary) uppercase tracking-wider mb-3">Par semaine</h3>
            <div className="space-y-3">
              {Object.entries(stats.weekStats).map(([week, ws]) => {
                const pct = Math.round((ws.totalCorrect / ws.totalQ) * 100);
                return (
                  <div key={week} className="bg-(--color-bg-secondary) rounded-xl border border-(--color-border)/40 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-(--color-text-primary) text-sm truncate max-w-[200px]">{week}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-(--color-text-tertiary)">{ws.attempts} session{ws.attempts > 1 ? 's' : ''}</span>
                        <span className={`text-sm font-bold ${pct >= 70 ? 'text-(--color-success)' : pct >= 50 ? 'text-(--color-warning)' : 'text-(--color-error)'}`}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-(--color-bg-tertiary) rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${pct >= 70 ? 'bg-(--color-success)' : pct >= 50 ? 'bg-(--color-warning)' : 'bg-(--color-error)'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent sessions */}
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="text-sm font-semibold text-(--color-text-tertiary) uppercase tracking-wider mb-3">Historique</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {scores.map((entry, i) => {
                const pct = Math.round((entry.correct / entry.total) * 100);
                const date = new Date(entry.date);
                const dateStr = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={i} className="flex items-center justify-between bg-(--color-bg-secondary) rounded-lg border border-(--color-border)/30 px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full shrink-0 ${
                        entry.mode === 'mcq' ? 'bg-(--color-accent)/15 text-(--color-accent)' : 'bg-(--color-mauve)/15 text-(--color-mauve)'
                      }`}>
                        {entry.mode === 'mcq' ? 'QCM' : 'Saisie'}
                      </span>
                      <span className="text-sm text-(--color-text-secondary) truncate">{entry.week}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <span className="text-xs text-(--color-text-tertiary) hidden sm:inline">{dateStr}</span>
                      <span className={`text-sm font-bold ${pct >= 70 ? 'text-(--color-success)' : pct >= 50 ? 'text-(--color-warning)' : 'text-(--color-error)'}`}>
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
