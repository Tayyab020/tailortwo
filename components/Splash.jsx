import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/tailorFull.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
