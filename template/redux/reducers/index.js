import {combineReducers} from 'redux'
import authReducer from './authReducer'
import registerReducer from './registerReducer'
import profile_viewReducer from './profile_viewReducer'
import productlistReducer from './productlistReducer'
import addDeviceReducer from './addDeviceReducer'
import productAddReducer from './productAddReducer'

const rootReducer = combineReducers({
    authReducer,
    registerReducer,
    profile_viewReducer,
    productlistReducer,
    productAddReducer,
    addDeviceReducer,
    
})
export default rootReducer

//tüm reducer'lar toplandı