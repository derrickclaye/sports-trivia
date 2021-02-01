import React from 'react';
import { connect } from 'react-redux';
import { Card, ButtonGroup, Button } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import RequestComponent from '../functional/RequestComponent';
import { friendRequests } from '../../firebase.functions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const buttons = ['FRIEND REQUESTS', 'PENDING REQUESTS'];

class FriendRequests extends React.Component {
    state = {
        selectedIndex: 0
    }
    indexHandler = selectedIndex => {
        this.setState({selectedIndex})
    }
    componentDidMount() {
        friendRequests()
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Card containerStyle={styles.container}  >
                <ButtonGroup
                    buttons={buttons}
                    containerStyle={{width:'100%'}}
                    selectedIndex={this.state.selectedIndex}
                    onPress={this.indexHandler}
                />
                {
                    this.state.selectedIndex === 0 ?
                    <>
                        {
                            this.props.requests.map((req,idx) => <RequestComponent type='requests' key={idx} username={req.username} dbKey={req.dbKey} reqId={req.reqId} uid={req.uid} />)
                        }
                    </>
                    :
                    <>
                        {
                            this.props.pending.map((req,idx) => <RequestComponent type='pending' key={idx} username={req.username} />)
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
    }
});

const mapStateToProps = ({friends}) => ({
    requests: friends.requests,
    pending: friends.pending
})

export default connect(mapStateToProps)(FriendRequests)