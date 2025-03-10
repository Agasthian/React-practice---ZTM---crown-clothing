// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
    } from 'firebase/auth'

import {getFirestore,
        doc,
        getDoc,
        setDoc,
        collection,
        writeBatch,
        query,
        getDocs
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


//Save shop data to firestore
export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db);

objectsToAdd.forEach((object)=>{
  const docRef = doc(collectionRef, object.title.toLowerCase())
  batch.set(docRef, object)
})
await batch.commit()
console.log('done')
}


//import data from firestore into the react appplication
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q)
  return  querySnapshot.docs.map((docSnapShot) => docSnapShot.data())
}

//signInWithGooglePopup service from 'firebase/auth'
//access the db // used inside singin.component.jsx file
//this function takes user data as input and store in tha firebase db. The user data is generated from signInWithGooglePopup

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation={}
) => {
  if(!userAuth) return;
    // console.log('userAuth :>> ', userAuth);
    //the user uid from response is used as unique document id 
    const userDocRef = doc(db, 'users', userAuth.uid)

    //userSnapshot
    const userSnapshot = await getDoc(userDocRef)
    //console.log(!userSnapshot.exists())
    // console.log('userSnapshot 1 :>> ', userSnapshot);

    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      
      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation, //the additinal indo holds the display name from sign up form.it is not generated automatically like signinwith google pop up. so we pass it here so it is not null in firestore db
        });    
      } catch (error) {
        console.log('Error creating the user', error.message)
      }
      // console.log('userSnapshot 2 :>> ', userSnapshot);
      return userSnapshot;
    }
}




// export const createUserDocumentFromAuth = async (
//   userAuth,
//   additionalInformation = {}
// ) => {
//   if (!userAuth) return;

//   const userDocRef = doc(db, 'users', userAuth.uid);

//   const userSnapshot = await getDoc(userDocRef);

//   if (!userSnapshot.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createdAt,
//         ...additionalInformation,
//       });
//     } catch (error) {
//       console.log('error creating the user', error.message);
//     }
//   }

//   return userSnapshot;
// };



//createUserWithEmailAndPassword
//This function uses a firebase service to crete users with email & password. fn used in signup component.jsx
export const createAuthUserWithEmailAndPassword = async (email , password) =>{
  if(!email || !password)
    return;
  return await createUserWithEmailAndPassword(auth, email, password)
}


//signInWithEmailAndPassword  - function sign-in user with wmail & password
export const signInAuthUserWithEmailAndPassword  = async(email, password) => {
  if(!email || !password ) return;
  return await signInWithEmailAndPassword(auth, email, password)
}


//Sign Out the user
export const signOutUser =async () => await signOut(auth)


//This fun listens to event from auth.and then sends the callback with em. if signed in it will get user data
//used in user context.jsx - callback is sent from there. to store data in one place. Auth stores the user data and sends to callback
// export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth,callback)


//Redux saga - Promise-fied version of checking if our state has changed. i.e that is a user auth that
//still exists. Used inside user.saga.js
// export const getCurrentUser = () =>{
//   return new Promise((resolve, reject)=>{
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (userAuth)=>{
//         unsubscribe();
//         resolve(userAuth);
//       },
//       reject
//     );
//   });
// };


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
        console.log(userAuth)
      },
      reject
    );
  });
};