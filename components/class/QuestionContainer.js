import React from 'react';
import {View,Text,StyleSheet}  from 'react-native';
import { Card, Button } from 'react-native-elements';
import ChoiceComponent from './ChoiceComponent';
import { connect } from 'react-redux';
import { UPDATE_SCORE, ADD_TO_USED_QUESTIONS, RESET_CHOICE } from '../../redux/actions';
import { store } from '../../redux/store';



class QuestionContainer extends React.Component{
    state = {
        second: 10,
        id: null
    }
    componentDidMount() {
        let timer = setInterval(this.updateTimer,1000);
        this.setState({id:timer})
    }
    componentWillUnmount() {
        clearInterval(this.state.id)
    }
    updateTimer = () => {
        if(this.state.second <= 10 && this.state.second > 0) {
            this.setState(prevState => ({
                second: prevState.second - 1
            }))
        }
        
    }
    onSubmit = () => {
        if(this.props.choice === null) return;
        if(this.props.choice === this.props.answer) {
            let score = this.props.score + 1;
            store.dispatch({type: UPDATE_SCORE, payload: score})
        };
        store.dispatch({type: ADD_TO_USED_QUESTIONS, payload: {usedIndexes: this.props.usedIndexes, index: this.props.index } })
        store.dispatch({type: RESET_CHOICE})
        this.setState({second: 10})
    }


    render() {
        return (
            <View>
                <Text style={{alignSelf:'center'}}>{this.state.second}</Text>
                <Card containerStyle={styles.container}>
                    <Card.Title>{this.props.title}</Card.Title>
                    <View>
                        {
                            this.props.choices.map((choice, idx) => <ChoiceComponent key={idx} letter={choice.letter} answer={choice.answer} />)
                        }
                        <View style={styles.button}><Button onPress={this.onSubmit} title='submit' /></View>
                    </View>
                </Card>
            </View>
            
        );
    };
};

const styles = StyleSheet.create({
    container: {
       width:'95%',
       minWidth: '95%'   
    },
    button: {
        marginTop: 15
    }
})

const mapStateToProps = ({trivia}) => ({
    choice: trivia.choice,
    score: trivia.score,
    indexes: trivia.indexes,
    usedIndexes: trivia.usedIndexes
})
export default connect(mapStateToProps)(QuestionContainer) 