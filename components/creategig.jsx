import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ToastAndroid, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { submitBlog } from "../api/internal";
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
    console.log('Submit button clicked');
    
    const blogData = {
      author,
      title,
      content,
      photoPath: image, // Use the selected image
    };
    console.log('Blog data:', blogData);

    try {
      const response = await submitBlog(blogData);
      console.log('Response:', response);
      if (response.status === 201) {
        ToastAndroid.show('Blog created', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        ToastAndroid.show('Error creating blog', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
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

export default CreateBlog;
