import * as actionTypes from "./actionTypes";
import putChangePassword from "../../lib/api/putChangePassword";

export const passwordChange = password => {
  return {
    type: actionTypes.PASSWORD_CHANGE,
    payload: password
  };
};

export function passwordChangePage(obj) {
  return function(dispatch) {
      putChangePassword(obj).then(res => {
      console.log(res);
      dispatch(passwordChange(res));
    });
  };
}