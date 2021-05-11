import { combineReducers, createStore } from 'redux'
import listReducer from './listReducer'
import loginReducer from './login'

const reducers = combineReducers({
  list:listReducer,
  login:loginReducer
})

const store = createStore(reducers);

export default store