import { AuthReducer, TriviaSessionReducer, FriendsReducer, MultiPlayerReducer } from './app.reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: AuthReducer,
    trivia: TriviaSessionReducer,
    friends: FriendsReducer,
    mplayer: MultiPlayerReducer
})

export default rootReducer