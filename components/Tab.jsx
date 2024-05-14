import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Home from './Home';
import Messages from './Messages';
import MannageOrder from './Orders';
import Profile from './Profile';

import unauthhome from './unauthhome';
import unauthmsg from './unauthmsg';
import unauthorder from './unauthorder';
import  unauthprofile from './unauthprofile';

import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator()
function BottomTab() {
  const isAuthenticated=useSelector((state)=>state.user.auth)
  return (
    
    <Tab.Navigator 
      initialRouteName="Home"
      barStyle={styles.tabBar} // Apply styles to the tab bar
      
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor:'orange',  
        
        tabBarStyle: {
          position: 'fixed',
          backgroundColor: '#FF7F11',
          marginBottom:5,
          marginLeft:10,
          marginRight:10,
          borderRadius:15,
          marginBottom:15,
          height: 70, // Increase the height of the tab bar
          elevation: 0, // Set elevation to 0 to remove shadow on Android
        },
        activeTintColor: 'orange', // Set active icon color to orange
      }}
      
      
    >

{/* options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#FF8C00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} */}
        {isAuthenticated?
        <>
            <Tab.Screen 
       name="Home"
       component={Home}
       options={{
         tabBarIcon: () => (
           <MaterialCommunityIcons name="home" style={styles.tabIcon} size={26} />
         ),
         headerStyle: {
           backgroundColor: '#FF8C00',
           height: 80, 
           
         },
         headerTintColor: '#EEF6D5',
         headerTitleStyle: {
           fontWeight: 'bold',
         },
         
         
       }}
     />
     <Tab.Screen
       name="Messages"
       component={Messages}
       options={{
         tabBarIcon: () => (
           <MaterialCommunityIcons name="message-text-outline" color={"white"} size={26} />
         ),
         headerStyle: {
           backgroundColor: '#FF8C00',
           height: 80, 
           
         },
         headerTintColor: '#EEF6D5',
         headerTitleStyle: {
           fontWeight: 'bold',
         },
       }}
     />
     <Tab.Screen
       name="Order"
       component={MannageOrder}
       options={{
         tabBarIcon: () => (
           <MaterialCommunityIcons name="list-status" color={"white"} size={26} />
         ),
         headerStyle: {
           backgroundColor: '#FF8C00',
           height: 80, 
           
         },
         headerTintColor: '#EEF6D5',
         headerTitleStyle: {
           fontWeight: 'bold',
         },
       }}
     />
     <Tab.Screen
       name="Profile"
       component={Profile}
       options={{
         tabBarIcon: () => (
           <MaterialCommunityIcons name="account" color={"white"} size={26} />
         ),
         headerStyle: {
           backgroundColor: '#FF8C00',
           height: 80, 
           
         },
         headerTintColor: '#EEF6D5',
         headerTitleStyle: {
           fontWeight: 'bold',
         },
       }}
     />
        </>
     :
    <>
       <Tab.Screen 
     name="Home"
     component={unauthhome}
     options={{
       tabBarIcon: () => (
         <MaterialCommunityIcons name="home" style={styles.tabIcon} size={26} />
       ),
       headerStyle: {
         backgroundColor: '#FF8C00',
         height: 80, 
         
       },
       headerTintColor: '#EEF6D5',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
       
       
     }}
   />
   <Tab.Screen
     name="Messages"
     component={unauthmsg}
     options={{
       tabBarIcon: () => (
         <MaterialCommunityIcons name="message-text-outline" color={"white"} size={26} />
       ),
       headerStyle: {
         backgroundColor: '#FF8C00',
         height: 80, 
         
       },
       headerTintColor: '#EEF6D5',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
     }}
   />
   <Tab.Screen
     name="Order"
     component={unauthorder}
     options={{
       tabBarIcon: () => (
         <MaterialCommunityIcons name="list-status" color={"white"} size={26} />
       ),
       headerStyle: {
         backgroundColor: '#FF8C00',
         height: 80, 
         
       },
       headerTintColor: '#EEF6D5',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
     }}
   />
   <Tab.Screen
     name="Profile"
     component={unauthprofile}
     options={{
       tabBarIcon: () => (
         <MaterialCommunityIcons name="account" color={"white"} size={26} />
       ),
       headerStyle: {
         backgroundColor: '#FF8C00',
         height: 80, 
         
       },
       headerTintColor: '#EEF6D5',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
     }}
   />  
    </>
      }
     
    </Tab.Navigator>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FF7F11', // Set the background color of the tab bar
    borderTopWidth: 0, // Set borderTopWidth to 0 to remove the white bar
    elevation: 0, // Set elevation to 0 to remove shadow on Android
  },
  tabIcon:{
    color:"#EEF6D5",
  }
});

