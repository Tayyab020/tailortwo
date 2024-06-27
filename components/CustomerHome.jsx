import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput,
  KeyboardAvoidingView, Platform, ToastAndroid, Dimensions
} from 'react-native';
import { FAB, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { getAllBlogs, deleteBlog, getProfileImage } from '../api/internal';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

const { width: screenWidth } = Dimensions.get('window');

const CustomerHome = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [visibleMenus, setVisibleMenus] = useState({});
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [imageHeights, setImageHeights] = useState({});

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await getProfileImage(user._id);
        if (response.status === 200) {
          setProfileImage(response.data.profileImage);
          dispatch(setUser({ ...user, profileImage: response.data.profileImage }));
        } else {
          console.error('Failed to fetch profile image, status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    if (!user.profileImage && user._id) {
      fetchProfileImage();
    }
  }, [user, dispatch]);

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

  useEffect(() => {
    const getImageHeights = () => {
      tailorImages.forEach((image, index) => {
        Image.getSize(image, (width, height) => {
          const imageHeight = (screenWidth * height) / width;
          setImageHeights((prevHeights) => ({
            ...prevHeights,
            [index]: imageHeight,
          }));
        });
      });
    };

    getImageHeights();
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

  const navigateToLocationSelection = () => {
    navigation.navigate('LocationSelection');
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

  const tailorImages = [
    'https://res.cloudinary.com/daybsp2pi/image/upload/v1717830544/slider/jp1ebbik8klez1dq3y7y.webp', // Replace with actual URLs of your images
    'https://res.cloudinary.com/daybsp2pi/image/upload/v1717830545/slider/orzdveh8glctpartijt1.webp',
    'https://res.cloudinary.com/daybsp2pi/image/upload/v1717830543/slider/gmroyd8yerkri7corkmt.webp'
  ];

  return (
    <Provider>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <View>
            <Text style={styles.username}>{user.username}</Text>
          </View>
          <Image
            source={{ uri: profileImage ? profileImage : defaultProfileImage }}
            style={styles.profileImage}
          />
        </View>
       
        <View style={styles.swiperContainer}>
          <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} autoplayTimeout={3}>
            {tailorImages.map((image, index) => (
              <View key={index} style={[styles.slide, { height: imageHeights[index] || 200 }]}>
                <Image source={{ uri: image }} style={styles.slideImage} />
              </View>
            ))}
          </Swiper>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.popularItems}>
            {blogs.map((blog, index) => (
                <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => navigateToDetail(blog)}>
                
                <Image source={{ uri: blog.photoPath }} style={styles.itemImage} />
                
                <View style={styles.cardDetail}>
                  <Text style={styles.itemTitle}>{blog.title}</Text>
                  <Text style={styles.itemPrice}>Rs. {blog.price}</Text>
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FF7F11',
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  txt:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  swiperContainer: {
    marginTop:8,
    height: 250,
    backgroundColor: '#FF7F11',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  popularItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 6,
  },
  cardContainer: {
    width: '45%',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    padding: 10,
  },
  cardDetail: {
    
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
   
  },
  itemPrice: {
    marginTop: 6,
    color: '#FF7F11',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF7F11',
  },
});

export default CustomerHome;

