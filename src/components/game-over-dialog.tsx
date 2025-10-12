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
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

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
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (isOpen && !submitted && firestore) {
      const submit = () => {
        setIsSubmitting(true);
        setSubmissionError(null);
        const scoreData = {
            playerName,
            moves,
            totalTime: time,
            submissionDate: serverTimestamp(),
        };
        const scoresCollection = collection(firestore, "scores");
        
        addDoc(scoresCollection, scoreData)
          .then(() => {
            setSubmitted(true);
          })
          .catch((serverError: any) => {
            const permissionError = new FirestorePermissionError({
              path: scoresCollection.path,
              operation: 'create',
              requestResourceData: scoreData,
            });
            errorEmitter.emit('permission-error', permissionError);
            setSubmissionError("Could not submit your score. See console for details.");
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      };
      submit();
    }
  }, [isOpen, submitted, playerName, moves, time, firestore]);

  useEffect(() => {
    // Reset submission status when the dialog is closed or reopened
    if (!isOpen) {
      setSubmitted(false);
      setSubmissionError(null);
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

        {!isSubmitting && submissionError && (
          <div className="text-center py-4">
             <p className="text-destructive font-semibold">{submissionError}</p>
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
