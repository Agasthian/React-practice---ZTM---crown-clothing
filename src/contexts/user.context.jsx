// USE CONTEXT TO REDUX STATE MANAGMENT LIBRARY - MIGRATION DONE- SO OLD CODE COMENTED
//KEPT FOR REFERNCE 


// import { createContext, useEffect,useReducer } from "react";
// import {onAuthStateChangedListner,createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'

// //USER - CONTEXT
// //as the actual value you want to access
// export const UserContext = createContext({
//     currentUser: null,
//     setCurrentUser: ()=>null
// })

// export const USER_ACTION_TYPES = {
//     SET_CURRENT_USER: 'SET_CURRENT_USER'
// }

// const INITIAL_STATE = { 
// currentUser: null
// }

// //USER - REDUCER
// const userReducer = (state, action) => {
//     const {type,payload} = action;

//     switch (type){
//         case USER_ACTION_TYPES.SET_CURRENT_USER :
//         return{
//             ...state,
//             currentUser: payload,
//         }   
//         default:
//             throw new Error(`Unhandled type ${type} in userReducer`)
//     }
// }


// //USER - PROVIDER
// export const UserProvider = ({children}) =>{
//     //const[currentUser, setCurrentUser] = useState(null);
    
//     //USE REDUCER - HOOK
//     const [state, dispatch] = useReducer(userReducer,INITIAL_STATE)
//     const{currentUser} = state // de-structure
    
//     const setCurrentUser = (user) =>{
//         dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
//     }
    
//     useEffect( ()=>{
//         const unSubscribe = onAuthStateChangedListner( (user)=>{
//             //  console.log(user) // the data is received here once the auth state is changed
//             if(user){
//                 createUserDocumentFromAuth(user) // creates a user in firedb with user data
//             }
//             setCurrentUser(user)// if signedOut - its Null. If signedIn - its user object. stores the user data to user context
//         })
        
//         return unSubscribe
//     },[])
    
//     const value = {currentUser,setCurrentUser};


//     return <UserContext.Provider value={value}>
//             {children}
//         </UserContext.Provider>
// }