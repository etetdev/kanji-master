import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { shuffle } from '../utils/parser';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function HomeScreen({ weeksData, weekNames, onFileImport, onStartQuiz }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedMode, setSelectedMode] = useState('mcq');
  const [cardFilter, setCardFilter] = useState('both');
  const fileInputRef = useRef(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(
      f => f.name.endsWith('.md') || f.name.endsWith('.txt')
    );
    if (files.length > 0) onFileImport(files);
  }, [onFileImport]);

  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) onFileImport(files);
    e.target.value = '';
  }, [onFileImport]);

  const filterCards = (cards) => {
    if (cardFilter === 'kanji') return cards.filter(c => c.type === 'kanji');
    if (cardFilter === 'vocab') return cards.filter(c => c.type === 'vocab');
    return cards;
  };

  const handleStartWeek = (weekName) => {
    const weekCards = weeksData[weekName]?.cards || [];
    const filtered = filterCards(weekCards);
    if (filtered.length === 0) return;
    onStartQuiz({
      mode: selectedMode,
      weekName,
      cards: shuffle(filtered),
      allCards: filtered,
    });
  };

  const handleStartRandom = () => {
    const allCards = Object.values(weeksData).flatMap(w => w.cards);
    const filtered = filterCards(allCards);
    if (filtered.length === 0) return;
    onStartQuiz({
      mode: selectedMode,
      weekName: 'Mode Aléatoire',
      cards: shuffle(filtered),
      allCards: filtered,
    });
  };

  const totalCards = Object.values(weeksData).reduce((sum, w) => sum + (w.cards?.length || 0), 0);
  const totalKanji = Object.values(weeksData).reduce((sum, w) => sum + (w.kanjis?.length || 0), 0);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8"
    >
      {/* Import zone */}
      <motion.div variants={itemVariants}>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer
            transition-all duration-300 group
            ${isDragOver
              ? 'border-(--color-accent) bg-(--color-accent)/10 scale-[1.01]'
              : 'border-(--color-border) hover:border-(--color-accent)/50 hover:bg-(--color-bg-secondary)/50'
            }
          `}
        >
          {/* Background gradient decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-(--color-accent)/5 via-transparent to-(--color-mauve)/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-(--color-bg-tertiary)/50 flex items-center justify-center text-(--color-accent) group-hover:scale-110 transition-transform duration-300">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-(--color-text-primary) font-semibold text-lg mb-1">
              {isDragOver ? 'Déposez vos fichiers ici' : 'Importer vos fichiers de révision'}
            </p>
            <p className="text-(--color-text-tertiary) text-sm">
              Glissez-déposez vos fichiers <code className="text-(--color-accent) bg-(--color-accent)/10 px-1.5 py-0.5 rounded text-xs font-mono">.md</code> ou cliquez pour parcourir
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.txt"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* Stats bar */}
      {weekNames.length > 0 && (
        <motion.div variants={itemVariants} className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: 'Semaines', value: weekNames.length, icon: '📅' },
            { label: 'Kanji', value: totalKanji, icon: '漢' },
            { label: 'Cartes', value: totalCards, icon: '🃏' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-(--color-bg-secondary) rounded-xl p-4 border border-(--color-border)/50 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-(--color-text-primary)">{stat.value}</div>
              <div className="text-xs text-(--color-text-tertiary) font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Mode selector */}
      {weekNames.length > 0 && (
        <motion.div variants={itemVariants} className="mt-8">
          <h2 className="text-sm font-semibold text-(--color-text-tertiary) uppercase tracking-wider mb-3">
            Mode de Quiz
          </h2>
          <div className="flex gap-2">
            {[
              { id: 'mcq', label: 'QCM', desc: 'Choix multiples', icon: '◉' },
              { id: 'input', label: 'Saisie', desc: 'Écrire la réponse', icon: '⌨' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`
                  flex-1 p-4 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer
                  ${selectedMode === mode.id
                    ? 'border-(--color-accent) bg-(--color-accent)/10 shadow-lg shadow-(--color-accent)/10'
                    : 'border-(--color-border)/50 bg-(--color-bg-secondary) hover:border-(--color-border-light)'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mode.icon}</span>
                  <div>
                    <div className={`font-semibold ${selectedMode === mode.id ? 'text-(--color-accent-light)' : 'text-(--color-text-primary)'}`}>
                      {mode.label}
                    </div>
                    <div className="text-xs text-(--color-text-tertiary)">{mode.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Card type filter */}
      {weekNames.length > 0 && (
        <motion.div variants={itemVariants} className="mt-6">
          <h2 className="text-sm font-semibold text-(--color-text-tertiary) uppercase tracking-wider mb-3">
            Type de Cartes
          </h2>
          <div className="flex gap-2">
            {[
              { id: 'both', label: 'Les deux', icon: '📚' },
              { id: 'kanji', label: 'Kanji uniquement', icon: '漢' },
              { id: 'vocab', label: 'Vocabulaire uniquement', icon: '💬' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setCardFilter(filter.id)}
                className={`
                  flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer
                  ${cardFilter === filter.id
                    ? 'border-(--color-accent) bg-(--color-accent)/10 shadow-lg shadow-(--color-accent)/10'
                    : 'border-(--color-border)/50 bg-(--color-bg-secondary) hover:border-(--color-border-light)'
                  }
                `}
              >
                <span className="text-lg mr-2">{filter.icon}</span>
                <span className={`text-sm font-semibold ${cardFilter === filter.id ? 'text-(--color-accent-light)' : 'text-(--color-text-primary)'}`}>
                  {filter.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Week selection */}
      {weekNames.length > 0 && (
        <motion.div variants={itemVariants} className="mt-8">
          <h2 className="text-sm font-semibold text-(--color-text-tertiary) uppercase tracking-wider mb-3">
            Sélectionner une semaine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {weekNames.map((weekName, index) => {
              const week = weeksData[weekName];
              const kanjiCount = week.kanjis?.length || 0;
              const vocabCount = week.cards?.filter(c => c.type === 'vocab').length || 0;
              return (
                <motion.button
                  key={weekName}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartWeek(weekName)}
                  className="group relative overflow-hidden rounded-xl bg-(--color-bg-secondary) border border-(--color-border)/50 p-5 text-left hover:border-(--color-accent)/50 transition-all duration-300 cursor-pointer"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-(--color-accent)/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-(--color-accent) bg-(--color-accent)/10 px-2 py-0.5 rounded-full">
                          #{index + 1}
                        </span>
                        <h3 className="font-semibold text-(--color-text-primary) group-hover:text-(--color-accent-light) transition-colors">
                          {weekName}
                        </h3>
                      </div>
                      <div className="flex gap-3 text-xs text-(--color-text-tertiary)">
                        <span>{kanjiCount} kanji</span>
                        <span>•</span>
                        <span>{vocabCount} mots</span>
                      </div>
                    </div>

                    {/* Preview of first few kanji */}
                    <div className="flex gap-1">
                      {week.kanjis?.slice(0, 3).map((k, i) => (
                        <span
                          key={i}
                          className="w-10 h-10 rounded-lg bg-(--color-bg-tertiary)/50 flex items-center justify-center text-lg font-bold text-(--color-text-secondary) kanji-display"
                        >
                          {k.kanji}
                        </span>
                      ))}
                      {kanjiCount > 3 && (
                        <span className="w-10 h-10 rounded-lg bg-(--color-bg-tertiary)/30 flex items-center justify-center text-xs text-(--color-text-tertiary)">
                          +{kanjiCount - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Random mode button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleStartRandom}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-(--color-accent) to-(--color-mauve) p-5 text-center text-white font-semibold shadow-lg shadow-(--color-accent)/20 hover:shadow-xl hover:shadow-(--color-accent)/30 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
              <span>Mode Aléatoire</span>
              <span className="text-white/60 text-sm">— {totalCards} cartes</span>
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Empty state */}
      {weekNames.length === 0 && (
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="text-6xl mb-4 kanji-display opacity-20">漢字</div>
          <p className="text-(--color-text-tertiary) text-lg">
            Importez vos fichiers de révision pour commencer
          </p>
          <p className="text-(--color-text-tertiary)/60 text-sm mt-2">
            Les fichiers Markdown (.md) avec la structure Kanji/Vocabulaire sont supportés
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
