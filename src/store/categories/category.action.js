import {CATEGORY_ACTION_TYPES} from './category.types'
import { createAction} from '../../utils/reducer/reducer.utils'
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'

//Replacing a simple action call to fetch api data with redux thunk async- redux thunk takes care of fetch operations instead of useEffect
// export const setCategories = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray)

export const fetchCategoriesStart = () => createAction(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START 
)

export const fetchCategoriesSuccess = (categoriesArray) => createAction(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
)

export const fetchCategoriesFailed = (error) => createAction(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    error
)

//The async API fetch call function . Dispatches above actions inside function // This is a thunk
//A function that returns a async function that gets a dispatch(prop). Dispatch actions 
export const fetchCategoriesAsync = () => async(dispatch) =>{
    
    dispatch(fetchCategoriesStart())
    try{
        const categoriesArray = await getCategoriesAndDocuments('categories')
        dispatch(fetchCategoriesSuccess(categoriesArray))
    }catch(error){
        dispatch(fetchCategoriesFailed(error))
    }
    

}