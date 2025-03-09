// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: "organdonationapp-78aa3.firebaseapp.com",
  projectId: "organdonationapp-78aa3",
  storageBucket: "organdonationapp-78aa3.firebasestorage.app",
  messagingSenderId: "203458080586",
  appId: "1:203458080586:web:79fc5fd2e17a67cb96dbb3",
  measurementId: "G-G43EPN101W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;