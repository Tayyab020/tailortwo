
import React from 'react';
import { ScrollView,View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import {Button} from 'react-native';
import { Icon,FAB, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAllBlogs } from "../api/internal";
import axios from 'axios';


import store from '../store/store'; // Import the store
const currentState = store.getState();
console.log(currentState);

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await getAllBlogs()
        // console.log(response);
        
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error('Failed to fetch gigs:', error);
        // Handle error gracefully, such as displaying a message to the user
      }
    };

    fetchGigs([]);
  }, []);

  const navigation = useNavigation();
  
 

  const navigateToOrder = () => {
    navigation.navigate('creategig');
  };
  return (
    <View style={styles.container}>
      
<ScrollView style={styles.ScrollView}>
       {blogs.map((blog, index) => (
         <TouchableOpacity  key={index} style={styles.cardcontainer}>
         <View style={styles.imageContainer}>
           {/* React Native doesn't support SVG directly like in web, so you might need to use an image or a library like react-native-svg */}
           <Image  source={require('../assets/sewing-machine.png')}
              style={styles.image} />
         </View>
         <Text style={styles.title}>{blog.title}</Text>
         <Text style={styles.subtitle}>  {blog.content}.</Text>
         <View style={styles.orderNowContainer}>
           <Text style={styles.price}>$21.00</Text>
           <TouchableOpacity style={styles.orderButton}>
             <Text style={styles.orderButtonText}>Order Now</Text>
           </TouchableOpacity>
         </View>
         </TouchableOpacity>
       ))}
         
       </ScrollView>
      
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop:0,
    paddingBottom: 0,
    width:"100%",
    overflow: 'hidden',
  },
  ScrollView: {
    width:"100%",
    height:"100%",
  },
  cardcontainer: {
    margin: 8,
    backgroundColor: '#EEF6D5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    // Adjust your image container style
  },
  image: {
    width: 124,
    height: 124,
    borderRadius: 62, // to make it round
  },
  title: {
    color: '#FF7F11',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  subtitle: {
    color: '#808080',
    fontSize: 14,
    marginTop: 5,
  },
  orderNowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  price: {
    color: '#FF7F11',
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#FF7F11',
    padding: 10,
    borderRadius: 20,
  },
  orderButtonText: {
    color: '#EEF6D5',
    fontWeight: 'bold',
  },

});

export default Home;