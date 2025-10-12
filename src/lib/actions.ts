"use server";

import { collection, addDoc, getDocs, orderBy, query, Timestamp } from "firebase/firestore/lite";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "./firebase-admin"; // Using admin SDK for server-side operations
import { revalidatePath } from "next/cache";

const db = getFirestore(app);

export type Score = {
  id: string;
  name: string;
  moves: number;
  time: number;
  submittedAt: string; // ISO string
};

export async function addScore(
  name: string,
  moves: number,
  time: number
) {
  try {
    if (!name || name.trim().length === 0) {
      throw new Error("Player name cannot be empty.");
    }
    await addDoc(collection(db, "player_scores"), {
      playerName: name,
      totalTime: time,
      moves: moves,
      submissionDate: Timestamp.now(),
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    if (error instanceof Error) {
        if(error.message.includes("Missing or insufficient permissions")) {
            return { success: false, error: "Database permission error. Please check your Firestore security rules." };
        }
        return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to submit score due to an unknown error." };
  }
}

export async function getScores(): Promise<Score[]> {
  try {
    const scoresCol = collection(db, "player_scores");
    // Order by moves (ascending), then by time (ascending)
    const q = query(scoresCol, orderBy("moves", "asc"), orderBy("totalTime", "asc"));
    const scoreSnapshot = await getDocs(q);
    const scoresList = scoreSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.playerName,
        moves: data.moves,
        time: data.totalTime,
        submittedAt: (data.submissionDate as Timestamp).toDate().toISOString(),
      };
    });
    return scoresList;
  } catch (error) {
    console.error("Error fetching scores: ", error);
    // In a real app, you might want to handle this more gracefully
    // and not expose the raw error message.
     if (error instanceof Error && error.message.includes("Missing or insufficient permissions")) {
        throw new Error("You do not have permission to view the leaderboard. Please check Firestore rules.");
    }
    throw new Error("Failed to fetch scores.");
  }
}
