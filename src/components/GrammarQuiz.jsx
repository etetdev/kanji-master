import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGrammarQuiz } from '../data/grammarDb';
import { FuriganaText } from '../utils/furigana';
import * as wanakana from 'wanakana';

export default function GrammarQuiz({ theme, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  // idle -> en cours de réponse
  // success -> bonne réponse trouvée
  // revealed -> a abandonné et vu la réponse
  const [status, setStatus] = useState('idle'); 
  const [isError, setIsError] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [isFinished, setIsFinished] = useState(false);
  
  const inputRef = useRef(null);

  useEffect(() => {
    setQuestions(generateGrammarQuiz(theme, 15)); // Génère 15 questions
  }, [theme]);

  // Focus input
  useEffect(() => {
    if (status === 'idle' && inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  }, [currentIndex, status, isFinished]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleInputChange = (e) => {
    setIsError(false); // Retirer l'erreur rouge dès qu'on tape
    const converted = wanakana.toKana(e.target.value, { IMEMode: true });
    setInputValue(converted);
  };

  const checkAnswer = () => {
    if (!inputValue.trim()) return;

    const cInput = inputValue.trim();
    const isCorrect = cInput === currentQ.expected || cInput === currentQ.expected.replace(/\s/g, '');

    if (isCorrect) {
      setStatus('success');
      if (!hasRevealed) {
        setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      }
    } else {
      // Mauvaise réponse
      setIsError(true);
      setMistakes(m => m + 1);
      
      // Remove the shake class and re-add it to restart animation if needed
      setTimeout(() => setIsError(false), 500); 
    }
  };

  const revealAnswer = () => {
    setStatus('revealed');
    setHasRevealed(true);
    setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (status === 'idle') {
        checkAnswer();
      } else {
        handleNext();
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
      setStatus('idle');
      setIsError(false);
      setHasRevealed(false);
      setMistakes(0);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Terminé !</h2>
        <div className="flex gap-8 mb-8">
          <div className="text-(--color-success)">
            <div className="text-4xl font-bold">{stats.correct}</div>
            <div className="text-sm">Trouvés</div>
          </div>
          <div className="text-(--color-error)">
            <div className="text-4xl font-bold">{stats.wrong}</div>
            <div className="text-sm">Révélés</div>
          </div>
        </div>
        <button
          onClick={onBack}
          className="bg-(--color-bg-tertiary) hover:bg-(--color-bg-secondary) px-6 py-3 rounded-xl transition-colors cursor-pointer"
        >
          Retour au menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
      {/* Quiz Header Info */}
      <div className="flex justify-between items-center mb-8 text-sm font-medium text-(--color-text-tertiary)">
        <span>Question {currentIndex + 1} / {questions.length}</span>
        <div className="flex items-center gap-4">
          <span className="text-(--color-success)">{stats.correct} ✓</span>
          <span className="text-(--color-error)">{stats.wrong} ✗</span>
        </div>
      </div>

      {/* Main Card */}
      <motion.div
        key={`q-${currentIndex}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-(--color-bg-secondary) rounded-2xl p-8 shadow-sm border border-(--color-border)/50 text-center relative"
      >
        <p className="text-(--color-text-tertiary) mb-6">{currentQ.instruction}</p>

        {currentQ.instructionLabel && (
          <div className="inline-block bg-(--color-accent)/10 text-(--color-accent) px-3 py-1 rounded-full text-sm font-medium mb-4">
            {currentQ.instructionLabel}
          </div>
        )}

        <div className="text-5xl font-bold text-(--color-text-primary) mb-2 kanji-display">
          <FuriganaText text={currentQ.questionFull} />
        </div>
        {currentQ.fr && (
          <div className="text-sm text-(--color-text-tertiary) mb-8 font-medium italic">
            "{currentQ.fr}"
          </div>
        )}

        <motion.div 
          className="relative max-w-sm mx-auto"
          animate={{ x: isError ? [-10, 10, -10, 10, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={status !== 'idle'}
            placeholder="Tapez la réponse en hiragana..."
            className={`
              w-full px-4 py-4 rounded-xl text-center text-xl font-bold border-2 transition-colors
              focus:outline-none
              ${status === 'idle' ? 'bg-(--color-bg-tertiary) border-(--color-border) focus:border-(--color-accent)' : ''}
              ${status === 'success' ? 'border-(--color-success) bg-(--color-success)/10 text-(--color-success)' : ''}
              ${status === 'revealed' ? 'border-(--color-error) bg-(--color-error)/10 text-(--color-error)' : ''}
              ${isError ? 'border-[var(--color-error)] bg-[var(--color-error)]/10 text-[var(--color-error)]' : ''}
            `}
          />
          <div className="text-xs text-(--color-text-tertiary) mt-2 opacity-60 flex items-center justify-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Saisie en romaji convertie automatiquement
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
           {status === 'idle' && mistakes > 0 && (
             <motion.div
               key="reveal"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="mt-6"
             >
               <p className="text-(--color-error) mb-3 text-sm font-semibold">Réponse incorrecte, réessayez !</p>
               <button
                 onClick={revealAnswer}
                 className="text-sm font-medium text-(--color-text-tertiary) hover:text-(--color-error) transition-colors underline underline-offset-4 cursor-pointer"
               >
                 Je donne ma langue au chat (Révéler la réponse)
               </button>
             </motion.div>
           )}

          {status !== 'idle' && (
            <motion.div
              key="continue"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6"
            >
              {status === 'revealed' && (
                <div className="mb-4 text-(--color-error)">
                  La bonne réponse était :{' '}
                  <span className="font-bold text-xl kanji-display ml-2">
                     <FuriganaText text={currentQ.answerDisplay} />
                  </span>
                </div>
              )}
              {status === 'success' && (
                <div className="mb-4 text-(--color-success) font-bold flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Bonne réponse !
                </div>
              )}
              <button
                onClick={handleNext}
                autoFocus
                className={`
                  w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all cursor-pointer
                  ${status === 'success' 
                    ? 'bg-(--color-success) hover:bg-(--color-success-dim) shadow-(--color-success)/20' 
                    : 'bg-(--color-error) hover:bg-(--color-error-dim) shadow-(--color-error)/20'}
                `}
              >
                Continuer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
