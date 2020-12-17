import React from 'react';
import { connect } from 'react-redux';
import { View, Text} from 'react-native';
import { ListItem } from 'react-native-elements';
import { SELECT_CHOICE } from '../../redux/actions';
import { store } from '../../redux/store';



class ChoiceComponent extends React.Component{
    onChoose = () => {
        store.dispatch({type: SELECT_CHOICE, payload: this.props.letter})
    }
   
    render() {
        return (
            <ListItem onPress={this.onChoose} bottomDivider containerStyle={{backgroundColor: this.props.choice === this.props.letter ? 'pink' : 'white'}}>
                <Text>{this.props.letter}</Text>
                <ListItem.Title>{this.props.answer}</ListItem.Title>
            </ListItem>
        );
    };
};

const mapStateToProps = ({trivia}) => ({
    choice: trivia.choice
})
export default connect(mapStateToProps)(ChoiceComponent)