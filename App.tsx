import { View, Text } from 'react-native'
import React from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Splash from './components/Splash'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./components/Home"
// import Settings from "./components/Messages"
import BottomTab from "./components/Tab"

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
