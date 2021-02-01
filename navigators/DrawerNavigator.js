import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import DummyPage from '../components/functional/DummyPage';
import MultiPlayerScreen from '../components/class/MultiPlayerScreen';
import HomeScreen from '../components/class/HomeScreen';
import FriendsScreen from '../components/class/FriendsScreen';
import FriendRequests from '../components/class/FriendRequests';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../redux/store';
import { RESET_REQUESTS, RESET_AUTH, RESET_SESSION } from '../redux/actions'
import { AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const logout = async () => {
    await AsyncStorage.removeItem('token');
    store.dispatch({type: RESET_AUTH})
    store.dispatch({type: RESET_REQUESTS})
    store.dispatch({type: RESET_SESSION})
}

const LogoutDrawerItem = props => (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label='logout' onPress={logout} labelStyle={{color:'red'}} />
    </DrawerContentScrollView>
    
)

const DrawerNavigator = (props) => {
    
    return (
        <Drawer.Navigator
            drawerStyle={{paddingTop:20}}
            drawerContent={LogoutDrawerItem}
            screenOptions={{
                headerShown: true
            }}
        >        
            <Drawer.Screen name='play solo' component={HomeScreen} />
            <Drawer.Screen name='multi-player' component={MultiPlayerScreen} />
            <Drawer.Screen name='search for friends' component={FriendsScreen} options={{
                headerRight: () => <AntDesign style={{marginRight:10}} name="user" size={24} color="black" />,
                
                }} 
            />
            <Drawer.Screen name='friend requests' component={FriendRequests} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default DrawerNavigator