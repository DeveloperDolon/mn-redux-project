// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpsioAcnrpSEz6TP_XwjhmeX0iY_euNws",
  authDomain: "mr-project-b2d76.firebaseapp.com",
  projectId: "mr-project-b2d76",
  storageBucket: "mr-project-b2d76.appspot.com",
  messagingSenderId: "631134218281",
  appId: "1:631134218281:web:3e144f601b78a297a79438",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, app };
