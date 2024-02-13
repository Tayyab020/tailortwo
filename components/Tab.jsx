import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native'; // Import StyleSheet from react-native
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Home from './Home';
import Messages from './Messages';
import MannageOrder from './Orders';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

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

            <MaterialCommunityIcons name="home" color={'black'} size={26} style={styles.tabIcon} />
          ),
          headerShown: true, 
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          
          tabBarIcon: () => (
            <MaterialCommunityIcons name="message-text-outline" color={"white"} size={26} />
          )
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




const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FF8C00', 
   
  },
});


// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// const Tab = createMaterialBottomTabNavigator();

// function BottomTab() {
//   return (
       

//       <Tab.Navigator >
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Messages" component={Messages} />
//     </Tab.Navigator>
 
//   );
// }

// export default BottomTab;



// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function BottomTab() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Messages" component={Messages} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }