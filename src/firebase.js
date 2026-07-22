import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1ocVTDn6u_7z2JzJ1TRraYiipUXU90HQ",
  authDomain: "masterbrush-8e9e7.firebaseapp.com",
  projectId: "masterbrush-8e9e7",
  storageBucket: "masterbrush-8e9e7.firebasestorage.app",
  messagingSenderId: "1008221081537",
  appId: "1:1008221081537:web:4455120e53192916d42940",
  measurementId: "G-141B3F48KM"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Auth Export
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
};
