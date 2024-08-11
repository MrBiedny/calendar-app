import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "calendar-app-56f2f",
  storageBucket: "calendar-app-56f2f.appspot.com",
  messagingSenderId: "481174563309",
  appId: "1:481174563309:web:c65b5573b448a7d19c5fe4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
