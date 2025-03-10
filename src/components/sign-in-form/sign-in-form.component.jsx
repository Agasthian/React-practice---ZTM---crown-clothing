import React,{useState} from 'react'
import {useDispatch} from 'react-redux'

import FormInput from '../form-input/form-input.component'
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component'
// import { signInAuthUserWithEmailAndPassword ,signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'
import {googleSignInStart, emailSignInStart} from '../../store/user/user.action'

const defaultSignInFields = {
    email: '',
    password:'',
};

const SignInForm = () => {
    const dispatch = useDispatch()

    //State
    const [signInFields, setSignInFields] = useState(defaultSignInFields)
    //Destructring
    const {email, password} = signInFields


    //signInUserWith Google sign in btn pop-up
    const signInWithGoogle =async ()=>{
        // const  {user} = await signInWithGooglePopup()
        //console.log(response) // the response{user} is sent to firebase.utils.js - createUserdocFromAuth - to store in firebase db
        dispatch(googleSignInStart())

    }

    //onHandle Reset
    const onResetFormFields = () => {
        setSignInFields(defaultSignInFields)
    }

    //onhandleChange
    const onHandleChange = (e) => {
         const {name, value} = e.target
        setSignInFields({...signInFields, [name]:value})
    }

    //onHandleSubmit
    const onHandleSubmit = async (event) =>{
        event.preventDefault();
        console.log('hi')
        try{
            // await signInAuthUserWithEmailAndPassword (email, password)
            console.log(email, password)
            dispatch(emailSignInStart(email,password))
            //console.log(user)
            onResetFormFields()
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                alert('incorrect password for email')
                break
                case 'auth/user-not-found':
                alert('No user assosiated with this email')
                break
                default:
                    console.log(error)
            }
        }
    }

  return (
    <div className='sign-in-container'>
        <h2>I Already have an account</h2>
        <span>Sign In with Email and password</span>
        <form onSubmit={onHandleSubmit}>
            <FormInput
                label='Email'
                type="email"
                required
                value={email}
                onChange={onHandleChange}
                name='email'

            />
            <FormInput
                label='Password'
                type="password"
                required 
                value={password}
                onChange={onHandleChange}
                name='password'
            />
            <div className="buttons-container">
                <Button type='submit'>Sign In</Button>
                <Button 
                    type='button'
                    onClick={signInWithGoogle}
                    buttonType={BUTTON_TYPE_CLASSES.google}
                    >Google Sign in </Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm