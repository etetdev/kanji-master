import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const GRAMMAR_THEMES = [
  { id: 'te-form', label: 'Forme en て', desc: 'Godan, Ichidan, et Irréguliers', icon: '📝' },
  { id: 'adj-i', label: 'Adjectifs い', desc: 'Présent, passé, négation, autres formes', icon: '✨' },
  { id: 'adj-na', label: 'Adjectifs な', desc: 'Présent, passé, négation, autres formes', icon: '🏷️' },
  { id: 'neutral', label: 'Style Neutre', desc: 'Conversion de la forme polie au neutre', icon: '🗣️' },
  { id: 'conjugaisons', label: 'Modèles de Conjugaison', desc: 'Potentiel, Factitif, Passif, Factitif-Passif', icon: '🔄' },
];

export default function GrammarScreen({ onStartGrammarQuiz }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8"
    >
      <motion.div variants={itemVariants} className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-(--color-text-primary) mb-2">
          Entraînement de Grammaire
        </h2>
        <p className="text-(--color-text-tertiary)">
          Sélectionnez un thème pour générer des exercices aléatoires.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {GRAMMAR_THEMES.map((theme) => (
          <motion.button
            key={theme.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStartGrammarQuiz(theme.id)}
            className="group relative overflow-hidden rounded-xl bg-(--color-bg-secondary) border border-(--color-border)/50 p-6 text-left hover:border-(--color-accent)/50 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-(--color-accent)/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex flex-col items-start gap-3 relative">
              <span className="text-3xl">{theme.icon}</span>
              <div>
                <h3 className="font-semibold text-lg text-(--color-text-primary) group-hover:text-(--color-accent-light) transition-colors">
                  {theme.label}
                </h3>
                <p className="text-xs text-(--color-text-tertiary) mt-1">
                  {theme.desc}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
