import { CART_ACTION_TYPES } from './cart.types'

//INITIAL STATE
const CART_INITIAL_STATE = {
    cartItems: [],
    isCartOpen:false 
}


//CART - REDUCER
export const cartReducer = (state = CART_INITIAL_STATE, action={}) =>{
    // console.log('dispatched')
    // console.log('action :>> ', action);
    const{type, payload} = action

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }    
        default :
            return state

    }
}