import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/class/HomeScreen';
import GamHistory from './components/class/GameHistory';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      
          <Provider store={store}>
            
              <NavigationContainer>
                <Tab.Navigator 
                  initialRouteName='Home'>
                  <Tab.Screen 
                    name='Home' 
                    component={HomeScreen} 
                    
                  />
                  <Tab.Screen name='History' component={GamHistory}/>
                </Tab.Navigator>
              </NavigationContainer>
            
          </Provider>
       
    );
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
