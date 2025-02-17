import React,{Fragment, useContext} from 'react'

import {CategoriesContext} from '../../contexts/categories.context'

import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {

    const {categoriesMap} = useContext(CategoriesContext)
    
    //Object.keys - reduces the categoriesMap Object into an array with then we use map on it
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products}/>
        })}
    </Fragment>
  )
}

export default CategoriesPreview