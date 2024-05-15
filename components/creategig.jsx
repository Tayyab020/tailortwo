import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import {submitBlog} from"../api/internal"
import axios from 'axios';
const App = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const author=useSelector((state)=>state.user._id)
  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        setImage(response.uri);
      }
    });
  };

  const handleSubmit = async() => { 
   
    const userData = {
      author,
      title: title,
      content: content,
      // image: image,
    };
   
    try{
      console.log(userData)
         const response=await submitBlog(userData)
      // const response=await axios.post("http://10.0.2.2:3000/create",userData)   
    
      console.log("gig created successfully",response.data)
      
      if (response.status === 201) {
        // console.log(`setUser success`,user)
        // 2. redirect -> homepage
        props.navigation.navigate('BottomTab');
        ToastAndroid.show('Gig created', ToastAndroid.SHORT);
      
      } else if (response.code === "ERR_BAD_REQUEST") {
        // display error message
        // setError(response.response.data.message);
      }
    }
     catch (error) {
      console.log("Gig creation failed ",error.message)
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
   
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={content}
        onChangeText={text => setContent(text)}
        multiline
      />
      <TouchableOpacity style={styles.imageContainer} onPress={handleChoosePhoto}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Button title="Choose Image" onPress={handleChoosePhoto} />
        )}
      </TouchableOpacity>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default App;
