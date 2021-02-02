import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';


class MatchRequests extends React.Component{
    render() {
        let requests = Object.values(this.props.requests);
        return (
            <Card containerStyle={styles.container}>
                <Card.Title>Match Requests</Card.Title>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollview}>
                {
                    requests.length > 0 ?
                    
                    requests.map((req,idx) => (
                        <ListItem key={idx} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{req.username}</ListItem.Title>
                            </ListItem.Content>
                            <View style={styles.selectionContainer}>
                                <Text style={styles.accept}>accept</Text>
                                <Text style={styles.reject}>decline</Text>
                            </View>
                        </ListItem>
                    ))
                    :
                    <>
                        <Text>You have no match requests.</Text>
                    </>
                }
                </ScrollView>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: 0,
        overflow: 'hidden'
    },
    selectionContainer: {
        flexDirection: 'row'
    },
    accept: {
        marginRight: 20,
        color: 'green'
    },
    reject: {
        color: 'red'
    },
    scrollview: {
        paddingBottom: 70
    }

})

const mapStateToProps = ({mplayer}) => ({
    requests: mplayer.requests,
})

export default connect(mapStateToProps)(MatchRequests)