import firebase from 'firebase'
// var config = {
//     apiKey: "apiKey",
//     authDomain: "projectId.firebaseapp.com",
//     databaseURL: "https://databaseName.firebaseio.com",
//     storageBucket: "bucket.appspot.com"
//   };
//   firebase.initializeApp(config);

const firebaseConfig = {
    apiKey: "AIzaSyC_AwHzJfdT_RM_CtIJxv09O8SK5ojdCoY",
    authDomain: "sportstrivia-aaa9b.firebaseapp.com",
    databaseURL: "https://sportstrivia-aaa9b.firebaseio.com",
    projectId: "sportstrivia-aaa9b",
    storageBucket: "sportstrivia-aaa9.appspot.com"
}

const FIREBASE = firebase.initializeApp(firebaseConfig)
export default FIREBASE

