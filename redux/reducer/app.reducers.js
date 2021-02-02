import { 
    BEGIN_TRIVIA, 
    SELECT_CHOICE, 
    ADD_TO_USED_QUESTIONS, 
    QUESTION_INDEXES,
    RESET_SESSION,
    RESET_CHOICE,
    RESET_SCORE,
    UPDATE_SCORE,
    TOKEN,
    ACCESS,
    RESET_AUTH,
    SET_USERNAME,
    FRIEND_REQS,
    PENDING_REQS,
    RESET_REQUESTS,
    USER_EXISTS,
    FRIEND_ID,
    MY_FRIENDS,
    REQUEST_ERROR,
    RESET_MULTI_PLAYER,
    MATCH_REQS,
    ALL_MATCHES
 } from '../actions'

const AUTHENTICATION_INITIAL_STATE = {
    access: false,
    username: ''
};
const TRIVA_SESSION_INITIAL_STATE = {
    choice: null,
    status: false,
    indexes: [],
    usedIndexes: [],
    score: 0
    
};
const FRIENDS_INITIAL_STATE = {
    requests: [],
    pending: [],
    friends: [],
    friendId: null
};
const MULTI_PLAYER_INITIAL_STATE = {
    requests: {},
    matches: {},

}


export const AuthReducer = (state = AUTHENTICATION_INITIAL_STATE, action) => {
    switch(action.type) {
        case ACCESS: return { ...state, access: action.payload}
        case SET_USERNAME: return { ...state, username: action.payload}
        case RESET_AUTH: return AUTHENTICATION_INITIAL_STATE
        default: return state
    };
};

export const TriviaSessionReducer = (state = TRIVA_SESSION_INITIAL_STATE, action) => {
   switch(action.type) {
       case BEGIN_TRIVIA: return { ...state, status: action.payload }
       case SELECT_CHOICE: return { ...state, choice: action.payload }
       case RESET_CHOICE: return { ...state, choice: null}
       case UPDATE_SCORE: return { ...state, score: action.payload}
       case RESET_SCORE: return { ...state, score: 0}
       case ADD_TO_USED_QUESTIONS: return { ...state, usedIndexes: [ ...action.payload.usedIndexes, action.payload.index]}
       case QUESTION_INDEXES: return { ...state, indexes: action.payload}
       case RESET_SESSION: return TRIVA_SESSION_INITIAL_STATE

       default: return state
   };
};

export const FriendsReducer = (state = FRIENDS_INITIAL_STATE, action) => {
    switch(action.type) {
        case FRIEND_REQS: return { ...state, requests: action.payload}
        case PENDING_REQS: return { ...state, pending: action.payload}
        case USER_EXISTS: return { ...state, exists: action.payload}
        case FRIEND_ID: return { ...state, friendId: action.payload}
        case REQUEST_ERROR: return { ...state, error: action.payload}
        case MY_FRIENDS: return { ...state, friends: action.payload}
        case RESET_REQUESTS: return FRIENDS_INITIAL_STATE

        default: return state
    }
};

export const MultiPlayerReducer = (state = MULTI_PLAYER_INITIAL_STATE, action) => {
    switch(action.type) {
        case MATCH_REQS: return { ...state, requests: action.payload}
        case ALL_MATCHES: return { ...state, matches: action.payload}
        case RESET_MULTI_PLAYER: return MULTI_PLAYER_INITIAL_STATE
        default: return state
    }
}