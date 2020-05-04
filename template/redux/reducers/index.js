import {combineReducers} from 'redux'
import authReducer from './authReducer'
import registerReducer from './registerReducer'
import profileViewReducer from './profileViewReducer'
import productlistReducer from './productlistReducer'
import addDeviceReducer from './addDeviceReducer'
import productAddReducer from './productAddReducer'
import registerControlReducer from './registerControlReducer'
import profileEditReducer from './profileEditReducer'
import passwordChangeReducer from './passwordChangeReducer'
import cartReducer from './cartReducer'
import shoppingReducer from './shoppingReducer'

const rootReducer = combineReducers({
    authReducer,
    registerReducer,
    profileViewReducer,
    productlistReducer,
    productAddReducer,
    addDeviceReducer,
    registerControlReducer,
    profileEditReducer,
    passwordChangeReducer,
    cartReducer,
    shoppingReducer,
    
})
export default rootReducer

//tüm reducer'lar toplandı