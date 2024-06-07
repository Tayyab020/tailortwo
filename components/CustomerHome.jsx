import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { FAB, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAllBlogs, deleteBlog } from '../api/internal';
import { useSelector, useDispatch } from 'react-redux';
const CustomerHome = () => {
  const user = useSelector((state) => state.user);
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
  },[]);

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
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <View>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.location}>🌍 Location</Text>
          </View>
    
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        </View>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search coffee"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.banner}>
            <Text style={styles.bannerText}>Buy one get one Free</Text>
          </View>
        <ScrollView style={styles.scrollView}>
    
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
      </KeyboardAvoidingView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 6
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f8f8f8',
    height: 100,
  },
 username :{
  color: 'black',
  fontWeight:'bold',
  margin:6
  },
  location: {
    fontSize: 16,
    color: '#333',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    padding: 20,
    backgroundColor: '#wF8FAFB',
    borderRadius: 10,
    alignItems: 'center',
    margin: 6,
    height: 150,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  popularItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cardContainer: {
    width: '45%',
    marginVertical: 10,
    backgroundColor: '#F8FAFB',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  cardDetail: {
    flex: 1,
  },
  itemImage: {
    width: '100%',
    height: 200,
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
