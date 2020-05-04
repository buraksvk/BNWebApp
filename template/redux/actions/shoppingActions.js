import * as actionTypes from "./actionTypes";
import postShopping from "../../lib/api/postShopping";

export const shoppingAdd = product => {
  return {
    type: actionTypes.SHOPPING_CART,
    payload: shopping
  };
};

export function shoppingPage(obj) {
  return function(dispatch) {
    postShopping(obj).then(res => {
      console.log(res);
      dispatch(shoppingAdd(res));
    });
  };
}