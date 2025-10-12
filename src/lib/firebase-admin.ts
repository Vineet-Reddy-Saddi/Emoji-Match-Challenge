import { initializeApp, getApps, cert, App } from 'firebase-admin/app';

let app: App;

if (!getApps().length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  if (serviceAccount) {
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // In a hosted environment (like Firebase App Hosting),
    // initializeApp() discovers credentials automatically.
    app = initializeApp();
  }
} else {
  app = getApps()[0];
}

export { app };
