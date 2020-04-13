import * as actionTypes from "./actionTypes";
import postLogin from '../../lib/api/postLogin';

export const setCurrentUser = (token) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: token,
    };
};

export function loginUser(obj) {
    return function(dispatch) {
        postLogin(obj)
            .then((res) => {
                console.log(res);
                dispatch(setCurrentUser(res));
            })
    }
}