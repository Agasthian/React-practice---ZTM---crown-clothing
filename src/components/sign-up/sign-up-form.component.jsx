import React,{useState} from 'react'

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up-form.styles.scss'

const defaultSignUpFields = {
    displayName: '',
    email: '',
    password:'',
    confirmPassword:''
};

const SignUpForm = () => {

    //State - store in an object 'defaultSignUpFields'
    const [signUpFields, setSignUpFields]= useState(defaultSignUpFields); // useState
    const {displayName,email,password,confirmPassword} = signUpFields; // de-structring for value in input fields

    //console.log(signUpFields)

    //handle reset form fields afer submit
    const onResetFormFields = () => {
        setSignUpFields(defaultSignUpFields)
    }

    //handle form filed inputs
    const handleChange = (event) =>{
        const{name, value} = event.target
        setSignUpFields({...signUpFields, [name]:value}) //updates the object 
    }

    //handle form submit event
    const onHandleSubmit = async(event)=>{
        event.preventDefault()
        if(password === confirmPassword){
            try{
                const {user}= await createAuthUserWithEmailAndPassword(
                        email, 
                        password
                    )
                await createUserDocumentFromAuth(user,{displayName})
                onResetFormFields()
            }catch(error){
                if(error.code ==='auth/email-already-in-use'){
                    alert('Email alredy in use, cannot create user')
                } else if(error.code ==='auth/weak-password'){
                    alert('Password must be 6 digits minimum')
                } else {
                    console.log('user creation encoutered an error',error)
                }
            }
        }else{
            alert('Password and Confirm password does not match')
        }
    }
    
    
  return (
    <div className='sign-up-container'>
        <h2>I Do not have an account</h2>
        <span>Sign up with email and password</span>
        <form onSubmit={onHandleSubmit}> 
            <FormInput
                label = 'Display Name'
                type="text" 
                required
                value={displayName}
                onChange={handleChange}
                name='displayName'
            />
            <FormInput
                label='Email'
                type="email"
                required
                value={email}
                onChange={handleChange}
                name='email'

            />
            <FormInput
                label='Password'
                type="password"
                required 
                value={password}
                onChange={handleChange}
                name='password'
            />
            <FormInput
                label='Confirm Password'
                type="password"
                required 
                value={confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
            />
            <Button type='submit'>Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm