import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform, Switch, ToastAndroid, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createAppointment } from '../api/internal';

const OrderGig = ({ route }) => {
  const { blog } = route.params;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [visitMode, setVisitMode] = useState('shop');
  const [deliveryMode, setDeliveryMode] = useState('pickup');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const customer = useSelector((state) => state.user._id);
  const navigation = useNavigation();

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

  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const handleAppointmentSubmit = async () => {
    try {
      const appointmentData = {
        date: date.toISOString().split('T')[0],
        time: date.toTimeString().split(' ')[0],
        tailor: blog.author,
        customer: customer,
        description,
        visitMode,
        deliveryMode,
        address,
        phoneNumber,
      };

      const response = await createAppointment(appointmentData);
      if (response.status === 201) {
        showToast('Appointment created successfully!');
        navigation.navigate('Home');
      } else {
        showToast('Failed to create appointment, please try again.');
      }
    } catch (error) {
      showToast('Error creating appointment, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Order Gig</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.dateTimeContainer}>
          <Text style={styles.label}>Selected Date: {date.toISOString().split('T')[0]}</Text>
          <Text style={styles.label}>Selected Time: {date.toTimeString().split(' ')[0]}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={showDatepicker} title="Pick Date" color="#FF8C00" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={showTimepicker} title="Pick Time" color="#FF8C00" />
        </View>
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

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Visit Mode:</Text>
          <Switch
            value={visitMode === 'home'}
            onValueChange={(value) => setVisitMode(value ? 'home' : 'shop')}
            thumbColor={visitMode === 'home' ? '#FF8C00' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#FF8C00' }}
          />
          <Text style={styles.switchText}>{visitMode === 'home' ? 'Tailor comes to you' : 'You go to shop'}</Text>
        </View>
        {visitMode === 'home' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              placeholderTextColor="#666"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#666"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </>
        )}

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Delivery Mode:</Text>
          <Switch
            value={deliveryMode === 'home'}
            onValueChange={(value) => setDeliveryMode(value ? 'home' : 'pickup')}
            thumbColor={deliveryMode === 'home' ? '#FF8C00' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#FF8C00' }}
          />
          <Text style={styles.switchText}>{deliveryMode === 'home' ? 'Tailor delivers to you' : 'You pick up'}</Text>
        </View>
        {deliveryMode === 'home' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter delivery address"
              placeholderTextColor="#666"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter delivery phone number"
              placeholderTextColor="#666"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </>
        )}

        <View style={styles.buttonContainer}>
          <Button onPress={handleAppointmentSubmit} title="Confirm Appointment" color="#FF8C00" />
        </View>
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
  content: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
  dateTimeContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  switchText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  },
});

export default OrderGig;
