import React, { useState } from 'react';
import { QuestionScreen } from './components/QuestionScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { PersonalityProvider } from './context/PersonalityContext';

function App() {
  const [screen, setScreen] = useState<'welcome' | 'questions' | 'results'>('welcome');
  
  return (
    <PersonalityProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {screen === 'welcome' && <WelcomeScreen onStart={() => setScreen('questions')} />}
          {screen === 'questions' && <QuestionScreen onComplete={() => setScreen('results')} />}
          {screen === 'results' && <ResultsScreen onRestart={() => setScreen('welcome')} />}
        </div>
      </div>
    </PersonalityProvider>
  );
}

export default App;