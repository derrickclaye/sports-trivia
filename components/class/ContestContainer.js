import React from 'react';
import {View, Text} from 'react-native';
import {} from 'react-native-elements';
import { connect } from 'react-redux';
import QuestionContainer from './QuestionContainer';
import { QUESTIONS } from '../../questions';

class ContestContainer extends React.Component{


    render() {
        let validIndexes = this.props.indexes.filter(idx => {
            let used = this.props.usedIndexes.includes(idx) 
            if(used === false) return idx
        });
        let index = validIndexes[0];
        let question = QUESTIONS[index];
        return (
            <View>
                {
                    validIndexes.length > 0 
                    ?
                    <>
                        <QuestionContainer index={index} title={question.question} choices={question.choices} answer={question.answer} />
                    </>
                    :
                    <>
                        <View>
                            <Text>
                                Game over. Score - {this.props.score}
                            </Text>
                        </View>
                    </>
                }
            </View>
        )
    };
};

const mapStateToProps = ({trivia}) => ({
    indexes: trivia.indexes,
    usedIndexes: trivia.usedIndexes,
    score: trivia.score
});

export default connect(mapStateToProps)(ContestContainer)