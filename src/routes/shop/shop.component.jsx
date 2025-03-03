import React,{useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import {fetchCategoriesAsync} from '../../store/categories/category.action'
import './shop.styles.scss'

const Shop = () => {

  const dispatch = useDispatch()

  //Gets the shop data from fire base and set it to redux - state -
  //e api call is moved to category.action.js - using redux-thunk async
  useEffect(()=>{
        dispatch(fetchCategoriesAsync())  
      },[])

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=':category' element={<Category/>}/>
    </Routes>
  )
}

export default Shop