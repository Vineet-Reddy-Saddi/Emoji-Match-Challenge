
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCollection } from "@/firebase/firestore/use-collection";
import { useFirestore, useMemoFirebase } from "@/firebase/provider";
import { collection, query, orderBy, Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";

type Score = {
  id: string;
  playerName: string;
  moves: number;
  totalTime: number;
  submissionDate: Timestamp;
};

export function Leaderboard() {
  const firestore = useFirestore();

  const scoresQuery = useMemoFirebase(
    () =>
      firestore
        ? query(
            collection(firestore, "player_scores"),
            orderBy("moves", "asc"),
            orderBy("totalTime", "asc")
          )
        : null,
    [firestore]
  );

  const { data: scores, isLoading } = useCollection<Score>(scoresQuery);

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 md:mt-8">
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
            {scores && scores.length > 0 ? (
              scores.map((score, index) => (
                <TableRow key={score.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{score.playerName}</TableCell>
                  <TableCell>{score.moves}</TableCell>
                  <TableCell>{score.totalTime}</TableCell>
                  <TableCell className="text-right">
                    {format(score.submissionDate.toDate(), "PPP")}
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
