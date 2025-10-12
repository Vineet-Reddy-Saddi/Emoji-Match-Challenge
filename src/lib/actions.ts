"use server";

import { collection, addDoc, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { revalidatePath } from "next/cache";

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
    await addDoc(collection(db, "scores"), {
      name,
      moves,
      time,
      submittedAt: Timestamp.now(),
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    // This is a simplified error message. In a real app, you might want to log
    // the error and provide a more user-friendly message or error code.
    if (error instanceof Error && error.message.includes("Missing or insufficient permissions")) {
         return { success: false, error: "Database permission error. Please check your Firestore security rules." };
    }
    return { success: false, error: "Failed to submit score. Please check your Firebase setup and database rules." };
  }
}

export async function getScores(): Promise<Score[]> {
  try {
    const scoresCol = collection(db, "scores");
    // Order by moves (ascending), then by time (ascending)
    const q = query(scoresCol, orderBy("moves", "asc"), orderBy("time", "asc"));
    const scoreSnapshot = await getDocs(q);
    const scoresList = scoreSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        moves: data.moves,
        time: data.time,
        submittedAt: (data.submittedAt as Timestamp).toDate().toISOString(),
      };
    });
    return scoresList;
  } catch (error) {
    console.error("Error fetching scores: ", error);
    return [];
  }
}
