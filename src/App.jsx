import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { parseMarkdown, generateCards } from './utils/parser';
import { saveWeeksData, loadWeeksData, clearAllData } from './utils/storage';
import { useTheme } from './hooks/useTheme';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ProgressScreen from './components/ProgressScreen';
import Header from './components/Header';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [weeksData, setWeeksData] = useState(() => loadWeeksData() || {});
  const [currentView, setCurrentView] = useState('home');
  const [quizConfig, setQuizConfig] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const handleFileImport = useCallback(async (files) => {
    const newData = { ...weeksData };

    for (const file of files) {
      const text = await file.text();
      const fileName = file.name.replace(/\.(md|txt)$/i, '').replace(/[-_]/g, ' ');
      const parsed = parseMarkdown(text, fileName);
      if (parsed.weekName) {
        const cards = generateCards(parsed);
        newData[parsed.weekName] = {
          weekName: parsed.weekName,
          kanjis: parsed.kanjis,
          cards,
        };
      }
    }

    setWeeksData(newData);
    saveWeeksData(newData);
  }, [weeksData]);

  const handleStartQuiz = useCallback((config) => {
    setQuizConfig(config);
    setCurrentView('quiz');
  }, []);

  const handleQuizComplete = useCallback((results) => {
    setQuizResults(results);
    setCurrentView('results');
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentView('home');
    setQuizConfig(null);
    setQuizResults(null);
  }, []);

  const handleClearData = useCallback(() => {
    clearAllData();
    setWeeksData({});
  }, []);

  const weekNames = Object.keys(weeksData);

  return (
    <div className="min-h-screen flex flex-col bg-(--color-bg-primary)">
      <Header
        hasData={weekNames.length > 0}
        onClearData={handleClearData}
        currentView={currentView}
        onBack={currentView !== 'home' ? handleBackToHome : undefined}
        theme={theme}
        onToggleTheme={toggleTheme}
        onShowProgress={() => setCurrentView('progress')}
      />

      <main className="flex-1 flex flex-col safe-area-bottom">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomeScreen
              key="home"
              weeksData={weeksData}
              weekNames={weekNames}
              onFileImport={handleFileImport}
              onStartQuiz={handleStartQuiz}
            />
          )}
          {currentView === 'quiz' && quizConfig && (
            <QuizScreen
              key="quiz"
              config={quizConfig}
              weeksData={weeksData}
              onComplete={handleQuizComplete}
              onBack={handleBackToHome}
            />
          )}
          {currentView === 'results' && quizResults && (
            <ResultsScreen
              key="results"
              results={quizResults}
              onBack={handleBackToHome}
              onRetry={() => {
                setCurrentView('quiz');
                setQuizResults(null);
              }}
            />
          )}
          {currentView === 'progress' && (
            <ProgressScreen
              key="progress"
              weeksData={weeksData}
              onBack={handleBackToHome}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
