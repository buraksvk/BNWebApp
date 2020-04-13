import * as actionTypes from "./actionTypes";
import postToken from '../../lib/api/postToken';

export const profileInfo = (profile) => {
    return {
        type: actionTypes.PROFILE_VIEW_PAGE,
        payload: profile,
    };
};

export function profileInformation(obj) {
    return function(dispatch) {
        postToken(obj)
            .then((res) => {
                console.log(res);
                dispatch(profileInfo(res));
            })
    }
}