import firebaseService from "./FirebaseService";

export default  async function firebaseSignOut(){

    const auth = firebaseService();
    
    await auth.signOut()
  

}