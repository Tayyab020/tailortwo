import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = props => {
  // const [isAuthenticated,setisAuthenticated]=useState(false)
  //  const getData=async()=>{
  //   const jsonValue = await AsyncStorage.getItem('user');
  //     const storedonStorage=JSON.parse(jsonValue) 
  //     console.log("Async stored Sucessfully on splash",storedonStorage)

  //     dispatch(setUser(jsonValue));
  // }
  // getData()
  // const dispatch = useDispatch();
  // const isAuthenticated=useSelector((state)=>state.user.auth)
  useEffect(() => {
    setTimeout(async () => {
      props.navigation.navigate('BottomTab');
     
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/tailorlogo.png')}
        style={{width: '80%', resizeMode:'contain', margin: 0}}
      />
      <Text style={styles.title}>
        Tailor Hub
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
   
  },
  title:{
    color:"orange",
    backgroundColor: "white",
    borderRadius:10,
    padding:5,
    paddingBottom:0,
    paddingTop:0,
    fontWeight:"bold", 
    fontSize:40,
    margin:0,
    position: 'absolute',
    top:"67%",
    
  }
});
