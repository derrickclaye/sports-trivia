import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthComponent from '../components/class/AuthComponent';

const Stack = createStackNavigator();
const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Auth' component={AuthComponent} />
        </Stack.Navigator>
    )
}

export default AuthNavigator

