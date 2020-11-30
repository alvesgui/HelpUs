import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'

import Login from './pages/User/Login'
import SignIn from './pages/User/SignIn'

const {Navigator, Screen} = createBottomTabNavigator();

function UserTab(){
    return(
        <Navigator tabBarOptions={{
            style: {
                elevation: 0,
                shadowOpacity: 0,
                height: 64,
            },
            tabStyle: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            iconStyle: {
                flex:0,
                width: 20,
                height: 20
            },
            labelStyle: {
                fontFamily: 'Jost_700Bold',
                fontSize: 13,
                marginLeft: 16,

            },
            inactiveBackgroundColor: '#fafafc',
            activeBackgroundColor: '#ebebf5',
            inactiveTintColor: '#c1bccc',
            activeTintColor: '#053A5B',
        }}>
            <Screen name="Login" component={Login} options={{
                tabBarLabel: 'Login',
                tabBarIcon: ({color, size}) => {
                    return (
                        <FontAwesome name="user-circle" size={size} color={color} />
                    )
                }
            }} />
            <Screen name="SignIn" component={SignIn} options={{
                tabBarLabel: 'Criar Conta',
                tabBarIcon: ({color, size}) => {
                    return (
                        <FontAwesome name="user-plus" size={size} color={color} />
                    )
                }
            }}/>
        </Navigator>
    )
}

export default UserTab;