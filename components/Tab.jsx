// import React from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


// import Home from './Home';
// import Messages from './Messages';
// import MannageOrder from './Orders';
// import Profile from './Profile';

// import unauthhome from './unauthhome';
// import unauthmsg from './unauthmsg';
// import unauthorder from './unauthorder';
// import  unauthprofile from './unauthprofile';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../store/userSlice';
// import { useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Tab = createBottomTabNavigator();
// // const Tab = createMaterialBottomTabNavigator()
// function BottomTab() {
//   const getData=async()=>{
//     const jsonValue = await AsyncStorage.getItem('user');
//       const storedonStorage=JSON.parse(jsonValue) 
//       console.log("Async stored Sucessfully on Tab",storedonStorage)

//       dispatch(setUser(storedonStorage));
//   }
//   getData()
//   const dispatch = useDispatch();
//   const isAuthenticated=useSelector((state)=>state.user.auth)
//   console.log("isAuthenticated",isAuthenticated)

//   return (
    
//     <Tab.Navigator 
//       initialRouteName="Home"
//       barStyle={styles.tabBar} // Apply styles to the tab bar
      
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarActiveBackgroundColor:'orange',  
        
//         tabBarStyle: {
//           position: 'fixed',
//           backgroundColor: '#FF7F11',
//           marginBottom:5,
//           marginLeft:10,
//           marginRight:10,
//           borderRadius:15,
//           marginBottom:15,
//           height: 70, // Increase the height of the tab bar
//           elevation: 0, // Set elevation to 0 to remove shadow on Android
//         },
//         activeTintColor: 'orange', // Set active icon color to orange
//       }}
      
      
//     >

// {/* options={{
//           title: 'My home',
//           headerStyle: {
//             backgroundColor: '#FF8C00',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }} */}
//         {isAuthenticated?
//         <>
//             <Tab.Screen 
//        name="Home"
//        component={Home}
//        options={{
//          tabBarIcon: () => (
//            <MaterialCommunityIcons name="home" style={styles.tabIcon} size={26} />
//          ),
//          headerStyle: {
//            backgroundColor: '#FF8C00',
//            height: 80, 
           
//          },
//          headerTintColor: '#EEF6D5',
//          headerTitleStyle: {
//            fontWeight: 'bold',
//          },
         
         
//        }}
//      />
//      <Tab.Screen
//        name="Messages"
//        component={Messages}
//        options={{
//          tabBarIcon: () => (
//            <MaterialCommunityIcons name="message-text-outline" color={"white"} size={26} />
//          ),
//          headerStyle: {
//            backgroundColor: '#FF8C00',
//            height: 80, 
           
//          },
//          headerTintColor: '#EEF6D5',
//          headerTitleStyle: {
//            fontWeight: 'bold',
//          },
//        }}
//      />
//      <Tab.Screen
//        name="Order"
//        component={MannageOrder}
//        options={{
//          tabBarIcon: () => (
//            <MaterialCommunityIcons name="list-status" color={"white"} size={26} />
//          ),
//          headerStyle: {
//            backgroundColor: '#FF8C00',
//            height: 80, 
           
//          },
//          headerTintColor: '#EEF6D5',
//          headerTitleStyle: {
//            fontWeight: 'bold',
//          },
//        }}
//      />
//      <Tab.Screen
//        name="Profile"
//        component={Profile}
//        options={{
//          tabBarIcon: () => (
//            <MaterialCommunityIcons name="account" color={"white"} size={26} />
//          ),
//          headerShown: false, 
//          headerStyle: {
//            backgroundColor: '#FF8C00',
//            height: 80, 
           
//          },
//          headerTintColor: '#EEF6D5',
//          headerTitleStyle: {
//            fontWeight: 'bold',
//          },
//        }}
//      />
//         </>
//      :
//     <>
//        <Tab.Screen 
//      name="Home"
//      component={unauthhome}
//      options={{
//        tabBarIcon: () => (
//          <MaterialCommunityIcons name="home" style={styles.tabIcon} size={26} />
//        ),
//        headerStyle: {
//          backgroundColor: '#FF8C00',
//          height: 80, 
         
//        },
//        headerTintColor: '#EEF6D5',
//        headerTitleStyle: {
//          fontWeight: 'bold',
//        },
       
       
//      }}
//    />
//    <Tab.Screen
//      name="Messages"
//      component={unauthmsg}
//      options={{
//        tabBarIcon: () => (
//          <MaterialCommunityIcons name="message-text-outline" color={"white"} size={26} />
//        ),
//        headerStyle: {
//          backgroundColor: '#FF8C00',
//          height: 80, 
         
//        },
//        headerTintColor: '#EEF6D5',
//        headerTitleStyle: {
//          fontWeight: 'bold',
//        },
//      }}
//    />
//    <Tab.Screen
//      name="Order"
//      component={unauthorder}
//      options={{
//        tabBarIcon: () => (
//          <MaterialCommunityIcons name="list-status" color={"white"} size={26} />
//        ),
//        headerStyle: {
//          backgroundColor: '#FF8C00',
//          height: 80, 
         
//        },
//        headerTintColor: '#EEF6D5',
//        headerTitleStyle: {
//          fontWeight: 'bold',
//        },
//      }}
//    />
//    <Tab.Screen
//      name="Profile"
//      component={unauthprofile}
//      options={{
//        tabBarIcon: () => (
//          <MaterialCommunityIcons name="account" color={"white"} size={26} />
//        ),
//        headerStyle: {
//          backgroundColor: '#FF8C00',
//          height: 80, 
         
//        },
//        headerTintColor: '#EEF6D5',
//        headerTitleStyle: {
//          fontWeight: 'bold',
//        },
//      }}
//    />  
//     </>
//       }
     
//     </Tab.Navigator>
//   );
// }

// export default BottomTab;

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: '#FF7F11', // Set the background color of the tab bar
//     borderTopWidth: 0, // Set borderTopWidth to 0 to remove the white bar
//     elevation: 0, // Set elevation to 0 to remove shadow on Android
//   },
//   tabIcon:{
//     color:"#EEF6D5",
//   }
// });

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { login, refreshToken } from '../api'; // Import your login and refresh token functions

// Import your screen components
import Home from './Home';
import Messages from './Messages';
import ManageOrder from './Orders';
import Profile from './Profile';
import UnauthenticatedHome from './unauthhome';
import UnauthenticatedMessages from './unauthmsg';
import UnauthenticatedOrder from './unauthorder';
import UnauthenticatedProfile from './unauthprofile';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.auth);
  let isJwtExpired 

  useEffect(() => {
    const checkTokenExpirationAndRefresh = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const userT = await AsyncStorage.getItem('user')
        console.log(userT)
        
        if (userToken) {
          // Check if token is expired
          const tokenExpirationTime = await AsyncStorage.getItem('tokenExpirationTime');
          const currentTime = new Date().getTime();
           isJwtExpired = currentTime >= tokenExpirationTime;

          if (isAuthenticated && !isJwtExpired) {
            // Token not expired and user is authenticated, navigate to authenticated screens
          // You can also handle token refresh logic here if needed
          } else {
            // Either user is not authenticated or token is expired, navigate to unauthenticated screens
          }
        }
      } catch (error) {
        console.error('Error checking token expiration and refreshing:', error);
      }
    };

    checkTokenExpirationAndRefresh();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const storedUserData = JSON.parse(jsonValue);
        console.log("Async stored Successfully on Tab", storedUserData);
        dispatch(setUser(storedUserData));
      } catch (error) {
        console.error("Error retrieving user data from AsyncStorage:", error);
      }
    };

    getData();
  }, [dispatch]);

  return (
    <Tab.Navigator 
      initialRouteName="Home"
      barStyle={styles.tabBar}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: 'orange',
        tabBarStyle: {
          backgroundColor: '#FF7F11',
          marginBottom: 5,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 15,
          marginBottom: 0,
          height: 70,
          elevation:0,
        },
        activeTintColor: 'orange',
      }}
    >
      {/* Render authenticated screens if user is authenticated and token is not expired */}
      {isAuthenticated && !isJwtExpired ? (
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
       component={ManageOrder}
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
         headerShown: false, 
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
      ) : (
        <>
            <Tab.Screen 
             name="Home"
             component={UnauthenticatedHome}
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
             component={UnauthenticatedMessages}
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
             component={UnauthenticatedOrder}
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
             component={UnauthenticatedProfile}
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
      )}
    </Tab.Navigator>
  );
}

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

export default BottomTab;
