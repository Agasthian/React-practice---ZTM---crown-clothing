import {createContext, useState,useEffect} from 'react'

import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils.js'

export const CategoriesContext = createContext({
    categoriesMap: {},
    
})

export const CategoriesProvider = ({children}) => {
    //useState
    const[categoriesMap, setCategoriesMap] = useState({})
    
    //useEffect 
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])
    

    //This useEffect gets the data from firestore into our react app
    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            // console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }
        
        getCategoriesMap()
    },[])

    const value={categoriesMap}

    return<CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>
}