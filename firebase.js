// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxi1gNETHsRNjeJ55KmnY4HtOP3G5kB7k",
  authDomain: "Yvirtualint2-3ca2c.firebaseapp.com",
  projectId: "Yvirtualint2-3ca2c",
  storageBucket: "Yvirtualint2-3ca2c.firebasestorage.app",
  messagingSenderId: "1051798855662",
  appId: "1:1:1051798855662:web:6ddbde2629d3bd0cdf38ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
