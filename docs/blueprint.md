# **App Name**: Emoji Match Challenge

## Core Features:

- Emoji Card Grid: Generate a 6x6 grid of cards with matching emoji pairs.
- Move Counter: Tracks the number of moves a player takes to complete the game.
- Game Timer: Records the time in seconds a player takes to complete the game, starting on the first card flip.
- Score Submission: Automatically submits the player's name, time, and move count to Firestore upon completion.
- Data Storage: Store the scores into a Firestore database.
- Admin Leaderboard: Password-protected (/admin) leaderboard to view player scores (name, time, moves, submission date). Password is: Lucky@2008
- Confirmation Message: Display a confirmation message after submitting a player score.

## Style Guidelines:

- Primary color: Soft blue (#A0D2EB) to evoke a calm, focused atmosphere suitable for a memory game.
- Background color: Very light blue (#F0F8FF) to provide a clean, unobtrusive backdrop.
- Accent color: Light orange (#FFB347) to highlight interactive elements such as the confirmation message or admin leaderboard button.
- Font pairing: 'Poppins' (sans-serif) for headlines, and 'PT Sans' (sans-serif) for body text, to create a balance of modern clarity and readability.
- Code font: 'Source Code Pro' for password entry in admin.
- Use colorful and clear emoji icons for card faces.
- Maintain a clean and spacious layout for the 6x6 grid to reduce visual clutter.
- Use subtle reveal animations when flipping cards to provide visual feedback.