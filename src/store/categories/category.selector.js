import { createSelector } from 'reselect'

const selectCategoryReducer = (state) => state.categories;

//selector is memoised with piece of state from redux 
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap =  createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
       const {title, items} = category;
       acc[title.toLowerCase()] = items;
       return acc;
     }, {})
)


//This selector gets the value of isLoading
export const selectCategoriesIsLoading = createSelector(
  [selectCategories],
  (categoriesSlice)=>categoriesSlice.isLoading
)


//   export const selectCategoriesMap = (state) => {
//     const categoriesMap = state.categories.categories.reduce(
//       (acc, { title, items }) => {
//         acc[title.toLowerCase()] = items;
//         return acc;
//       },
//       {}
//     );
//     return categoriesMap;
//   };