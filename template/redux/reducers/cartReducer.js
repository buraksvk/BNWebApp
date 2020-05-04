import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
    var addedItem = state.find( e => e.product.product_id === action.payload.product.product_id);
        if(addedItem){
            var newState = state.map(cartItem =>{
                if(cartItem.product.product_id === action.payload.product.product_id){
                    return Object.assign({},addedItem,{quantity:addedItem.quantity+1})
                }
                return cartItem;
            })
            return newState;
        }
        else{
            return[...state,{...action.payload}]
        }
    
    
    default:
      return state;
  }
}