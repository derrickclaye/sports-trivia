import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import HomeScreen from '../components/class/HomeScreen';
import GameHistory from '../components/class/GameHistory';
import DrawerNavigator from './DrawerNavigator';

const Tab = createBottomTabNavigator();

const TriviaNavigator = () => {
    return (
        <Tab.Navigator 
            initialRouteName='Home'
            >
            <Tab.Screen 
            name='Home' 
            component={DrawerNavigator} 
            
            />
            <Tab.Screen  name='History' component={GameHistory}/>
        </Tab.Navigator>
    )
}

export default TriviaNavigator