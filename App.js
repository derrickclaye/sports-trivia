import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TriviaNavigator from './navigators/TriviaNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import AppComponent from './components/class/AppComponent';


export default class App extends React.Component {
  
  render() {  
    return (
      
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppComponent /> 
            </PersistGate>
             
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

