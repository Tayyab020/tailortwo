import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserDetails, updateUserDetails } from '../api/internal';
import { setUser } from '../store/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const UserDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const loggedInUser = useSelector((state) => state.user);
  const [user, setUserState] = useState({});
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [availabilityTimeFrom, setAvailabilityTimeFrom] = useState('');
  const [availabilityTimeTo, setAvailabilityTimeTo] = useState('');
  const [editing, setEditing] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const { userId } = route.params;
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(userId);
        if (response.status === 200) {
          const userData = response.data;
          setUserState(userData);
          setAddress(userData.address || '');
          setPhoneNumber(userData.phoneNumber || '');
          setAvailabilityTimeFrom(userData.availabilityTimeFrom || '');
          setAvailabilityTimeTo(userData.availabilityTimeTo || '');
          setEditing(false);
        } else {
          ToastAndroid.show('Failed to fetch user details', ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show(`Error: ${error.response?.data?.message || error.message}`, ToastAndroid.SHORT);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSave = async () => {
    if (!address || !phoneNumber || !availabilityTimeFrom || !availabilityTimeTo) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }

    try {
      const updatedUser = {
        ...user,
        address,
        phoneNumber,
        availabilityTimeFrom,
        availabilityTimeTo,
      };

      const response = await updateUserDetails(user._id, updatedUser);
      if (response.status === 200) {
        dispatch(setUser(updatedUser));
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        ToastAndroid.show('Details updated successfully', ToastAndroid.SHORT);
        setEditing(false);
        navigation.navigate('Profile'); // Navigate to Profile screen
      } else {
        ToastAndroid.show('Failed to update details', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(`Error: ${error.response?.data?.message || error.message}`, ToastAndroid.SHORT);
    }
  };

  const onFromTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || availabilityTimeFrom;
    setShowFromTimePicker(Platform.OS === 'ios');
    setAvailabilityTimeFrom(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const onToTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || availabilityTimeTo;
    setShowToTimePicker(Platform.OS === 'ios');
    setAvailabilityTimeTo(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.absolute} />
      <View style={styles.content}>
        <Image source={user.profileImage ? { uri: user.profileImage } : require('../assets/user.png')} style={styles.profileImage} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>

        {editing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              placeholderTextColor="#aaa"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              placeholderTextColor="#aaa"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Availability Time From"
              placeholderTextColor="#aaa"
              value={availabilityTimeFrom}
              onFocus={() => setShowFromTimePicker(true)}
            />
            <TextInput
              style={styles.input}
              placeholder="Availability Time To"
              placeholderTextColor="#aaa"
              value={availabilityTimeTo}
              onFocus={() => setShowToTimePicker(true)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.detail}>Address: {user.address}</Text>
            <Text style={styles.detail}>Phone Number: {user.phoneNumber}</Text>
            <Text style={styles.detail}>Availability: {user.availabilityTimeFrom} - {user.availabilityTimeTo}</Text>
            {loggedInUser._id === user._id ? (
              <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {showFromTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onFromTimeChange}
        />
      )}
      {showToTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onToTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF7F11',
    fontFamily: 'Poppins-Bold',
  },
  email: {
    fontSize: 16,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
    color: 'black',
    width: '100%',
  },
  button: {
    backgroundColor: '#FF7F11',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetailsScreen;
