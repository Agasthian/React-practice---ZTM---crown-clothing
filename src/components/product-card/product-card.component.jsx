import React from 'react'
import {useDispatch,useSelector} from 'react-redux'

import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component'

// import {CartContext} from '../../contexts/cart.context'
import {addItemToCart} from '../../store/cart/cart.action.js'
import { selectCartItems } from '../../store/cart/cart.selector.js'

import {ProductCardContainer,Footer,Name,Price} from './product-card.styles.jsx'


const ProductCard = ({product}) => {

  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const{name,imageUrl,price} = product
  // const{addItemToCart} = useContext(CartContext)


  const onClickHandlerAddItemToCart = () =>{
    console.log('add to cart fired')
   dispatch(addItemToCart(cartItems,  product))
    
  }

  return (
    <ProductCardContainer>
        <img src={imageUrl}/>
        <Footer>
            <Name>{name}</Name>
            <Price>{price}</Price>
        </Footer>
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={onClickHandlerAddItemToCart }>Add To Cart</Button>
    </ProductCardContainer>
  )
}

export default ProductCard