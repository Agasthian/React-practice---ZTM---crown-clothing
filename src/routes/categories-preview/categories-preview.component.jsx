// ***************
// Shop page - shows the preview of all categories
// ***************

import React,{Fragment } from 'react'
import {useSelector} from 'react-redux'

// import {CategoriesContext} from '../../contexts/categories.context'
import {selectCategoriesMap,selectCategoriesIsLoading} from '../../store/categories/category.selector'

import CategoryPreview from '../../components/category-preview/category-preview.component'
import Spinner from '../../components/spinner/spinner.component'

const CategoriesPreview = () => {

    // const {categoriesMap} = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)

    //Object.keys - reduces the categoriesMap Object into an array with then we use map on it
  return (
    <Fragment>
      {
      isLoading ? 
        (
          <Spinner/>
        )
      :
        (
          Object.keys(categoriesMap).map((title) => {
              const products = categoriesMap[title];
              return <CategoryPreview key={title} title={title} products={products}/>
          })
        )
        
      }
    </Fragment>
  )
}

export default CategoriesPreview