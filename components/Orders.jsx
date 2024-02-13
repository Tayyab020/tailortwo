import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ManageOrder = () => {
  const navigation = useNavigation();

  const navigateToProfileTab = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backImg} source={require("../assets/tailorlogo.png")} />
      <Text style={styles.ttext}>Find all your orders here</Text>
      <Text style={styles.ptext}>Keep an eye out for your first order soon!</Text>
      <TouchableOpacity onPress={navigateToProfileTab}>
        <Text style={styles.profileLink}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ManageOrder;

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
