'use client';

import { useState } from 'react';
import { GameGrid } from '@/components/game-grid';
import { PlayerNameDialog } from '@/components/player-name-dialog';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function Home() {
  const [playerName, setPlayerName] = useState<string | null>(null);

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
  };

  return (
    <FirebaseClientProvider>
      <main>
        {playerName ? (
          <GameGrid playerName={playerName} />
        ) : (
          <PlayerNameDialog onNameSubmit={handleNameSubmit} />
        )}
      </main>
    </FirebaseClientProvider>
  );
}
