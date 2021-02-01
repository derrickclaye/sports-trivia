import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../../redux/store';


const RequestComponent = props => {
    const acceptHandler = async () => {
        let id = await AsyncStorage.getItem('localId');
        let myUsername = store.getState().auth.username;
        let { dbKey, reqId, uid, username } = props;
        let response = await fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${uid}/pending-requests.json`);
        let reqData = await response.json();
        let pendingReqIds = Object.values(reqData).map(req => req.reqId);
        let pendingReqsKeys = Object.keys(reqData);
        let includes = pendingReqIds.includes(reqId);
        if(includes === true) {
            let idx = pendingReqIds.indexOf(reqId);
            let key = pendingReqsKeys[idx];
            try {
                await fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${id}/friend-requests/${dbKey}.json`,{
                    method: 'DELETE'
                });
                await fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${uid}/pending-requests/${key}.json`,{
                    method: 'DELETE'
                });
                await fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${uid}/friends.json`,{
                    method: 'POST',
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify({username: myUsername})
                });
                await fetch(`https://sportstrivia-aaa9b.firebaseio.com/users/${id}/friends.json`,{
                    method: 'POST',
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify({username: username})
                });
            } catch(err) {
                console.log(err.message)
            }
            
        }
    };
    return (
        <ListItem bottomDivider>
            <Avatar
            size="small"
            rounded
            title="MT"
            onPress={() => console.log("Works!")}
            titleStyle={{color:'white'}}
            containerStyle={{backgroundColor:'black'}}
            activeOpacity={0.7}
            />
            <ListItem.Content>
                <ListItem.Title>{props.username}</ListItem.Title>
            </ListItem.Content>
            <View style={styles.selectionContainer}>
                {
                    props.type === 'requests' ?
                    <>
                        <Text onPress={acceptHandler} style={styles.accept}>accept</Text>
                        <Text onPress={() => {}} style={styles.reject}>reject</Text>
                    </>
                    :
                    <></>
                }
            </View>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    selectionContainer: {
        flexDirection: 'row'
    },
    accept: {
        marginRight: 20,
        color: 'green'
    },
    reject: {
        color: 'red'
    }
})
export default RequestComponent

