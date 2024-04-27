import React, { useState, useEffect } from 'react';
import {Button, Image,View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon,FAB, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAllBlogs } from "../api/internal";
import axios from 'axios';

const Home = () => {
  const navigation = useNavigation();
  const [gigs, setGigs] = useState([]);

  // useEffect(() => {
  //   const fetchGigs = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/blog/all');
  //       setGigs(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch gigs:', error);
  //       // Handle error gracefully, such as displaying a message to the user
  //     }
  //   };

  //   fetchGigs();
  // }, []);
  const [blogs, setBlogs] = useState([]);

 
  useEffect(() => {
    (async function getAllBlogsApiCall() {
      const response = await getAllBlogs();

      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    })();

    setBlogs([]);
  }, []);

  const navigateToOrder = () => {
    navigation.navigate('creategig');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.cardStyle}>
  <Card.Title title="HELLO WORLD" />
  <Card.Cover source={require('../assets/user.png')} />
  <Card.Content>
    <Text style={{marginBottom: 10}}>
      The idea with React Native Elements is more about component structure than actual design.
    </Text>
  </Card.Content>
  <Card.Actions>
    <Button onPress={() => console.log('Pressed')} title='VIEW NOW' color='#ffffff' />
  </Card.Actions>
</Card>
<FAB
        style={styles.fab}
        icon="plus"
        onPress={navigateToOrder}
      />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    resizeMode: 'cover',
    backgroundColor: 'black',
  },
  cardStyle: {
    width: '100%', // Adjust the width as needed
    marginVertical: 10, // Adds some vertical spacing between cards
    // Add any other styling you need for the card
  },
  fab: {
    position:'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: '#FF8C00',
  },

});


export default Home;