import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
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
