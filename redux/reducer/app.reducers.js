import { 
    BEGIN_TRIVIA, 
    SELECT_CHOICE, 
    ADD_TO_USED_QUESTIONS, 
    QUESTION_INDEXES,
    RESET_CHOICE,
    RESET_SCORE,
    UPDATE_SCORE
 } from '../actions'

const AUTHENTICATION_INITIAL_STATE = {};
const TRIVA_SESSION_INITIAL_STATE = {
    choice: null,
    status: false,
    indexes: [],
    usedIndexes: [],
    score: 0
    
};

export const AuthReducer = (state = AUTHENTICATION_INITIAL_STATE, action) => {
    switch(action.type) {
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

       default: return state
   };
};


