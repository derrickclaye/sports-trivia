import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

class LiveMatches extends React.Component{
    render() {
        console.log(this.props.matches)
        let matches = Object.values(this.props.matches)
        return (
            <Card containerStyle={styles.container}>
                <Card.Title>Live Matches</Card.Title>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollview}>
                {
                    matches.length > 0 ?
                    
                    matches.map((req,idx) => (
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
                        <Text>You have no live matches.</Text>
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
    matches: mplayer.matches
})

export default connect(mapStateToProps)(LiveMatches)