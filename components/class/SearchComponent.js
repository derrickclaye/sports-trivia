import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input, ListItem, Card } from 'react-native-elements';

class SearchComponent extends React.Component{
    state = {
        text: ''
    }

    textHandler = text => {
        this.setState({text})
    }
    render() {
        let filteredFriends = []
        filteredFriends = this.props.friends.filter(friend => {
            if(friend.toLowerCase().includes(this.state.text.toLowerCase())) return friend
        })
        return (
                <Card containerStyle={styles.container}>
                    <Input onChangeText={this.textHandler} value={this.state.text} inputStyle={{textAlign:'center'}} inputContainerStyle={styles.searchBar} placeholder='search for friends' />
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollview}>
                        {
                            filteredFriends.map((friend, idx) => (
                                <ListItem bottomDivider key={idx}>
                                    <ListItem.Content>
                                        <ListItem.Title>{friend}</ListItem.Title>
                                    </ListItem.Content>
                                    <View>
                                        <Text style={styles.requestText} onPress={ async () => {
                                            let result = await this.props.requestMatch(friend);
                                            if(result === true) {
                                                Alert.alert(
                                                    'Nice!',
                                                    `Your match request has been sent to ${friend}`,
                                                    [{
                                                        text: 'okay'
                                                    }]
                                                )
                                            } else {
                                                Alert.alert(
                                                    'Oops!',
                                                    'Something went wrong. Try again.',
                                                    [{
                                                        text: 'okay'
                                                    }]
                                                )
                                            }
                                        }}>
                                            send match request
                                        </Text>
                                    </View>
                                </ListItem>
                            ))
                        }
                    </ScrollView>
                </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: '100%',
        overflow: 'hidden',
        marginTop: 0
    },
    searchBar: { 
        borderWidth: 2
    },
    requestText: {
        color: 'darkorange'
    },
    scrollview: {
        paddingBottom: 70
    }

    
})

export default SearchComponent

