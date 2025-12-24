
"use client";

import { useState } from "react";
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


type PlayerNameDialogProps = {
  onNameSubmit: (name: string) => void;
};

export function PlayerNameDialog({ onNameSubmit }: PlayerNameDialogProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

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
          <DialogTitle className="font-headline text-2xl">Welcome to the Memory Experiment</DialogTitle>
          <DialogDescription asChild>
            <div className="text-left">
                <div className="font-bold mt-2">Objective:</div>
                <p>Find all matching pairs of cards.</p>
                
                <div className="font-bold mt-4">How to Play:</div>
                <ul className="list-disc list-inside">
                <li>Click two cards at a time.</li>
                <li>If the cards match, they will turn pink.</li>
                <li>If they do not match, they will be turned face down again.</li>
                </ul>

                <div className="font-bold mt-4">Important Rules:</div>
                <ul className="list-disc list-inside">
                    <li><span className="font-semibold">Focus on Turns:</span> We are measuring how many moves you take to finish, not how fast you click. Take your time to memorize the cards.</li>
                    <li><span className="font-semibold">No Notes:</span> Please do not use external aids or write anything down.</li>
                    <li><span className="font-semibold">Practice:</span> We will start with a brief practice round so you can get used to the game controls.</li>
                </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form id="player-name-form" onSubmit={handleSubmit} className="grid gap-4 pt-4">
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
            Start Practice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
