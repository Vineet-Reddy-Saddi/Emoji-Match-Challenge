import { initializeApp, getApps, cert } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

let app;
if (!getApps().length) {
  app = initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : undefined,
  });
} else {
  app = getApps()[0];
}

export { app };
