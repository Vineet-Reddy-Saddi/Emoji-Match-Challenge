
"use server";

import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { app } from "./firebase-admin";
import { revalidatePath } from "next/cache";

const db = getFirestore(app);

export async function addScore(
  playerName: string,
  moves: number,
  totalTime: number
) {
  try {
    if (!playerName || playerName.trim().length === 0) {
      return { success: false, error: "Player name cannot be empty." };
    }

    const scoresCollection = db.collection("player_scores");
    await scoresCollection.add({
      playerName,
      moves,
      totalTime,
      submissionDate: Timestamp.now(),
    });

    revalidatePath("/admin"); // Revalidate the admin page to show new score
    return { success: true };
  } catch (error) {
    console.error("Error adding score:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: errorMessage };
  }
}
