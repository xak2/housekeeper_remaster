import { combineReducers } from 'redux'
import userReducer from './user'
import customersReducer from './customers'

export const rootReducer = combineReducers({
  userReducer,
  customersReducer
})

export default rootReducer