
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/custom-dialog";
import React from 'react';
import { useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";


type PlayerNameDialogProps = {
  onNameSubmit: (name: string) => void;
};

export function PlayerNameDialog({ onNameSubmit }: PlayerNameDialogProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [auth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    onNameSubmit(name.trim());
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Welcome to Tanisi's Memory Test!</DialogTitle>
          <DialogDescription>
            The goal is to match all the pairs of cards. Click a card to flip it over, then click another to see if they match.
            <br/><br/>
            This game is for experimental purposes, so nothing will count for or against you based on your score... enjoy!
            <br/><br/>
            Please enter your name to start the game.
          </DialogDescription>
        </DialogHeader>
        <form id="player-name-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className="col-span-3"
              placeholder="Player Name"
              required
              aria-label="Player Name"
            />
          </div>
          {error && <p className="text-red-500 text-sm col-span-4 text-center">{error}</p>}
        </form>
        <DialogFooter>
          <Button type="submit" form="player-name-form" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Start Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
