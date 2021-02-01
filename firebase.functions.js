import FIREBASE from './firebase.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FRIEND_REQS, PENDING_REQS, USER_EXISTS, FRIEND_ID, REQUEST_ERROR, MY_FRIENDS, ALL_MATCHES, MATCH_REQS } from './redux/actions';
import { store } from './redux/store';

export const sendUserData = async (email, username) => {
    let uid = await AsyncStorage.getItem('localId');
    FIREBASE.database().ref('users/' + uid  ).set({
        email: email,
        username: username
    });
};

export const checkIfUserExists = async (username) => {
    let data = FIREBASE.database().ref('users');
    data.once('value', snapshot => {
        if(snapshot.val() === null || snapshot.val() === undefined) return
        let users = snapshot.val();
        let userIDs = Object.keys(users);
        let usernames = Object.values(users).map(user => user.username.toLowerCase());
        let found = usernames.includes(username.toLowerCase());
        if(found) {
            let idx = usernames.indexOf(username.toLowerCase());
            let friendUID = userIDs[idx];
            store.dispatch({type: USER_EXISTS, payload: true})
            store.dispatch({type: FRIEND_ID, payload: friendUID})
        } else {
            store.dispatch({type: REQUEST_ERROR, payload: 'User not found. Check spelling.'})

        }
    });
};

export const friendRequests = async () => {
    let id = await AsyncStorage.getItem('localId');
    let data = FIREBASE.database().ref('users/' + id)
    data.on('value', snapshot => {
        if(snapshot.val() === null || snapshot.val() === undefined) return
        let userData = snapshot.val();
        let keys = ['friend-requests', 'pending-requests'];
        let actions = [FRIEND_REQS, PENDING_REQS];
        let activeKeys = Object.keys(userData);
        let x;
        for(x=0; x<keys.length; x++) {
            if(activeKeys.includes(keys[x])) {
                let key = keys[x];
                let reqKeys = Object.keys(userData[key]);
                let reqValues = Object.values(userData[key]);
                let requests = reqValues.map((req, idx) => {
                    return { ...req, dbKey: reqKeys[idx] }
                })
                store.dispatch({type: actions[x], payload: requests})
            } else {
                store.dispatch({type: actions[x], payload: []})
            }
        }
    });
};

export const fetchFriends = async () => {
    let id = await AsyncStorage.getItem('localId');
    let data = FIREBASE.database().ref('users/' + id + '/friends')
    data.on('value', snapshot => {
        if(snapshot.val() === null || snapshot.val() === undefined) return
        let friends = Object.values(snapshot.val()).map(friend => friend.username)
        store.dispatch({type: MY_FRIENDS, payload: friends})
    })
}

export const fetchMatchRequests = async () => {
    let id = await AsyncStorage.getItem('localId');
    let data = FIREBASE.database().ref('users/' + id + '/match-requests');
    data.on('value', snapshot => {
        if(snapshot.val() === null || snapshot.val() === undefined) return;
        let requests = snapshot.val();
        store.dispatch({type: MATCH_REQS, payload: requests})
    })
};
