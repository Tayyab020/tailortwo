import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ToastAndroid, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateBlog } from '../api/internal'; // Ensure this is the correct import for your update function

const Updategig = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const author = useSelector((state) => state.user._id);

  const navigation = useNavigation();
  const route = useRoute();
  const { blog } = route.params;

  useEffect(() => {
    setContent(blog.content);
    setTitle(blog.title);
    setImage(blog.photoPath);
    setPrice(blog.price ? blog.price.toString() : ''); // Convert price to string and handle undefined
  }, [blog]);

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.5, includeBase64: true });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const base64 = `data:${asset.type};base64,${asset.base64}`;
      setImage(base64);
    }
  };

  const handleSubmit = async () => {
    const blogData = {
      title,
      author,
      content,
      photo: image,
      price,
      blogId: blog._id // Ensure blogId is included in the data
    };
    try {
     
      const response = await updateBlog(blogData);
            if (response.status === 200) {
        ToastAndroid.show('Blog updated!', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        const errorMessage = response.data?.message || 'Error updating blog';
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error during blog update:', error);
      if (error.message === 'Network Error') {
        ToastAndroid.show('Network error. Please check your connection and try again.', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('An unexpected error occurred. Please try again.', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Update Gig</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={text => setTitle(text)}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={text => setPrice(text)}
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Content"
          value={content}
          onChangeText={text => setContent(text)}
          multiline
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.imageButton} onPress={handleChoosePhoto}>
          <Text style={styles.imageButtonText}>Choose Image</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change the alpha for more or less 'blur'
  },
  container: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center', // Center horizontally in the parent
    marginTop: 'auto', // Center vertically: push to the middle
    marginBottom: 'auto', // Center vertically: push to the middle
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7F11',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    color: 'black',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  imageButton: {
    backgroundColor: '#FF7F11',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imageButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF7F11',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Updategig;
