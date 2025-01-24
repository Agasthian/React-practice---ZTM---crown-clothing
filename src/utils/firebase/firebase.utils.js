// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider
    } from 'firebase/auth'

import {getFirestore,
        doc,
        getDoc,
        setDoc
} from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtssns5tdwRipOU49wVRWDNA-8OHTLAWU",
    authDomain: "crwn-db-cc28f.firebaseapp.com",
    databaseURL: "https://crwn-db-cc28f.firebaseio.com",
    projectId: "crwn-db-cc28f",
    storageBucket: "crwn-db-cc28f.firebasestorage.app",
    messagingSenderId: "377201688268",
    appId: "1:377201688268:web:65c1d836ca1c6b4c"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt : "select_account"
  }); 

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

//Instantiate firestore db
export const db = getFirestore()

//access the db
export const createUserDocumentFromAuth = async (userAuth) => {
//the user uid from response is used as unique document id 
const userDocRef = doc(db, 'users', userAuth.uid)

//userSnapshot
const userSnapshot = await getDoc(userDocRef)
//console.log(userSnapshot.exists())

if(! userSnapshot.exists()) {
  const {displayName, email} = userAuth;
  const createdAt = new Date();
  try {
    await setDoc(userDocRef,{
      displayName,
      email,
      createdAt
    })    
  } catch (error) {
    console.log('Error creating the user', error.message)
  }

  return userDocRef;
}


}