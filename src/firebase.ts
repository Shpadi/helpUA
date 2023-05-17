// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtRTEea_YRH9jF7ys8atEGKu0whk_ppn0",
  authDomain: "helpua-9777f.firebaseapp.com",
  projectId: "helpua-9777f",
  storageBucket: "helpua-9777f.appspot.com",
  messagingSenderId: "432390392418",
  appId: "1:432390392418:web:db696f653824fcc3b99f3b"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app);