import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGic5Up6vQ0N1-u_c6tAkLS2Wb-wdC-so",
  authDomain: "calendar-app-56f2f.firebaseapp.com",
  projectId: "calendar-app-56f2f",
  storageBucket: "calendar-app-56f2f.appspot.com",
  messagingSenderId: "481174563309",
  appId: "1:481174563309:web:c65b5573b448a7d19c5fe4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
