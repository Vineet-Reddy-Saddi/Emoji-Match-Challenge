
import { AdminPageClient } from "@/components/admin/admin-page-client";
import { Leaderboard } from "@/components/admin/leaderboard";
import { FirebaseClientProvider } from "@/firebase/client-provider";

export default function AdminPage() {
  return (
    <FirebaseClientProvider>
      <main>
        <AdminPageClient>
          <Leaderboard />
        </AdminPageClient>
      </main>
    </FirebaseClientProvider>
  );
}
