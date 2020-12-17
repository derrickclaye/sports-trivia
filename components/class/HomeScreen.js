import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import QuestionContainer from './QuestionContainer';
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

    startTrivia = () => {
        let length = QUESTIONS.length
        let indexes = createFiveRandomNumbers(length)
        store.dispatch({type: BEGIN_TRIVIA, payload: true})
        store.dispatch({type: QUESTION_INDEXES, payload: indexes})
        
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.status === true 
                    ?
                    <>
                        <ContestContainer/>
                    </>
                    :
                    <>
                        <View >
                            <Ionicons style={styles.icon} onPress={this.startTrivia} name='add' size={32} color='green' />
                            <Text>
                                START TRIVIA 
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

const mapStateToProps = ({trivia}) => ({
    status: trivia.status
})

export default connect(mapStateToProps)(HomeScreen) 