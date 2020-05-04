import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function profileEditReducer(state=initialState.profile,action)
{
    switch (action.type) {
        case actionTypes.PROFILE_EDIT:
            return action.payload
        default:
            return state;
    }
}