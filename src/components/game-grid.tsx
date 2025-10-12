"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '@/components/card';
import { GameOverDialog } from '@/components/game-over-dialog';
import { EMOJIS } from '@/lib/emojis';
import { Timer, Repeat2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

type CardState = {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type GameGridProps = {
  playerName: string;
};

export function GameGrid({ playerName }: GameGridProps) {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = useCallback(() => {
    const gameEmojis = EMOJIS.slice(0, 10);
    const shuffledEmojis = shuffleArray([...gameEmojis, ...gameEmojis]);
    setCards(
      shuffledEmojis.map((emoji) => ({ emoji, isFlipped: false, isMatched: false }))
    );
    setFlippedIndices([]);
    setMoves(0);
    setTime(0);
    setGameStarted(false);
    setGameOver(false);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    const newFlippedIndices = [...flippedIndices, index];
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsChecking(true);
      setMoves((prevMoves) => prevMoves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match found
        setTimeout(() => {
            const matchedCards = newCards.map((card, i) =>
              i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
            );
            setCards(matchedCards);
            setFlippedIndices([]);
            setIsChecking(false);
            if (matchedCards.every((c) => c.isMatched)) {
              setGameOver(true);
              setGameStarted(false);
            }
        }, 500); // Wait for flip animation to finish
      } else {
        // Mismatch
        setTimeout(() => {
          const resetCards = newCards.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
          );
          setCards(resetCards);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };
  
  const allCards = useMemo(() => cards.map((card, index) => (
    <Card
      key={index}
      emoji={card.emoji}
      isFlipped={card.isFlipped}
      isMatched={card.isMatched}
      onClick={() => handleCardClick(index)}
      isDisabled={isChecking || card.isMatched}
    />
  )), [cards, isChecking, handleCardClick]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
       <div className="w-full max-w-xl text-center mb-6">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">Emoji Match Challenge</h1>
        <p className="text-muted-foreground">
          Hello, <span className="font-bold text-accent">{playerName}</span>! Click a card to start the timer.
        </p>
      </div>

      <div className="flex items-center justify-center gap-8 mb-6 text-lg p-3 bg-card rounded-lg shadow-sm">
        <div className="flex items-center gap-2" title="Moves">
          <Repeat2 className="w-5 h-5 text-accent" />
          <span className="font-bold">{moves}</span>
        </div>
        <div className="flex items-center gap-2" title="Time">
          <Timer className="w-5 h-5 text-accent" />
          <span className="font-bold">{time}s</span>
        </div>
      </div>

      <div className="grid grid-cols-5 grid-rows-4 gap-2 md:gap-3 p-4 rounded-lg bg-background/50 shadow-inner w-full max-w-xl">
        {allCards}
      </div>

      <div className="absolute bottom-4 right-4">
        <Button asChild variant="link">
            <Link href="/admin">
                Admin Leaderboard
            </Link>
        </Button>
      </div>

      <GameOverDialog
        isOpen={gameOver}
        moves={moves}
        time={time}
        playerName={playerName}
        onPlayAgain={initializeGame}
      />
    </div>
  );
}
