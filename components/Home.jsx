import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAllBlogs } from '../api/internal';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        console.log('Fetched blogs:', response.data.blogs);
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  });

  const navigation = useNavigation();

  const navigateToDetail = (blog) => {
    navigation.navigate('GigDetail', { blog });
  };

  const navigateToOrder = () => {
    navigation.navigate('creategig');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {blogs.map((blog, index) => (
          <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => navigateToDetail(blog)}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: blog.photoPath }} 
                style={styles.image} 
                resizeMode="cover"
                onError={() => console.log('Failed to load image')}
              />
            </View>
            <View style={styles.profileContainer}>
              <Image 
                source={{ uri: blog.photoPath }} 
                style={styles.profileImage} 
              />
              <Text style={styles.username}>{blog.username}</Text>
            </View>
            <Text style={styles.title}>{blog.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color="#EEF6D5"
        onPress={navigateToOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%',
    overflow: 'hidden',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    margin: 8,
    backgroundColor: '#EEF6D5',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft:10,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    color: 'black',
    fontSize: 20,
    margin:10,
    textAlign: 'left',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF8C00',
  },
});

export default Home;
