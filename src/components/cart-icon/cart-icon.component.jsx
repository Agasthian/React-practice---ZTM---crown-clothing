import React from 'react'
import {useDispatch,useSelector} from 'react-redux'

// import { CartContext } from '../../contexts/cart.context'
import {selectCartCount,selectIsCartOpen} from '../../store/cart/cart.selector.js'
import { setIsCartOpen } from '../../store/cart/cart.action.js'

import {CartIconContainer,ShoppingIcon,ItemCount} from './cart-icon.styles.jsx'

const CartIcon = () => {
  
  const dispatch = useDispatch()

  // const { isCartOpen , setIsCartOpen,cartCount} = useContext(CartContext)
  const cartCount = useSelector(selectCartCount)
  const isCartOpen = useSelector(selectIsCartOpen)

  const toggleIsCartOpen = ()=> dispatch(setIsCartOpen(!isCartOpen))

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon