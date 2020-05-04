import * as actionTypes from "./actionTypes";
import putProfile from "../../lib/api/putProfile";

export const profileEdit = profile => {
  return {
    type: actionTypes.PROFILE_EDIT,
    payload: profile
  };
};

export function putProfileEdit(obj) {
  return function(dispatch) {
    putProfile(obj).then(res => {
      console.log(res);
      dispatch(profileEdit(res));
    });
  };
}