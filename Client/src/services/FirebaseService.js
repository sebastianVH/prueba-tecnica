import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth"



export default function firebaseService(){
  

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY_FB,
    authDomain: "prueba-tecnica-262f3.firebaseapp.com",
    projectId: "prueba-tecnica-262f3",
    storageBucket: "prueba-tecnica-262f3.appspot.com",
    messagingSenderId: "1019836377699",
    appId: import.meta.env.VITE_API_ID_FB,
    measurementId: "G-JSSQR53V1C"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

return auth

}