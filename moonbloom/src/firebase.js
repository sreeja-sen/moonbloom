import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "moonbloom-39270.firebaseapp.com",
  databaseURL: "https://moonbloom-39270-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "moonbloom-39270",
  storageBucket: "moonbloom-39270.appspot.com",
  messagingSenderId: "767867680688",
  appId: "1:767867680688:web:88d603c284b548996f4875"
};

console.log(process.env)
console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);

export default app;

// process.env
