import { useEffect } from "react";
import {Routes , Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'

// import {onAuthStateChangedListner,createUserDocumentFromAuth, getCurrentUser} from './utils/firebase/firebase.utils'

import {checkUserSession} from './store/user/user.action'

const App = () => {
  const dispatch = useDispatch()

  useEffect( ()=>{
          // const unSubscribe = onAuthStateChangedListner( (user)=>{
          //     //  console.log(user) // the data is received here once the auth state is changed
          //     if(user){
          //         createUserDocumentFromAuth(user) // creates a user in firedb with user data
          //     }

          //     dispatch(setCurrentUser(user))// if signedOut - its Null. If signedIn - its user object. stores the user data to user redux
          // })
          
          // return unSubscribe
          dispatch(checkUserSession()) //Goes to user.action.js
      },[])

  return (
    <Routes>
      <Route element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>} />
        <Route path='auth' element={<Authentication/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
    
  );
}

export default App;
