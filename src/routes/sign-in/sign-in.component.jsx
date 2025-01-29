import React from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up/sign-up-form.component'

const SignIn = () => {

  const logGoogleUser =async ()=>{
    const  {user} = await signInWithGooglePopup()
    createUserDocumentFromAuth(user) 
    //console.log(response) // the response{user} is sent to firebase.utils.js - createUserdocFromAuth - to store in firebase db

  }


  return (
    <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with Google popup</button>
        <SignUpForm/>
    </div>
  )
}

export default SignIn