import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import SearchComponent from './SearchComponent';
import MatchRequests from './MatchRequests';
import LiveMatches from './LiveMatches';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchFriends, fetchMatchRequests } from '../../firebase.functions';
import { sendMatchRequest } from '../../helper-functions';

class MultiPlayerScreen extends React.Component{
    componentDidMount() {
        fetchFriends()
        fetchMatchRequests()
        
    }
    render() {
        return (
            <View style={styles.conatiner}>
                <SearchComponent friends={this.props.friends} requestMatch={sendMatchRequest}/>
                <MatchRequests />
                <LiveMatches />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: 'center',
    },
    bottomContent: {
        flex: 3,
        alignItems: 'center',
        width: '100%',
     
    },
    choices: {
        flexDirection: 'row'
    }
})

const mapStateToProps = ({friends, mplayer}) => ({
    friends: friends.friends,
    requests: mplayer.requests
})

export default connect(mapStateToProps)(MultiPlayerScreen)