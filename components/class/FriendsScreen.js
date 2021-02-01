import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Card, ListItem, Input, Button } from 'react-native-elements';
import { checkIfUserExists } from '../../firebase.functions';
import { sendFriendRequest } from '../../helper-functions';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import { REQUEST_ERROR, FRIEND_ID } from '../../redux/actions';

class FriendsScreen extends React.Component{
  
    state = {
        username: '',
        animating: false,
        error: ''
    }

    usernameHandler = username => {
        this.setState({username})
    }
    
    checkHandler = () => {
        checkIfUserExists(this.state.username)
        Keyboard.dismiss()
    }
    requestHandler = async () => {
        this.setState({animating:true})
        try {
            await sendFriendRequest(this.state.username, this.props.friendId)
            Alert.alert(
                'Awesome!',
                `Your request has been sent to ${this.state.username}`,
                [{
                    text: 'okay',
                    onPress: () => {
                        this.setState({
                            animating: false,
                            username: ''
                        })
                        store.dispatch({type: REQUEST_ERROR, payload: ''})
                        store.dispatch({type: FRIEND_ID, payload: null})
                    }
                }]
            )
        } catch(err) {
            Alert.alert(
                'Oops!',
                `${err.message}`,
                [{
                    text: 'okay',
                    onPress: () => {
                        this.setState({
                            animating: false,
                            username: ''
                        })
                        store.dispatch({type: REQUEST_ERROR, payload: ''})
                        store.dispatch({type: FRIEND_ID, payload: null})
                    }
                }]
            )
        }
        
    }

    render() {
        return(
            <View style={styles.container}>
                <Card containerStyle={styles.cardContainer}>
                    <Card.Title>Search for friends</Card.Title>
                    <Input 
                        value={this.state.username}  
                        onChangeText={this.usernameHandler}
                        errorMessage={this.props.error}
                    />
                    {
                        this.state.animating ? 
                        <>
                            <ActivityIndicator hidesWhenStopped={true} animating={this.state.animating} />
                        </>
                        :
                        <>
                            {
                                this.props.friendId === null ?
                                <>
                                    <Button onPress={this.checkHandler} title='search' type='outline' buttonStyle={styles.searchButton} titleStyle={styles.searchButtonText}  />
                                </>
                                :
                                <>
                                    <Button onPress={this.requestHandler} title='send request' type='outline' buttonStyle={styles.requestButton} titleStyle={styles.requestButtonText} />
 
                                </>
                            }
                            
                        </>
                    }
                    
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContainer: {
        width: '90%'
    },
    searchButton: {
        borderColor: 'pink',
        borderWidth: 2
    },
    searchButtonText: {
        color: 'grey',
        fontWeight: '600'
    },
    requestButton: {
        backgroundColor: 'grey',
        borderColor: 'grey'
    },
    requestButtonText: {
        color: 'white',
        fontWeight: '600'
    }
})
const mapStateToProps = ({friends}) => ({
    result: friends.result,
    friendId: friends.friendId,
    error: friends.error
})
export default connect(mapStateToProps)(FriendsScreen) 