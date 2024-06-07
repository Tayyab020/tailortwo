import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { FAB, Menu, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAllBlogs, deleteBlog } from '../api/internal';

const CustomerHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleMenus, setVisibleMenus] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const navigation = useNavigation();

  const navigateToDetail = (blog) => {
    navigation.navigate('Gigdetail', { blog });
  };

  const navigateToEdit = (blog) => {
    navigation.navigate('updategig', { blog });
  };

  const navigateToCreate = () => {
    navigation.navigate('creategig');
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      ToastAndroid.show('Deleted', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const openMenu = (index) => setVisibleMenus(prevState => ({ ...prevState, [index]: true }));
  const closeMenu = (index) => setVisibleMenus(prevState => ({ ...prevState, [index]: false }));

  const defaultProfileImage = 'https://www.example.com/default-profile.png'; // Replace with actual URL of your default image

  return (
    <Provider>
      <View style={styles.container}>
      <View style={styles.banner}>
            <Text style={styles.bannerText}>The Fastest In Delivery Food</Text>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        <ScrollView style={styles.scrollView}>
          
         
          <View style={styles.popularSection}>
            <Text style={styles.sectionTitle}>Popular Now</Text>
          
          </View>
          <View style={styles.popularItems}>
            {blogs.map((blog, index) => (
              <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => navigateToDetail(blog)}>
                <Image source={{ uri: blog.photoPath }} style={styles.itemImage} />
                <View style={styles.cardDetail}>
                <Text style={styles.itemTitle}>{blog.title}</Text>
                <Text style={styles.itemPrice}>${blog.price}</Text>
                </View>
                
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          color="#EEF6D5"
          onPress={navigateToCreate}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:6
  },


  scrollView: {
    flex: 1,
  },
  banner: {
    padding: 30,
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    height:150,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },

  popularSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  popularItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cardContainer: {
    width: '45%',
    marginVertical: 10,
    backgroundColor: '#EEF6D5',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  cardDetail:{
    flex: 1,
  },
  itemImage: {
    width: '100%',
    height:200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  
  
  itemTitle: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  itemPrice: {
    marginTop: 6,
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF8C00',
  },
});

export default CustomerHome;
