import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const UpdateBlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
  });

  const navigation = useNavigation(); 

  const handleSubmit = async() => { // Removed props from the argument
    console.log('Form data:', formData);
    try {
      const response = await axios.post("http://10.0.2.2:3000/blog", formData);
      console.log("Gig created successfully", response.data);
      navigation.navigate('Home'); // Use navigation directly
    } catch (error) {
      console.log("Failed to create Gig ", error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        onChangeText={text => setFormData({ ...formData, title: text })}
        value={formData.title}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default UpdateBlogForm;