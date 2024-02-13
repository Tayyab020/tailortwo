import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native'; // Import StyleSheet from react-native

import Home from './Home';
import Messages from './Meesages';
import MannageOrder from './MannageOrder';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FF2D00', 
    borderRadius: 20, 
  },
});

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={styles.tabBar} // Apply styles to the tab bar
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={'black'} size={26} />
          ),
          headerShown: true, // Hide the title bar
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="message-text-outline" color={"white"} size={26} />
          ),
          headerShown: true, // Hide the title bar
        }}
      />
       <Tab.Screen
        name="MannageOrder"
        component={MannageOrder}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="list-status" color={"white"} size={26} />
          ),
          headerShown: true, // Hide the title bar
        }}
      />
       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color={"white"} size={26} />
          ),
          headerShown: true, // Hide the title bar
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// const Tab = createMaterialBottomTabNavigator();

// function BottomTab() {
//   return (
       
//     <NavigationContainer independent={true}>
//       <Tab.Navigator >
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Messages" component={Messages} />
//     </Tab.Navigator>
//     </NavigationContainer>
 
//   );
// }

// export default BottomTab;
