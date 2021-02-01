import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Button, Input, ButtonGroup } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { register, login } from '../../redux/actions';
import { sendUserData } from '../../firebase.functions';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import { SET_USERNAME } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const buttons = ['Create Account', 'Login']

class AuthComponent extends React.Component{
    state = {
        selectedIndex: 0,
        email: '',
        password: '',
        username: '',
        isAnimating: false,
        emailError: '',
        pwError: '',
        unError: ''
    }
    indexHandler = selectedIndex => {
        this.setState({selectedIndex})
    }
    usernameHandler = username => {
        this.setState({username})
    }
    emailHandler = email => {
        this.setState({email})
    }
    passwordHandler = password => {
        this.setState({password})   
    }
    registerUser = async () => {
        if(this.state.username === '') {
            this.setState({unError: 'Must select a username'})
            return
        }
        try {
             let res = await fetch('https://sportstrivia-aaa9b.firebaseio.com/users.json')
             let data = await res.json()
             if(data === null || data === undefined) {
                this.setState({isAnimating: true})
                await this.props.register(this.state.email, this.state.password, this.state.username)
                sendUserData(this.state.email, this.state.username)
                this.setState({
                    isAnimating: false,
                    error: ''
               })
             } else {
                let taken = Object.values(data).map(user => user.username.toLowerCase()).includes(this.state.username.toLowerCase())
                if(taken === true) throw new Error('USERNAME_TAKEN')
                this.setState({isAnimating: true})
                await this.props.register(this.state.email, this.state.password,this.state.username)
                sendUserData(this.state.email, this.state.username)
                this.setState({
                    isAnimating: false,
                    error: ''
                })
             }
             
        } catch (err) {
            switch(err.message) {
                case 'USERNAME_TAKEN': {
                    this.setState({unError: 'Username already in use'})
                    break;
                }
                case 'EMAIL_NOT_FOUND': {
                    this.setState({emailError: 'Email already exists'})
                    break;
                } 
                case 'INVALID_EMAIL': {
                    this.setState({emailError: 'Email is invalid'})
                    break;
                }
                case 'WEAK_PASSWORD': {
                    this.setState({pwError: 'Password should be at least 6 characters'})
                    break;
                }
                
                default: {
                    console.log(err.message)
                    this.setState({pwError: 'Something went wrong'})
                }
            }
            this.setState({
                isAnimating: false,
            })
        }
    }
    loginUser = async () => {
        try {
            this.setState({isAnimating: true})
            await this.props.login(this.state.email, this.state.password)
            this.setState({
                isAnimating: false,
                error: ''
            })
            
        } catch(err) {
            switch(err.message) {
                case 'EMAIL_EXISTS': {
                    this.setState({emailError: 'Email already exists'})
                    break;
                }
                case 'INVALID_EMAIL': {
                    this.setState({emailError: 'Email is invalid'})
                    break;
                }
                case 'INVALID_PASSWORD': {
                    this.setState({pwError: 'Password already exists'})
                    break;
                }
                default: this.setState({pwError: 'Something went wrong'})
            }
            this.setState({
                isAnimating: false,
                error: err.message
            })
        }
        
    }
    check = async () => {
        let keys = await AsyncStorage.getAllKeys()
        console.log(keys)
        console.log(store.getState())
    }
    render() {
        return(
            <View style={styles.container}>
                <Card containerStyle={styles.card}>
                    <ButtonGroup
                        buttons={buttons}
                        selectedIndex={this.state.selectedIndex}
                        onPress={this.indexHandler}
                        containerStyle={styles.buttonGroup}
                    />
                    {
                        this.state.selectedIndex === 0 ?
                        <>
                            <Input
                                leftIcon={<AntDesign name="user" size={24} color="black" />}
                                onChangeText={this.usernameHandler}
                                errorMessage={this.state.unError}
                                value={this.state.username}
                                placeholder='username'
                            />
                            <Input
                                leftIcon={<MaterialCommunityIcons name="email-box" size={24} color="black" />}
                                onChangeText={this.emailHandler}
                                errorMessage={this.state.emailError}
                                value={this.state.email}
                                placeholder='email'
                            />
                            <Input
                                leftIcon={<MaterialIcons name="lock-outline" size={24} color="black" />}
                                onChangeText={this.passwordHandler}
                                errorMessage={this.state.pwError}
                                secureTextEntry={true}
                                value={this.state.password}
                                placeholder='password'
                            />
                            {
                                this.state.isAnimating === true ?
                                <>
                                    <ActivityIndicator animating={this.state.isAnimating} hidesWhenStopped={true}  />

                                </>
                                :
                                <>
                                    <Button title='Create' onPress={this.registerUser} />
                                </>
                            }
                            
                        </>
                        :
                        <>
                            <Input
                                leftIcon={<MaterialCommunityIcons name="email-box" size={24} color="black" />}
                                onChangeText={this.emailHandler}
                                errorMessage={this.state.emailError}
                                value={this.state.email}
                                placeholder='email'
                            />
                            <Input
                                leftIcon={<MaterialIcons name="lock-outline" size={24} color="black" />}
                                onChangeText={this.passwordHandler}
                                errorMessage={this.state.pwError}
                                secureTextEntry={true}
                                value={this.state.password}
                                placeholder='password'
                            />
                            {
                                this.state.isAnimating === true ?
                                <>
                                    <ActivityIndicator animating={this.state.isAnimating} hidesWhenStopped={true}  />

                                </>
                                :
                                <>
                                    <Button title='Login' onPress={this.loginUser} />
                                </>
                            }
                        </>
                    }
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
    card: {
        width: '90%'
    },
    buttonGroup: {
        marginBottom: 20
    }
})

const mapStateToProps = state => ({})
export default connect (mapStateToProps, { register, login })(AuthComponent)