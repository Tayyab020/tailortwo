import { View, Text } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react'
import Splash from "./Splash"
import Login from "./Login"
import SignUp from './SignUp'

import Home from './Home'
import BottomTab from './Tab';

const Stack = createNativeStackNavigator();
const Nav = () => {
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>

        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
    

        
        <Stack.Screen name="BottomTab" component={BottomTab}  options={{ headerShown: true }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Nav