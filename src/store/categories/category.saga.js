//Replacing thunk to saga - saga listents to onFetchCategores action and respond with 

import {takeLatest, all, put, call} from 'redux-saga/effects'
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'
import {fetchCategoriesSuccess, fetchCategoriesFailed} from './category.action'
import {CATEGORY_ACTION_TYPES} from './category.types'

// fetchCategoriesAsync Saga - this fetches categories array from firebase. after fetch we PUT , equavallent of dispatch 
export function* fetchCategoriesAsync(){
    
    try{
        const categoriesArray = yield call (getCategoriesAndDocuments, 'categories')
        yield put (fetchCategoriesSuccess(categoriesArray)) // actions  called via PUT go back into redux flow and update the state
    }catch(error){
        yield put(fetchCategoriesFailed(error))
    }
}

//first generator - something that triggers when we call fetchCategoriesStart 
//Generator responds to Action the same way reducers respond to switch
// - here action - >FETCH_CATEGOIES_START  generator -  fetchCategoriesAsync
export function* onFetchCategories (){
    yield takeLatest(
        CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    )
}

//this saga is an accumulator holds all of the sagas that r related to category
export function* categoriesSaga(){
    yield all( [call( onFetchCategories ) ] )
}