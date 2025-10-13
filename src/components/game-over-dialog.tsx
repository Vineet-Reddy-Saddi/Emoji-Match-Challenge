"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useScores } from "@/context/score-context";

type GameOverDialogProps = {
  isOpen: boolean;
  moves: number;
  time: number;
  playerName: string;
  onPlayAgain: () => void;
};

export function GameOverDialog({ isOpen, moves, time, playerName, onPlayAgain }: GameOverDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addScore } = useScores();

  useEffect(() => {
    if (isOpen && !submitted) {
      const submit = async () => {
        setIsSubmitting(true);
        const scoreData = {
            id: new Date().toISOString(),
            playerName,
            moves,
            totalTime: time,
            submissionDate: new Date(),
        };
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        addScore(scoreData);
        setSubmitted(true);
        setIsSubmitting(false);
      };
      submit();
    }
  }, [isOpen, submitted, playerName, moves, time, addScore]);

  useEffect(() => {
    // Reset submission status when the dialog is closed or reopened
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  const handlePlayAgain = () => {
    onPlayAgain();
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handlePlayAgain();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Congratulations, {playerName}!</DialogTitle>
          <DialogDescription>
            You completed the game in {time} seconds with {moves} moves.
          </DialogDescription>
        </DialogHeader>
        
        {isSubmitting && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-accent" />
            <p>Submitting your score...</p>
          </div>
        )}

        {!isSubmitting && submitted && (
          <div className="text-center py-4">
             <p className="text-green-600 font-semibold">Your score has been recorded!</p>
          </div>
        )}
        
        <DialogFooter>
          <Button onClick={handlePlayAgain} variant="outline" className="w-full">
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
