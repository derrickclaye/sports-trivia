import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class GameHistory extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>
                    Game History
                </Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameHistory