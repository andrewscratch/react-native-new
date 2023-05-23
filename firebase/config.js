import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-LgjxSBQVk401uDbO5dI4mH_BrE2NtjQ",
  authDomain: "react-native-new-5db9f.firebaseapp.com",
  projectId: "react-native-new-5db9f",
  storageBucket: "react-native-new-5db9f.appspot.com",
  messagingSenderId: "186319207477",
  appId: "1:186319207477:web:e33945ef0291f8c8f2057c",
  measurementId: "G-NXNSD8SCYW"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;