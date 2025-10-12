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
import { addScore } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

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
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !submitted) {
      const submit = async () => {
        setIsSubmitting(true);
        const result = await addScore(playerName, moves, time);
        setIsSubmitting(false);

        if (result.success) {
          setSubmitted(true);
          toast({
            title: "Score Submitted!",
            description: "Your score has been successfully recorded.",
          });
        } else {
          toast({
            title: "Submission Failed",
            description: result.error,
            variant: "destructive",
          });
        }
      };
      submit();
    }
  }, [isOpen, submitted, playerName, moves, time, toast]);

  const handlePlayAgain = () => {
    setSubmitted(false);
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

        {submitted && (
          <div className="text-center py-4">
             <p className="text-accent font-semibold">Your score has been recorded!</p>
          </div>
        )}
        
        <DialogFooter>
          <Button onClick={handlePlayAgain} variant="outline">
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
