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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addScore } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

type GameOverDialogProps = {
  isOpen: boolean;
  moves: number;
  time: number;
  onPlayAgain: () => void;
};

export function GameOverDialog({ isOpen, moves, time, onPlayAgain }: GameOverDialogProps) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to submit your score.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const result = await addScore(name, moves, time);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      toast({
        title: "Submission Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handlePlayAgain = () => {
    setName("");
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
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">Congratulations!</DialogTitle>
              <DialogDescription>
                You completed the game in {time} seconds with {moves} moves.
              </DialogDescription>
            </DialogHeader>
            <form id="score-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                  placeholder="Your Name"
                  required
                  aria-label="Your Name"
                />
              </div>
            </form>
            <DialogFooter>
              <Button type="submit" form="score-form" disabled={isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Submit Score
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-accent">Score Submitted!</DialogTitle>
              <DialogDescription>
                Your score has been successfully recorded. Well done!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handlePlayAgain} variant="outline">
                Play Again
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
