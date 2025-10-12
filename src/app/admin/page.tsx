import { AdminPageClient } from "@/components/admin/admin-page-client";
import { Leaderboard } from "@/components/admin/leaderboard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  return (
    <main>
      <AdminPageClient>
        <Suspense fallback={<LeaderboardSkeleton />}>
          <Leaderboard />
        </Suspense>
      </AdminPageClient>
    </main>
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
  )
}
