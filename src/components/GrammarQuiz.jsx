import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGrammarQuiz } from '../data/grammarDb';
import { FuriganaText } from '../utils/furigana';
import * as wanakana from 'wanakana';

export default function GrammarQuiz({ theme, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('idle'); // idle | correct | incorrect
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [isFinished, setIsFinished] = useState(false);
  
  const inputRef = useRef(null);

  useEffect(() => {
    setQuestions(generateGrammarQuiz(theme, 10)); // Generate 10 questions per quiz
  }, [theme]);

  // Focus input on mount and question change
  useEffect(() => {
    if (status === 'idle' && inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  }, [currentIndex, status, isFinished]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleInputChange = (e) => {
    // Autoconvert romaji to kana (IMEs work too because wanakana ignores already converted kana)
    const converted = wanakana.toKana(e.target.value, { IMEMode: true });
    setInputValue(converted);
  };

  const checkAnswer = () => {
    if (!inputValue.trim()) return;

    // Clean up input spaces or stuff
    const cInput = inputValue.trim();
    // For grammar we expect exact kana matches, we let the user make errors
    
    // In some cases the expected answer might have kanji (like noun+desu etc. wait, expected is mostly kana/kanji from answerBase)
    // Actually expected from grammarDb is purely string (mostly hiragana + maybe some kanji if base had kanji not modified, wait, in grammarDb logic we used answerBase which strips kanjis mostly OR keeps them. Let's check: answerBase is purely kana! Ah, wait, for Irregular Suru `べんきょうする`, it is kana. For Adjectives `たかい` it is kana. So answerBase was pure kana. That means we expect purely kana input!)
    // Wait, some inputs might be typed in Kanji by native keyboards!
    // So if the user types Kanji, it could fail if expected is Kana. We should probably allow either, but since we prompt with wanakana.toKana (which produces hiragana), mostly they will do hiragana.
    // If they use IME, they might convert to Kanji. To be safe, let's compare both: if input equals expected OR if input in kana equals expected.
    // Actually, wanakana doesn't convert Kanji back to Kana without API. We will instruct them to type in Hiragana.
    
    if (cInput === currentQ.expected || cInput === currentQ.expected.replace(/\s/g, '')) {
      setStatus('correct');
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStatus('incorrect');
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }
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
            <div className="text-sm">Corrects</div>
          </div>
          <div className="text-(--color-error)">
            <div className="text-4xl font-bold">{stats.wrong}</div>
            <div className="text-sm">Erreurs</div>
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

        <div className="text-5xl font-bold text-(--color-text-primary) mb-8 kanji-display">
          <FuriganaText text={currentQ.questionFull} />
        </div>

        <div className="relative max-w-sm mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={status !== 'idle'}
            placeholder="Tapez la réponse en hiragana..."
            className={`
              w-full px-4 py-4 rounded-xl text-center text-xl font-bold bg-(--color-bg-tertiary) border-2 transition-colors
              focus:outline-none
              ${status === 'idle' ? 'border-(--color-border) focus:border-(--color-accent)' : ''}
              ${status === 'correct' ? 'border-(--color-success) bg-(--color-success)/10 text-(--color-success)' : ''}
              ${status === 'incorrect' ? 'border-(--color-error) bg-(--color-error)/10 text-(--color-error)' : ''}
            `}
          />
          <div className="text-xs text-(--color-text-tertiary) mt-2 opacity-60 flex items-center justify-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Saisie en romaji convertie automatiquement en hiragana
          </div>
        </div>

        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6"
            >
              {status === 'incorrect' && (
                <div className="mb-4 text-(--color-error)">
                  La bonne réponse était :{' '}
                  <span className="font-bold text-xl kanji-display ml-2">
                    <FuriganaText text={currentQ.answerDisplay} />
                  </span>
                </div>
              )}
              <button
                onClick={handleNext}
                autoFocus
                className={`
                  w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all
                  ${status === 'correct' 
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
