import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Switch } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppointment } from '../api/internal';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppointmentCard = ({ appointment }) => {
  const [isHomeDeliveryEnabled, setIsHomeDeliveryEnabled] = useState(appointment.homeDelivery || false);

  // Formatting date and time for better readability
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute} ${ampm}`;
  };

  return (
    <View style={styles.appointmentCard}>
      <View style={styles.customerContainer}>
        <Image
          source={{ uri: appointment.customer.profileImage }}
          style={styles.customerProfilePhoto}
        />
        <Text style={styles.customerName}>{appointment.customer.username}</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentDate}>{formatDate(appointment.date)}</Text>
        <Text style={styles.appointmentTime}>{formatTime(appointment.time)}</Text>
        <Text style={styles.appointmentDescription}>{appointment.description}</Text>
      </View>
      <View style={styles.locationContainer}>
        <Icon name="map-marker" size={20} color="#FF7F11" />
        <TextInput
          style={styles.locationInput}
          placeholder="Enter location"
          value={appointment.location}
          editable={false}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Home Delivery:</Text>
        <Switch
          value={isHomeDeliveryEnabled}
          onValueChange={(value) => setIsHomeDeliveryEnabled(value)}
          disabled
          thumbColor={isHomeDeliveryEnabled ? '#FF8C00' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#FF8C00' }}
        />
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="trash" size={20} color="#FF4D4D" />
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appointmentCard: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  customerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  customerProfilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  customerName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  appointmentDetails: {
    marginBottom: 15,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#999',
  },
  appointmentDescription: {
    fontSize: 14,
    marginTop: 5,
    color: '#777',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    height: 40,
    color: 'black',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    backgroundColor: '#f8f8f8',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    color: '#FF4D4D',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointment(user._id);
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={screenStyles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AppointmentCard appointment={item} />}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8EAF6',
  },
});

export default AppointmentsScreen;
