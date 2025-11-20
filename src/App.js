import React, { useState } from 'react';
import GamePortal from './GamePortal.jsx';
import VocabGame from './VocabGame.jsx';
import VocabGameTyping from './VocabGameTyping.jsx';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectGame = (gameType) => {
    setSelectedGame(gameType);
  };

  const handleBackToHome = () => {
    setSelectedGame(null);
  };

  if (!selectedGame) {
    return <GamePortal onSelectGame={handleSelectGame} />;
  }

  if (selectedGame === 'multiple-choice') {
    return <VocabGame onBackToHome={handleBackToHome} />;
  }

  if (selectedGame === 'typing') {
    return <VocabGameTyping onBackToHome={handleBackToHome} />;
  }

  return <GamePortal onSelectGame={handleSelectGame} />;
}

export default App;