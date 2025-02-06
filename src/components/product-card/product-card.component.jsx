import React,{useContext} from 'react'

import Button from '../button/button.component'

import {CartContext} from '../../contexts/cart.context'

import './product-card.styles.scss'


const ProductCard = ({product}) => {

  const{name,imageUrl,price} = product
  const{addItemToCart} = useContext(CartContext)

  const onClickHandlerAddItemToCart = () =>{
    addItemToCart(product)
    
  }

  return (
    <div className='product-card-container'>
        <img src={imageUrl}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType='inverted' onClick={onClickHandlerAddItemToCart }>Add To Cart</Button>
    </div>
  )
}

export default ProductCard