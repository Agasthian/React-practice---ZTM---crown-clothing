import { createContext, useEffect, useState } from "react";

//Adds the cart data to cart drop-down
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


//

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    cartCount: 0,
})
/*
product{ id, name, price, imageURL } 
cartItem:{ id, name, price, imageURL, quantity }
*/

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen]= useState(false);
    const [cartItems,setCartItems] = useState ([])
    const [cartCount,setCartCount] = useState(0)

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    },[cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems,cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}