import { SignIn, SignUp } from '../auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---> TRIVIA REDUCER ACTIONS <--- 

export const UPDATE_SCORE = "UPDATE_SCORE"
export const SELECT_CHOICE = "SELECT_CHOICE"
export const RESET_CHOICE = "RESET_CHOICE"
export const RESET_SCORE = "RESET_SCORE"
export const RESET_SESSION = "RESET_SESSION"
export const BEGIN_TRIVIA = "BEGIN_TRIVIA"
export const ADD_TO_USED_QUESTIONS = "ADD_TO_USED_QUESTIONS"
export const INCREMENT_TOTAL = "INCREMENT_TOTAL"
export const QUESTION_INDEXES = "QUESTION_INDEXES"


// ---> AUTH REDUCER ACTIONS <---

export const TOKEN = "TOKEN"
export const SIGN_IN = "SIGN_IN"
export const ACCESS = "ACCESS"
export const RESET_AUTH = "RESET_AUTH"
export const SET_USERNAME = "SET_USERNAME"

// ---> FRIENDS REDUCER ACTIONS <---

export const FRIEND_REQS = "FRIEND_REQS"
export const PENDING_REQS = "PENDING_REQS"
export const RESET_REQUESTS = "RESET_REQUESTS"
export const USER_EXISTS = "USER_EXISTS"
export const FRIEND_ID = "FRIEND_ID"
export const REQUEST_ERROR = "REQUEST_ERROR"
export const MY_FRIENDS = "MY_FRIENDS"

// ---> MULTI PLAYER ACTIONS <---

export const RESET_MULTI_PLAYER = "RESET_MULTI_PLAYER"
export const MATCH_REQS = "MATCH_REQS"
export const ALL_MATCHES = "ALL_MATCHES"





// --> ASYNC AUTH ACTION CREATORS <--

export const register = (email, password, username) => async dispatch => {
    let validationResponseObject = await SignUp(email, password)
    await AsyncStorage.setItem('token', validationResponseObject.idToken)
    await AsyncStorage.setItem('localId', validationResponseObject.localId)
    await AsyncStorage.setItem('expiry', validationResponseObject.expiresIn)
    await AsyncStorage.setItem('refreshToken', validationResponseObject.refreshToken)
    dispatch({type: ACCESS, payload: true})
    dispatch({type: SET_USERNAME, payload: username})
}

export const login = (email, password) => async dispatch => {
    let validationResponseObject = await SignIn(email, password)
    await AsyncStorage.setItem('token', validationResponseObject.idToken)
    await AsyncStorage.setItem('localId', validationResponseObject.localId)
    await AsyncStorage.setItem('expiry', validationResponseObject.expiresIn)
    await AsyncStorage.setItem('refreshToken', validationResponseObject.refreshToken)
    let response = await fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${validationResponseObject.localId}/username.json`)
    let username = await response.json()
    dispatch({type: ACCESS, payload: true})
    dispatch({type: SET_USERNAME, payload: username})
}