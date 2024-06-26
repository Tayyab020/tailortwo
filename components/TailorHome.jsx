import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { FAB, Menu, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAllBlogs, deleteBlog } from '../api/internal';
import { useSelector } from 'react-redux';

const TailorHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleMenus, setVisibleMenus] = useState({});
  const id = useSelector(state => state.user._id);

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

  return (
    <Provider>
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
                  source={{ uri: blog.authorPhotoPath }} 
                  style={styles.profileImage} 
                />
                <Text style={styles.username}>{blog.username}</Text>
                <Menu
                  visible={visibleMenus[index]}
                  onDismiss={() => closeMenu(index)}
                  anchor={
                    <TouchableOpacity onPress={() => openMenu(index)}>
                      <Text style={styles.menuDots}>•••</Text>
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item onPress={() => navigateToEdit(blog)} title="Edit" />
                  <Menu.Item onPress={() => handleDelete(blog._id)} title="Delete" />
                </Menu>
              </View>
              <Text style={styles.title}>{blog.title}</Text>
            </TouchableOpacity>
          ))}
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
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    width: '100%',
  },
  cardContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  menuDots: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF8C00',
  },
});

export default TailorHome;
