import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContestContainer from './ContestContainer';
import { QUESTIONS } from '../../questions';
import { createFiveRandomNumbers } from '../../helper-functions';
import { QUESTION_INDEXES, BEGIN_TRIVIA } from '../../redux/actions';


class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            name: 'Derrick',
            beginTrivia: false,
            questions: []
        }
    };

    retrieveData = async () => {
        let values = await AsyncStorage.getAllKeys()
    }
   

    startTrivia = () => {
        let length = QUESTIONS.length
        let indexes = createFiveRandomNumbers(length)
        store.dispatch({type: BEGIN_TRIVIA, payload: true})
        store.dispatch({type: QUESTION_INDEXES, payload: indexes})
        
    }

    check = async () => {
        let keys = await AsyncStorage.getAllKeys()
        console.log(keys)
        console.log(store.getState())
    }

    render() {
        
        return (
            <View style={styles.container}>
                {
                    this.props.status === true  
                    ?
                    <>
                        <ContestContainer />
                    </>
                    :
                    <>
                        <View >
                            <Ionicons style={styles.icon} onPress={this.startTrivia} name='add' size={32} color='green' />
                            <Text>
                                START TRIVIA {this.props.username}
                            </Text>
                        </View>
                    </>
                } 
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        alignSelf:'center'
    }
});

const mapStateToProps = ({trivia, auth}) => ({
    status: trivia.status,
    username: auth.username
})

export default connect(mapStateToProps)(HomeScreen) 