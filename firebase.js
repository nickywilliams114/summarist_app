// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlFNvraYNZNt_W3yBsxHTuwixdK5MG0QM",
  authDomain: "my-summarist-app.firebaseapp.com",
  projectId: "my-summarist-app",
  storageBucket: "my-summarist-app.firebasestorage.app",
  messagingSenderId: "789337096590",
  appId: "1:789337096590:web:5ea504ded1fb9931ade4df",
  measurementId: "G-30T6ETRJ3E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
