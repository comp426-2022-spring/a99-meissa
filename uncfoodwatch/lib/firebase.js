// API Calls to Firebase
import firebase from "firebase/app";
import "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
// import "firebase/compat/firestore";

// keep firebase credits
const firebaseCredentials = {
  apiKey: "AIzaSyARuAPfu7apBKjb7pdHFL3_6wjvwE6STmY",
  authDomain: "uncfoodwatch.firebaseapp.com",
  projectId: "uncfoodwatch"
}


//If an firebase app hasn't already been created
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCredentials)
}

export default firebase;