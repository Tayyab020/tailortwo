import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const navigateToHomeTab = () => {
    // Navigate to the desired tab
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backImg} source={require("../assets/tailorlogo.png")} />
      <Text style={styles.ttext}>Find all your Gigs here</Text>
      <Text style={styles.ptext}>Keep an eye out for your Gigs</Text>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
}

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
  fab: {
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      color:"white",
      placement:"right",
      backgroundColor: '#FF8C00', // Customize button color
    },
  
  },
});

export default Home;
