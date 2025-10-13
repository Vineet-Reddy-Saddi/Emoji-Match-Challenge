"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { useScores } from '@/context/score-context';
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { Home } from "lucide-react";


export function Leaderboard() {
  const { scores, isLoading } = useScores();

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  const sortedScores = scores.sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }
    return a.totalTime - b.totalTime;
  });

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 md:mt-8 p-4">
       <div className="absolute top-4 left-4">
          <Button asChild variant="ghost">
            <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Game
            </Link>
          </Button>
      </div>
      <h2 className="font-headline text-3xl mb-4 text-center">Leaderboard</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Moves</TableHead>
              <TableHead>Time (s)</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedScores && sortedScores.length > 0 ? (
              sortedScores.map((score, index) => (
                <TableRow key={score.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{score.playerName}</TableCell>
                  <TableCell>{score.moves}</TableCell>
                  <TableCell>{score.totalTime}</TableCell>
                  <TableCell className="text-right">
                    {score.submissionDate ? format(score.submissionDate, "PPP") : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No scores submitted yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="font-headline text-3xl mb-4 text-center">Leaderboard</h2>
      <div className="border rounded-lg p-4 space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
