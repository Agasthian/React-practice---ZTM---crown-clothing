import React,{useContext} from 'react'

import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component'

import {CartContext} from '../../contexts/cart.context'

import {ProductCardContainer,Footer,Name,Price} from './product-card.styles.jsx'


const ProductCard = ({product}) => {

  const{name,imageUrl,price} = product
  const{addItemToCart} = useContext(CartContext)

  const onClickHandlerAddItemToCart = () =>{
    addItemToCart(product)
    
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