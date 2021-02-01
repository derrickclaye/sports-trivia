import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './redux/store';


export const createFiveRandomNumbers = (len) => {
  let nums = [];
  
  while(nums.length !== 5){
    let rand = Math.floor(Math.random()*len);
    if(!nums.includes(rand)) {
        nums.push(rand)
    }
  }
    
    return nums
};

export const sendFriendRequest = async (username, friendId) => {
  let uid = await AsyncStorage.getItem('localId');
  let myUsername = store.getState().auth.username;
  let uids = [uid, friendId];
  let requestID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  let x;
  try {   
      for(x = 0; x<2; x++) {
          if(x === 0) {
              fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${uids[x]}/pending-requests.json`,{
              method: 'POST',
              headers: {'content-type':'application/json'},
              body: JSON.stringify({
                      reqId: requestID,
                      username: username
                  })
              })
          } else {
              fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${uids[x]}/friend-requests.json`,{
              method: 'POST',
              headers: {'content-type':'application/json'},
              body: JSON.stringify({
                      reqId: requestID,
                      username: myUsername,
                      uid: uid
                  })
              })
          }
      }
  } catch(err) {throw new Error(err.message)}

       
     
};


export const sendMatchRequest = async (username) => {
  let res = await fetch('https://sportstrivia-aaa9b.firebaseio.com/users.json');
  let users = await res.json();
  let localIds = Object.keys(users);
  let usernames = Object.values(users).map(user => user.username.toLowerCase());
  let idx = usernames.indexOf(username.toLowerCase());
  let friendId = localIds[idx];
  let myId = await AsyncStorage.getItem('localId');
  let myUsername = store.getState().auth.username;
  let ids = [myId, friendId];
  let keys = ['pending-match-requests', 'match-requests'];
  let requestID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let x;
  try {
    for(x=0; x<ids.length; x++) {
      if(x === 0) {
        await fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${ids[x]}/${keys[x]}.json`,{
          method: 'POST',
          headers: {'content-type':'application/json'},
          body: JSON.stringify({
            reqId: requestID,
            username: username
          })
        })
      } else {
          await fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${ids[x]}/${keys[x]}.json`,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
              reqId: requestID,
              username: myUsername
            })
          });
        };
    }  
  } catch(err) {
      return null
    };
    return true
  
};
