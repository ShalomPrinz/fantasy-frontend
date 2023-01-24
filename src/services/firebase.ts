import { initializeApp } from "@firebase/app";
import {
  connectAuthEmulator,
  initializeAuth,
  inMemoryPersistence,
} from "firebase/auth";

// Firestore online database
/*
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);
*/

// Emulator
// /*
const testApp = initializeApp({
  apiKey: "testkey",
  projectId: "demo-test-fantasy",
});

const auth = initializeAuth(testApp);
auth.setPersistence(inMemoryPersistence);
connectAuthEmulator(auth, "http://localhost:8110");
// */

export { auth };
