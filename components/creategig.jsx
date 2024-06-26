import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ToastAndroid, Text, Modal, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { submitBlog } from '../api/internal';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const author = useSelector((state) => state.user._id);
  const navigation = useNavigation();

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
      price,
      photoPath: image,
    };

    try {
      console.log(blogData);
      const response = await submitBlog(blogData);

      if (response.status === 201) {
        ToastAndroid.show('Blog created', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        const errorMessage = response.data?.message || 'Error creating blog';
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    } catch (error) {
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
        <Text style={styles.title}>Create a New Gig</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={text => setTitle(text)}
          placeholderTextColor="#666"
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
        <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
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
    color:'black',
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
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF7F11',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateBlog;
