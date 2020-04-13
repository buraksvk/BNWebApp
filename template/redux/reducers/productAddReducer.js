import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function productAddReducer(state = initialState.product, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_ADD:
      return action.payload;
    default:
      return state;
  }
}