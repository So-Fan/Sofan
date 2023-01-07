// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKNDLBnwTSiWhsbJDCin4pyeNqBqNzDss",
  authDomain: "sofan-app.firebaseapp.com",
  projectId: "sofan-app",
  storageBucket: "sofan-app.appspot.com",
  messagingSenderId: "640702967010",
  appId: "1:640702967010:web:92636def63d39996f342bb",
  measurementId: "G-DGV6LGEKME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)

export { analytics };
export { auth };
export { db };
export default app;
