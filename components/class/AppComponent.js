import React from 'react';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TriviaNavigator from '../../navigators/TriviaNavigator';
import AuthNavigator from '../../navigators/AuthNavigator';




const Stack = createStackNavigator();
 

class AppComponent extends React.Component{

    
    render() {
        return (
            <NavigationContainer>
              <Stack.Navigator>
                {
                  this.props.access === true ? 
                  <>        
                    <Stack.Screen options={{headerShown:false}} name='Trivia' component={TriviaNavigator} />
                  </>
                  :
                  <>           
                    <Stack.Screen  name='Auth' component={AuthNavigator}/>
                  </>
                }
              </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = ({auth}) => ({
    access: auth.access
});
export default connect(mapStateToProps)(AppComponent)