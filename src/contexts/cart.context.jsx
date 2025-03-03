//MOVED TO REDUX STATE MANAGMENT LIBRARY

// import { createContext,useReducer } from "react";


// //ADD CART ITEM FN - add data to cart drop-down
// const addCartItem = (cartItems, productToAdd) => {
//     //find if cartItems contains productToAdd
//     const existingItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id )
//     //If found increment quantity
//     if(existingItem){
//         return cartItems.map((cartItem)=>
//             cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem
//         )
//     }
//     //return new array with modified cartItems/ new cartItem
//     return [...cartItems, {...productToAdd, quantity:1 }]
// }


// //REMOVE CART ITEMS FN - Checkout page - decrese the quantity - helper fn
// const removeCartItem = (cartItems,cartItemToRemove)=>{
//     //find the cart item to remove
//     const existingCartItem = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id )
//     //check if quantity is 1, if it is remove that item from cart
//     if(existingCartItem.quantity === 1){
//         return cartItems.filter( cartItem => cartItem.id !== cartItemToRemove.id)
//     }
//     //return back cart item with matching cart item with reduced quantity
//     return cartItems.map((cartItem)=>
//         cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1} : cartItem
//     )
// }

// //CLEAR CART ITEM FN
// const clearCartItem = (cartItems, cartItemToClear) => {
//     return cartItems.filter( cartItem => cartItem.id !== cartItemToClear.id)
// }


// //CART - CONTEXT
// export const CartContext = createContext({
//     isCartOpen: true,
//     setIsCartOpen: ()=>{},
//     cartItems: [],
//     addItemToCart: ()=>{},
//     removeItemToCart : ()=>{},
//     clearItemFromCart : ()=>{},
//     cartCount: 0,
//     cartTotal:0
// })
// /*
// product{ id, name, price, imageURL } 
// cartItem:{ id, name, price, imageURL, quantity }
// */

// //INITIAL STATE
// const INITIAL_STATE = {
//     cartItems: [],
//     cartTotal:0,
//     cartCount:0,
//     isCartOpen:false
// }

// export const CART_ACTION_TYPES= {
//     SET_CART_ITEMS : 'SET_CART_ITEMS',
//     SET_IS_CART_OPEN : 'SET_IS_CART_OPEN'
// }

// //CART - REDUCER
// const cartReducer = (state, action) =>{
//     console.log('dispatched')
//     console.log('action :>> ', action);
//     const{type, payload} = action

//     switch (type) {
//         case CART_ACTION_TYPES.SET_CART_ITEMS:
//             return {
//                 ...state,
//                 ...payload
//             }
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return{
//                 ...state,
//                 isCartOpen: payload
//             }    
//         default :
//             throw new Error (`Unhandled type ${type} in cart reducer`)

//     }
// }


// //CART - PROVIDER
// export const CartProvider = ({children}) => {

//     // const [isCartOpen, setIsCartOpen]= useState(false);
//     // const [cartItems,setCartItems] = useState ([])
//     // const [cartCount,setCartCount] = useState(0)
//     // const [cartTotal,setCartTotal] = useState(0)
    
    
//     //USE REDUCER - HOOK
//     const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE)
//     const {cartItems,cartTotal,cartCount,isCartOpen} = state // de-structure
    
//     // useEffect(()=>{
//     //     const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
//     //     setCartCount(newCartCount);
//     // },[cartItems])
    
    
//     // useEffect(()=>{
//     //     const newCartTotal = cartItems.reduce((total, cartItem)=> total + cartItem.quantity * cartItem.price, 0)
//     //     setCartTotal(newCartTotal);
//     // },[cartItems])
    
//     //helper fn, updates all 3 values at once 
//     const updateCartItemReducer = (newCartItems)=>{
//         /*
//             generate newCart Total
//             generate newCart Count
//             dispatch new action with streucture of payload ={
//                 newCartItems,
//                 newCartTotal,
//                 newCartCount
//             }
//         */

//     const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)

//     const newCartTotal = cartItems.reduce((total, cartItem)=> total + cartItem.quantity * cartItem.price, 0)
    
//     dispatch({
//         type:CART_ACTION_TYPES.SET_CART_ITEMS,
//         payload : {cartItems: newCartItems, cartTotal:newCartTotal, cartCount: newCartCount}
//     })

//     }

//     //when addItem to cart is called updateCartItemReducer is called with values
//     const addItemToCart = (productToAdd) => {
//         const newCartItems = (addCartItem(cartItems, productToAdd))
//         updateCartItemReducer(newCartItems)
//     }

//     const removeItemToCart = (cartItemToRemove) =>{
//         const newCartItems = ( removeCartItem(cartItems, cartItemToRemove))
//         updateCartItemReducer(newCartItems)
//     }
    
//     const clearItemFromCart = (cartItemToClear) =>{
//         const newCartItems = ( clearCartItem(cartItems, cartItemToClear))
//         updateCartItemReducer(newCartItems)
//     }

//     const setIsCartOpen = (bool) =>{
//         dispatch({
//             type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
//             payload: bool
//         })
//     }


//     const value = {
//         isCartOpen, 
//         setIsCartOpen , 
//         addItemToCart, 
//         removeItemToCart,
//         clearItemFromCart ,
//         cartItems,
//         cartCount,
//         cartTotal,
//     };

//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }