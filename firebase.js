// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "saas-flashcardsa-ai.firebaseapp.com",
  projectId: "saas-flashcardsa-ai",
  storageBucket: "saas-flashcardsa-ai.appspot.com",
  messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.FIREBASE_APPID,
  measurementId: "G-G23C57MWSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db= getFirestore(app)

export {db}