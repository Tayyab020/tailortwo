import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ToastAndroid, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { submitBlog } from '../api/internal';

const Updategig = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const author = useSelector((state) => state.user._id);

  const navigation = useNavigation();
  const route = useRoute();
  const { blog } = route.params;

  useEffect(() => {
    setContent(blog.content);
    setTitle(blog.title);
    setImage(blog.photoPath);
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
    console.log('Submit button clicked');
    const blogData = {
      title,
      author,
      content,
      photoPath: image,
    };
    console.log('Blog data:', blogData);
    try {
      const response = await submitBlog(blogData);
      console.log('Response:', response.data);

      if (response.status === 201) {
        ToastAndroid.show('Blog created', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        const errorMessage = response.data?.message || 'Error creating blog';
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error:', error.message);
      console.log('Error:', error);

      if (error.message === 'Network Error') {
        ToastAndroid.show('Network error. Please check your connection and try again.', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('An unexpected error occurred. Please try again.', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Gig</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        placeholderTextColor="#666"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Content"
        value={content}
        onChangeText={text => setContent(text)}
        multiline
        placeholderTextColor="#666"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF6D5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7F11',
  },
  input: {
    width: '100%',
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
