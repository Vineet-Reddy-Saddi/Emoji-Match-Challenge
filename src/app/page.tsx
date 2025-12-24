'use client';

import { useState } from 'react';
import { GameGrid } from '@/components/game-grid';
import { PlayerNameDialog } from '@/components/player-name-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type GameState = 'welcome' | 'practice' | 'main';

export default function Home() {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>('welcome');

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setGameState('practice');
  };

  const handlePracticeComplete = () => {
    // This function will be called from the GameGrid when the practice is over.
    // For now, we'll just provide a button to move to the main game.
  };

  const startMainGame = () => {
    setGameState('main');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'welcome':
        return <PlayerNameDialog onNameSubmit={handleNameSubmit} />;
      case 'practice':
        return (
          <GameGrid
            key="practice"
            playerName={playerName!}
            mode="practice"
            onPracticeComplete={handlePracticeComplete}
            onStartMainGame={startMainGame}
          />
        );
      case 'main':
        return <GameGrid key="main" playerName={playerName!} mode="main" />;
      default:
        return <PlayerNameDialog onNameSubmit={handleNameSubmit} />;
    }
  };

  return (
      <main>
        {renderGameState()}
      </main>
  );
}
