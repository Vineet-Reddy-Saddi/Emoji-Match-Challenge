
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Score = {
  id: string;
  playerName: string;
  moves: number;
  totalTime: number;
  submissionDate: Date;
};

interface ScoreContextType {
  scores: Score[];
  addScore: (score: Score) => void;
  isLoading: boolean;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addScore = (score: Score) => {
    setScores(prevScores => [...prevScores, score]);
  };

  return (
    <ScoreContext.Provider value={{ scores, addScore, isLoading }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScores = () => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScores must be used within a ScoreProvider');
  }
  return context;
};
