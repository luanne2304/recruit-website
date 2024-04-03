// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9DXMhq_zmGkdvxM2hvW8RB3ASID1wqq4",
  authDomain: "recuitwebsite-76dec.firebaseapp.com",
  projectId: "recuitwebsite-76dec",
  storageBucket: "recuitwebsite-76dec.appspot.com",
  messagingSenderId: "91066045086",
  appId: "1:91066045086:web:1552f35decb8387276e18f",
  measurementId: "G-7E6ZCFX83R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);