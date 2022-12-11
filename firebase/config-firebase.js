// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// devfullstacknelson@gmail.com

const firebaseConfig = {
  apiKey: "AIzaSyCyeDAO5MInKwH1fbv61mho_6Qdu3Kb3oE",
  authDomain: "posis-fayfa-suc2.firebaseapp.com",
  projectId: "posis-fayfa-suc2",
  storageBucket: "gs://posis-fayfa-suc2.appspot.com",
  messagingSenderId: "992441310532",
  appId: "1:992441310532:web:ad30bf981cd48569af4b11"
};

// Initialize Firebase
export const firebase = () => initializeApp(firebaseConfig);

