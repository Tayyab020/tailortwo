import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateUserDetails } from '../api/internal';
import { setUser } from '../store/userSlice';

const UserDetailsScreen = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [address, setAddress] = useState(user.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [availabilityTimeFrom, setAvailabilityTimeFrom] = useState(user.availabilityTimeFrom || '');
  const [availabilityTimeTo, setAvailabilityTimeTo] = useState(user.availabilityTimeTo || '');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user.address || !user.phoneNumber || !user.availabilityTimeFrom || !user.availabilityTimeTo) {
      setEditing(true);
    }
  }, [user]);

  const handleSave = async () => {
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
        ToastAndroid.show('Details updated successfully', ToastAndroid.SHORT);
        navigation.navigate('Profile');
      } else {
        ToastAndroid.show('Failed to update details', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.absolute} />
      <View style={styles.content}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        
        {editing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Availability Time From"
              value={availabilityTimeFrom}
              onChangeText={setAvailabilityTimeFrom}
            />
            <TextInput
              style={styles.input}
              placeholder="Availability Time To"
              value={availabilityTimeTo}
              onChangeText={setAvailabilityTimeTo}
            />
            <Button title="Save" onPress={handleSave} />
          </>
        ) : (
          <>
            <Text style={styles.detail}>Address: {address}</Text>
            <Text style={styles.detail}>Phone Number: {phoneNumber}</Text>
            <Text style={styles.detail}>Availability: {availabilityTimeFrom} - {availabilityTimeTo}</Text>
            <Button title="Edit" onPress={() => setEditing(true)} />
          </>
        )}
      </View>
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
  },
});

export default UserDetailsScreen;
