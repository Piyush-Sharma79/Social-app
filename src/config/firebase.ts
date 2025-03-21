// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG_giA6Jz1bZEQG-fP_loXlCN7m2P41FQ",
  authDomain: "hyhy-b453d.firebaseapp.com",
  projectId: "hyhy-b453d",
  storageBucket: "hyhy-b453d.firebasestorage.app",
  messagingSenderId: "1019170979907",
  appId: "1:1019170979907:web:badbdfce89ef26a7a414f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);