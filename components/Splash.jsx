import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, StatusBar, Animated } from 'react-native';

const SplashScreen = (props) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      props.navigation.navigate('BottomTab');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.Image
        source={require('../assets/tailorlogo.png')}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Tailor Hub
      </Animated.Text>
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
  logo: {
    width: '80%',
    resizeMode: 'contain',
    margin: 0,
  },
  title: {
    color: '#FF8C00',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    fontWeight: 'bold',
    fontSize: 40,
    position: 'absolute',
    top: '67%',
  },
});
