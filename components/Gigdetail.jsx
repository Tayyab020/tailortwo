import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const GigDetail = ({ route }) => {
  const { blog } = route.params;
  const navigation = useNavigation();
  const currentUserId = useSelector((state) => state.user._id);

  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOrderPress = () => {
    navigation.navigate('OrderGig', { blog });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
        <Image 
          source={{ uri: blog.photoPath }} 
          style={styles.image} 
          resizeMode="contain"  // Changed to 'contain' for full image display
        />
      </Animated.View>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: blog.authorPhotoPath }} 
            style={styles.profileImage} 
          />
          <Text style={styles.username}>{blog.username}</Text>
        </View>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.description}>{blog.content}</Text>
        {currentUserId !== blog.author && ( 
          <TouchableOpacity style={styles.orderButton} onPress={handleOrderPress}>
            <Text style={styles.orderButtonText}>Order this Gig</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  contentContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: -10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    color: '#333',
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    fontSize: 16,
    marginBottom: 20,
  },
  orderButton: {
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
    elevation: 3,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GigDetail;
