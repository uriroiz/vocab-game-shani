import React, { useState } from 'react';
import GamePortal from './GamePortal.jsx';
import VocabGame from './VocabGame.jsx';
import VocabGameTyping from './VocabGameTyping.jsx';
import { IrregularVerbChoiceGame, IrregularVerbDragGame } from './IrregularVerbGame.jsx';
import { Home } from 'lucide-react';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectGame = (gameType) => {
    setSelectedGame(gameType);
  };

  const handleBackToHome = () => {
    setSelectedGame(null);
  };

  // Home button component for irregular verb games
  const HomeButton = () => (
    <button
      onClick={handleBackToHome}
      className="fixed top-4 left-4 z-50 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
    >
      <Home className="w-5 h-5" />
      <span className="hidden sm:inline">Back to Menu</span>
    </button>
  );

  if (!selectedGame) {
    return <GamePortal onSelectGame={handleSelectGame} />;
  }

  if (selectedGame === 'multiple-choice') {
    return <VocabGame onBackToHome={handleBackToHome} />;
  }

  if (selectedGame === 'typing') {
    return <VocabGameTyping onBackToHome={handleBackToHome} />;
  }

  if (selectedGame === 'verb-choice') {
    return (
      <>
        <HomeButton />
        <IrregularVerbChoiceGame
          optionsCount={4}
          initialBatchSize={10}
          onFinish={(results) => {
            console.log('Verb Choice Game finished:', results);
          }}
        />
      </>
    );
  }

  if (selectedGame === 'verb-drag') {
    return (
      <>
        <HomeButton />
        <IrregularVerbDragGame
          roundSize={3}
          distractorPairs={1}
          onFinish={(results) => {
            console.log('Verb Drag Game finished:', results);
          }}
        />
      </>
    );
  }

  return <GamePortal onSelectGame={handleSelectGame} />;
}

export default App;