import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

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

  const handleSubmit = () => {
    // Here, you can use the title, description, and image for further processing, such as sending them to a server or saving locally.
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Image:', image);
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
        value={description}
        onChangeText={text => setDescription(text)}
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
