// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore
} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA52iBs9fHHk2JEwZZjtjGAn6bKz-NF2Ig",
  authDomain: "orderbot-abfac.firebaseapp.com",
  projectId: "orderbot-abfac",
  storageBucket: "orderbot-abfac.appspot.com",
  messagingSenderId: "402230736485",
  appId: "1:402230736485:web:13b0caa555d8c9df50388c",
  measurementId: "G-V7RV67FJXR"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const analytics = getAnalytics(app);

export { db };
