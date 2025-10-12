import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getScores, type Score } from "@/lib/actions";
import { format } from "date-fns";

export async function Leaderboard() {
  const scores: Score[] = await getScores();

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
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <TableRow key={score.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{score.name}</TableCell>
                  <TableCell>{score.moves}</TableCell>
                  <TableCell>{score.time}</TableCell>
                  <TableCell className="text-right">
                    {format(new Date(score.submittedAt), "PPP")}
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
