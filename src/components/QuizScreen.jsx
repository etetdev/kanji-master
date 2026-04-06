import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMCQOptions } from '../utils/parser';
import { addScore } from '../utils/storage';
import * as wanakana from 'wanakana';

const cardVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: -80, opacity: 0, transition: { duration: 0.2 } },
};

export default function QuizScreen({ config, weeksData, onComplete, onBack }) {
  const { mode, weekName, cards, allCards } = config;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [mcqOptions, setMcqOptions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? ((currentIndex) / cards.length) * 100 : 0;

  // Generate MCQ options when card changes
  useEffect(() => {
    if (mode === 'mcq' && currentCard) {
      setMcqOptions(generateMCQOptions(currentCard, allCards, 4));
    }
  }, [currentIndex, mode, currentCard, allCards]);

  // Bind wanakana to input for romaji->kana conversion
  useEffect(() => {
    if (mode === 'input' && inputRef.current) {
      wanakana.bind(inputRef.current, { IMEMode: true });
      return () => {
        if (inputRef.current) {
          wanakana.unbind(inputRef.current);
        }
      };
    }
  }, [mode, currentIndex]);

  // Focus input on card change
  useEffect(() => {
    if (mode === 'input' && inputRef.current && !answered) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentIndex, mode, answered]);

  const checkAnswer = useCallback((userAnswer) => {
    if (!currentCard || answered) return;

    let correct = false;
    const card = currentCard;

    if (card.type === 'kanji') {
      // For kanji, accept explanation
      correct = normalize(userAnswer) === normalize(card.answer);
    } else {
      // For vocab, accept reading, romaji, or translation
      const acceptedAnswers = [card.answer, card.translation];
      if (card.romaji) acceptedAnswers.push(card.romaji);

      correct = acceptedAnswers.some(
        a => normalize(userAnswer) === normalize(a)
      );
    }

    setIsCorrect(correct);
    setAnswered(true);
    if (correct) setScore(prev => prev + 1);
  }, [currentCard, answered]);

  const handleMCQSelect = useCallback((option, index) => {
    if (answered) return;
    setSelectedOption(index);
    setIsCorrect(option.correct);
    setAnswered(true);
    if (option.correct) setScore(prev => prev + 1);
  }, [answered]);

  const handleInputSubmit = useCallback((e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    checkAnswer(inputValue.trim());
  }, [inputValue, checkAnswer]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= cards.length) {
      // Quiz complete
      const finalScore = score;
      addScore({
        week: weekName,
        mode,
        correct: finalScore,
        total: cards.length,
        date: new Date().toISOString(),
      });
      onComplete({
        weekName,
        mode,
        correct: finalScore,
        total: cards.length,
        cards,
      });
      return;
    }

    setCurrentIndex(prev => prev + 1);
    setAnswered(false);
    setIsCorrect(null);
    setSelectedOption(null);
    setInputValue('');
    setShowHint(false);
  }, [currentIndex, cards, score, weekName, mode, onComplete]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && answered) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, handleNext]);

  if (!currentCard) return null;

  const correctAnswer = currentCard.type === 'kanji'
    ? currentCard.answer
    : currentCard.translation;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col"
    >
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-(--color-text-secondary)">
            {weekName}
          </span>
          <span className="text-sm font-mono text-(--color-text-tertiary)">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        <div className="h-1.5 bg-(--color-bg-tertiary)/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-(--color-accent) to-(--color-mauve) rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-(--color-success)/10 text-(--color-success) px-4 py-1.5 rounded-full text-sm font-semibold">
          <span>✓</span>
          <span>{score}</span>
        </div>
        <div className="flex items-center gap-2 bg-(--color-error)/10 text-(--color-error) px-4 py-1.5 rounded-full text-sm font-semibold">
          <span>✗</span>
          <span>{answered ? (currentIndex + 1 - score - (isCorrect ? 1 : 0)) + (!isCorrect ? 1 : 0) : currentIndex - score}</span>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`
              w-full rounded-2xl border p-10 sm:p-14 transition-colors duration-300
              ${answered
                ? isCorrect
                  ? 'border-(--color-success)/50 bg-(--color-success)/5 glow-success'
                  : 'border-(--color-error)/50 bg-(--color-error)/5 glow-error'
                : 'border-(--color-border)/50 bg-(--color-bg-secondary)'
              }
            `}
          >
            {/* Card type badge */}
            <div className="flex items-center justify-between mb-6">
              <span className={`text-sm font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                currentCard.type === 'kanji'
                  ? 'bg-(--color-accent)/10 text-(--color-accent)'
                  : 'bg-(--color-mauve)/10 text-(--color-mauve)'
              }`}>
                {currentCard.type === 'kanji' ? 'Kanji' : 'Vocabulaire'}
              </span>
              {currentCard.type === 'vocab' && !answered && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-(--color-text-tertiary) hover:text-(--color-accent) transition-colors cursor-pointer"
                >
                  {showHint ? 'Masquer l\'indice' : '💡 Indice'}
                </button>
              )}
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <div className="kanji-display text-7xl sm:text-8xl lg:text-9xl mb-6 text-(--color-text-primary)">
                {currentCard.question}
              </div>
              {currentCard.type === 'kanji' && currentCard.hint && (
                <p className="text-base text-(--color-text-tertiary)">
                  {currentCard.hint}
                </p>
              )}
              {showHint && currentCard.type === 'vocab' && currentCard.answer && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl text-(--color-text-secondary) mt-3 font-medium"
                >
                  Lecture : {currentCard.answer}
                </motion.p>
              )}
            </div>

            {/* Answer section */}
            {mode === 'mcq' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mcqOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleMCQSelect(option, index)}
                    disabled={answered}
                    className={`
                      p-5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer text-base
                      ${answered
                        ? option.correct
                          ? 'border-(--color-success) bg-(--color-success)/10 text-(--color-success)'
                          : selectedOption === index
                            ? 'border-(--color-error) bg-(--color-error)/10 text-(--color-error)'
                            : 'border-(--color-border)/30 bg-(--color-bg-tertiary)/20 text-(--color-text-tertiary) opacity-50'
                        : 'border-(--color-border)/50 bg-(--color-bg-tertiary)/30 text-(--color-text-primary) hover:border-(--color-accent)/50 hover:bg-(--color-accent)/5'
                      }
                    `}
                  >
                    <span className="text-xs font-mono text-(--color-text-tertiary) mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option.text}
                  </motion.button>
                ))}
              </div>
            )}

            {mode === 'input' && (
              <form onSubmit={handleInputSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={answered}
                    placeholder={currentCard.type === 'kanji' ? 'Signification...' : 'Traduction...'}
                    className={`
                      w-full px-6 py-5 rounded-xl border-2 bg-(--color-bg-tertiary)/30 text-xl text-center
                      placeholder:text-(--color-text-tertiary)/50 transition-all duration-200
                      ${answered
                        ? isCorrect
                          ? 'border-(--color-success) text-(--color-success)'
                          : 'border-(--color-error) text-(--color-error)'
                        : 'border-(--color-border)/50 text-(--color-text-primary) focus:border-(--color-accent)'
                      }
                    `}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  {!answered && (
                    <p className="text-sm text-(--color-text-tertiary) text-center mt-3">
                      💡 Tapez en romaji — conversion automatique en kana
                    </p>
                  )}
                </div>
                {!answered && (
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-(--color-accent) text-white text-lg font-semibold hover:bg-(--color-accent-dim) transition-colors cursor-pointer"
                  >
                    Valider
                  </button>
                )}
              </form>
            )}

            {/* Answer reveal */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-6 border-t border-(--color-border)/30"
              >
                <div className="text-center">
                  <div className={`text-xl font-bold mb-2 ${isCorrect ? 'text-(--color-success)' : 'text-(--color-error)'}`}>
                    {isCorrect ? '正解！Correct !' : '残念… Incorrect'}
                  </div>
                  {!isCorrect && (
                    <div className="text-base text-(--color-text-secondary)">
                      Réponse correcte : <span className="font-semibold text-(--color-text-primary)">{correctAnswer}</span>
                    </div>
                  )}
                  {currentCard.type === 'vocab' && (
                    <div className="mt-3 text-sm text-(--color-text-tertiary) space-y-1">
                      <div>Lecture : <span className="text-(--color-text-secondary) text-base">{currentCard.answer}</span></div>
                      {currentCard.romaji && (
                        <div>Romaji : <span className="text-(--color-text-secondary)">{currentCard.romaji}</span></div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        {answered && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="mt-6 px-8 py-3 rounded-xl bg-(--color-accent) text-white font-semibold hover:bg-(--color-accent-dim) transition-colors shadow-lg shadow-(--color-accent)/20 cursor-pointer"
          >
            {currentIndex + 1 >= cards.length ? 'Voir les résultats' : 'Carte suivante →'}
          </motion.button>
        )}

        <p className="mt-4 text-xs text-(--color-text-tertiary)">
          Appuyez sur <kbd className="px-1.5 py-0.5 rounded bg-(--color-bg-tertiary) text-(--color-text-secondary) font-mono text-[10px]">Entrée</kbd> pour continuer
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Normalize string for comparison.
 */
function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ');
}
