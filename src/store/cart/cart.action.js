import {CART_ACTION_TYPES} from './cart.types'
import {createAction} from '../../utils/reducer/reducer.utils'

//helper function

//ADD CART ITEM FN - add data to cart drop-down
const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id )
    //If found increment quantity
    if(existingItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }
    //return new array with modified cartItems/ new cartItem
    return [...cartItems, {...productToAdd, quantity:1 }]
}


//REMOVE CART ITEMS FN - Checkout page - decrese the quantity - helper fn
const removeCartItem = (cartItems,cartItemToRemove)=>{
    //find the cart item to remove
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id )
    //check if quantity is 1, if it is remove that item from cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter( cartItem => cartItem.id !== cartItemToRemove.id)
    }
    //return back cart item with matching cart item with reduced quantity
    return cartItems.map((cartItem)=>
        cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1} : cartItem
    )
}

//CLEAR CART ITEM FN
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter( cartItem => cartItem.id !== cartItemToClear.id)
}


//Actions
export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
  

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = (addCartItem(cartItems, productToAdd))
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}

export const removeItemToCart = (cartItems, cartItemToRemove) =>{
    const newCartItems = ( removeCartItem(cartItems, cartItemToRemove))
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}

export const clearItemFromCart = (cartItems, cartItemToClear) =>{
    const newCartItems = ( clearCartItem(cartItems, cartItemToClear))
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}    