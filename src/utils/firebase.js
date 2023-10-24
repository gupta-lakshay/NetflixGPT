// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEToy9gr2qM53cWDIa5paK4TYKCSI4jDA",
  authDomain: "netflixgpt-5ec0c.firebaseapp.com",
  projectId: "netflixgpt-5ec0c",
  storageBucket: "netflixgpt-5ec0c.appspot.com",
  messagingSenderId: "830608291088",
  appId: "1:830608291088:web:adf1d549a991981987e195",
  measurementId: "G-04WNZ9BG9V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
