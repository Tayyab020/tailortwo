import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

;


import Home from './Home';
import Messages from './Messages';
import MannageOrder from './Orders';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator()
function BottomTab() {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      barStyle={styles.tabBar} // Apply styles to the tab bar
      
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor:'orange',
        
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FF8C00', // Change the background color of the tab bar
          margin:10,
          marginBottom:5,
          borderRadius:15,
          
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
          headerTintColor: 'white',
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
          headerTintColor: 'white',
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
          headerTintColor: 'white',
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
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FF8C00', 
  },
  tabIcon:{
    color:"white",
  }
});

