// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCQbf8FUL8DnZMO5SCbgkvTmt0w02Im1U",
  authDomain: "text-d8767.firebaseapp.com",
  projectId: "text-d8767",
  storageBucket: "text-d8767.appspot.com",
  messagingSenderId: "747762402498",
  appId: "1:747762402498:web:e45d596177eeaf49bea75b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);