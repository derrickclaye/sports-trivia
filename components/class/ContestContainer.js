import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import QuestionContainer from './QuestionContainer';
import { QUESTIONS } from '../../questions';
import { RESET_SESSION } from '../../redux/actions';
import { store } from '../../redux/store';

class ContestContainer extends React.Component{

    reset = () => {
        store.dispatch({type: RESET_SESSION})
    }
   
    render() {
        let validIndexes = this.props.indexes.filter(idx => {
            let used = this.props.usedIndexes.includes(idx) 
            if(used === false) return true
        });
        let index = validIndexes[0];
        let question = QUESTIONS[index];
        return (
            <View>
                {
                    validIndexes.length > 0 
                    ?
                    <>
                        <QuestionContainer index={index} title={question.question} choices={question.choices} answer={question.answer} remaining={validIndexes.length-1} />
                    </>
                    :
                    <>
                        <View>
                            <Text>
                                Game over. Score - {this.props.score}
                            </Text>
                            <Button type='clear' title='play again' onPress={this.reset}  />
                        </View>
                    </>
                }
            </View>
        )
    };
};

const styles = StyleSheet.create({})

const mapStateToProps = ({trivia}) => ({
    indexes: trivia.indexes,
    usedIndexes: trivia.usedIndexes,
    score: trivia.score
});

export default connect(mapStateToProps)(ContestContainer)