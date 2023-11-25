// Import the functions you need from the SDKs you need

import {signInWithEmailAndPassword} from "firebase/auth"
import firebaseService from "./FirebaseService";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default async function firebaseLogin({email, password}){
  

const auth = firebaseService();
try {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user;
} catch (error) {
  throw new Error(error.code);
}


}