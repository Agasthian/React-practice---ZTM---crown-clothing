import React from 'react'

import Button from '../button/button.component'
import './product-card.styles.scss'

const ProductCard = ({product}) => {

    const{name,imageUrl,price} = product

  return (
    <div className='product-card-container'>
        <img src={imageUrl}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType='inverted'>Add To Cart</Button>
    </div>
  )
}

export default ProductCard