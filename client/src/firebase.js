// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-ce1e2.firebaseapp.com",
  projectId: "estate-ce1e2",
  storageBucket: "estate-ce1e2.appspot.com",
  messagingSenderId: "1022302941375",
  appId: "1:1022302941375:web:ff83f2d34cc921c76d560a"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);