import { AuthReducer, TriviaSessionReducer } from './app.reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: AuthReducer,
    trivia: TriviaSessionReducer
})

export default rootReducer