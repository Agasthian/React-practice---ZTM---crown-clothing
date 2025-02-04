import { createContext, useEffect, useState } from "react";
import {onAuthStateChangedListner,createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'

//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>null
})

export const UserProvider = ({children}) =>{
    const[currentUser, setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser};

    useEffect( ()=>{
        const unSubscribe = onAuthStateChangedListner( (user)=>{
            console.log(user) // the data is received here once the auth state is changed
            if(user){
                createUserDocumentFromAuth(user) // creates a user in firedb with user data
            }
            setCurrentUser(user)// if signedOut - its Null. If signedIn - its user object. stores the user data to user context
        })
    })

    return <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
}