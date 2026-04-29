import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-smart-notes-2d568.firebaseapp.com",
  projectId: "ai-smart-notes-2d568",
  storageBucket: "ai-smart-notes-2d568.firebasestorage.app",
  messagingSenderId: "297604932238",
  appId: "1:297604932238:web:16f17cbb747ade0f23dfdf",
  measurementId: "G-E3T2VCCYZ3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);