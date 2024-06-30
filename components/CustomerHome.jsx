import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput,
  KeyboardAvoidingView, Platform, ToastAndroid, Dimensions, Animated
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
  const fadeAnim = new Animated.Value(0);

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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
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

  const defaultProfileImage = 'https://www.example.com/default-profile.png';

  const tailorImages = [
    'https://res.cloudinary.com/daybsp2pi/image/upload/v1717830544/slider/jp1ebbik8klez1dq3y7y.webp',
    'https://res.cloudinary.com/daybsp2pi/image/upload/v1717830545/slider/orzdveh8glctpartijt1.webp',
    'https://res.cloudinary.com/daybsp2pi/image/upload/v1717830543/slider/gmroyd8yerkri7corkmt.webp'
  ];

  return (
    <Provider>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  swiperContainer: {
    marginTop: 8,
    height: 250,
    backgroundColor: '#FF7F11',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
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
    elevation: 3,
    padding: 10,
    transition: 'transform 0.3s ease',
  },
  cardDetail: {
    alignItems: 'center',
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
