import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createAppointment } from '../api/internal';
import { FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

const GigDetail = ({ route }) => {
  const { blog } = route.params;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);

  const customer = useSelector((state) => state.user._id);

  // useEffect(() => {
  //   const fetchProfileImage = async () => {
  //     try {
  //       const response = await getProfileImage(user._id);
  //       if (response.status === 200) {
  //         setProfileImage(response.data.profileImage);
  //       } else {
  //         console.error('Failed to fetch profile image, status:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching profile image:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (user && user._id) {
  //     fetchProfileImage();
  //   }
  // }, [user]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleAppointmentSubmit = async () => {
    try {
      const appointmentData = {
        date: date.toISOString().split('T')[0],
        time: date.toTimeString().split(' ')[0],
        tailor: blog.author, // Assuming tailor ID is part of the blog object
        customer: customer, // Replace with the actual customer ID
        description,
      };
      console.log('Sending appointment data:', appointmentData);

      const response = await createAppointment(appointmentData);
      if (response.status === 201) {
        alert('Appointment created successfully!');
      } else {
        console.error('Failed to create appointment, status code:', response.status);
      }
    } catch (error) {
      console.error('Error creating appointment:', error.response ? error.response.data : error.message);
    }
  };

  const navigation = useNavigation();

  const navigateToMessages = () => {
    navigation.navigate('Gigdetail');
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: blog.photoPath }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: blog.authorPhotoPath }} 
            style={styles.profileImage} 
          />
          <Text style={styles.username}>{blog.username}</Text>
        </View>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.description}>{blog.content}</Text>
        <TouchableOpacity style={styles.orderButton} onPress={() => setShowDescriptionInput(true)}>
          <Text style={styles.orderButtonText}>Order this Gig</Text>
        </TouchableOpacity>
        {showDescriptionInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
            />
            <Button onPress={showDatepicker} title="Pick Date" />
            <Button onPress={showTimepicker} title="Pick Time" />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Button onPress={handleAppointmentSubmit} title="Confirm Appointment" />
          </View>
        )}
      </View>
      {/* <TouchableOpacity style={styles.chatIcon} onPress={navigateToMessages}>
        <Icon name="chatbubble-outline" size={30} color="#000" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginVertical: 10,
    textAlign: 'left',
  },
  description: {
    color: 'black',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
  },
  orderButton: {
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
  },
});

export default GigDetail;
