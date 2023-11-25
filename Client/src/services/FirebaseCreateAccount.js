

import {createUserWithEmailAndPassword} from "firebase/auth"
import firebaseService from "./FirebaseService";

export default  async function firebaseCreateAccount({email, password}){

const auth = firebaseService();
try {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
} catch (error) {
  throw new Error(error.code);
}

}