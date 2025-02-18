import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import {CartContext} from '../../contexts/cart.context'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import {CartDropDownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckoutPageHandler = () => {
    navigate('/checkout')
  }
  return (
    <CartDropDownContainer>
        <CartItems>
          { cartItems.length ?
           cartItems.map((item)=> <CartItem key={item.id} cartItem={item} />): 
           <EmptyMessage>Your cart is Empty</EmptyMessage>
          }
         </CartItems> 
        <Button onClick={goToCheckoutPageHandler}>Go to Checkout</Button>
    </CartDropDownContainer>
  )
}

export default CartDropdown