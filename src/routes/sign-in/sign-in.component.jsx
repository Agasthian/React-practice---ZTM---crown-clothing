import React from 'react'
import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const logGoogleUser =async ()=>{
    const {user} = await signInWithGooglePopup()
    //console.log(response) // the response is sent to firebase.utils.js - createUserdocFromAuth - to store in firebase db
    createUserDocumentFromAuth(user)
    
  }


  return (
    <div>
        <h1>Sign In Page</h1>

        <button onClick={logGoogleUser}>Sign in with Google popup</button>
    </div>
  )
}

export default SignIn