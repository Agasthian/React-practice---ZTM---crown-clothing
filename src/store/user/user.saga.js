import {takeLatest, call, put, all } from 'redux-saga/effects'
import {USER_ACTION_TYPES} from './user.types'
import {signInSuccess,signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed} from './user.action'
import { 
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword ,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from '../../utils/firebase/firebase.utils'


//(5)
export function* signInWithGoogle(){
    try {
        const {user} = yield call(signInWithGooglePopup);
      yield call(getSnapshotFromUserAuth,user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

//(7)
export function* signInWithEmail({ payload: { email, password } }) {
    try {
      const { user } = yield call(
        signInAuthUserWithEmailAndPassword ,
        email,
        password
      );
      yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
      yield put(signInFailed(error));
    }
  }


//(9)
export function* signUp ({password:{email,password,displayName}}){
    try{
        const {user} = yield call (createAuthUserWithEmailAndPassword,email,password)
        yield put(signUpSuccess(user, {displayName}))
    }catch(error){
        yield put (signUpFailed(error))
    }
}
//(11) - signInAfterSignUp
export function* signInAfterSignUp({payload:{user,additionalDetails}}){
    yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

//(13) signOut
export function* signOut(){
    try {
        yield call(signOutUser)
        yield put( signOutSuccess())
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

//(3)
export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try {
        // console.log('test')
        const userSnapshot = yield call( 
            createUserDocumentFromAuth,
            userAuth, 
            additionalDetails
        );
        //use "call" when we call a function example:createUserDocumentFromAuth        
        // console.log(userSnapshot)
        // console.log(userSnapshot.data())

        yield put(signInSuccess( {id:userSnapshot.id, ...userSnapshot.data()} ))
    } catch (error) {
        yield put(signInFailed(error))
    }
}

//(2) this saga calls getCurrentUser method - firebase.utils.js //
export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser)
        if(!userAuth) return
        // console.log('userAuth :>> ', userAuth);
        yield call(getSnapshotFromUserAuth,userAuth)
    }catch (error){        
        yield put(signInFailed(error))
    }
}


//(1) this saga is listening for  checkUserSession action.
//This saga calls another saga isUserAuthenticated
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

//(4) these sagas trigger the based on the start action of emailSignIn and google signIn
export function* onGoogleSignInStart(){
    yield takeLatest( USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

//(6)
export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
  }
  
//(8)
export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

//(10)
export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, signInAfterSignUp)
}
//(12)
export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}


export function* userSagas(){
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}