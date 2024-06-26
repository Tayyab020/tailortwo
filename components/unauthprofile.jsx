import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Unauthprofile = () => {
  const navigation = useNavigation();

  const navigateToHomeTab = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backImg} source={require("../assets/tailorlogo.png")} />
      <Text style={styles.ttext}>Join TailorHub</Text>
      <Text style={styles.ptext}>Join out growing freelance coomunity to offer your professional services connect with customers, and get paid on TailorHub's trusted platform.</Text>
      <TouchableOpacity onPress={navigateToHomeTab}>
        <Text style={styles.profileLink}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Unauthprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20, 
  },
  backImg: {
    width: 150,
    height: 150, 
  },
  ttext: {
    color: '#FF8C00',
    fontWeight: 'bold',
    marginTop: 10, 
  },
  ptext: {
    color: 'black',
    marginTop: 5, 
  },
  profileLink: {
    marginTop: 15,
    color: '#FF8C00',
  
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
