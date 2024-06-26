import { View, Text, StyleSheet } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react'
import Splash from "./Splash"
import Login from "./Login"
import SignUp from './SignUp'

import Orders from './Orders'
import Message from './Messages'
import BottomTab from './Tab';
import creategigs from './creategig'
import updategig from './Updategig'
import Gigdetail from './Gigdetail'

import OrderGig from './OrderGig'; 


import UserDetailsScreen from './UserDetailsScreen';


import Home from './Home';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Stack = createNativeStackNavigator();
const Nav = () => {
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}} 
      
      >

        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name='Orders' component={Orders}/>
        <Stack.Screen name='Message' component={Message}/>
        

        <Stack.Screen name='creategig' component={creategigs}/>
        <Stack.Screen name='updategig' component={updategig}/>
        <Stack.Screen name='Gigdetail' component={Gigdetail}/>
        

        <Stack.Screen name="OrderGig" component={OrderGig} options={{ title: 'Order Gig' }} />


        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
        <Stack.Screen name='ResetPassword' component={ResetPassword}/>
        

        <Stack.Screen name="BottomTab" component={BottomTab}  options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Nav


const styles=StyleSheet.create({
  toptab:{
    backgroundColor:'black'
  }
})