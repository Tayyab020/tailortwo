import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Switch, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAppointment, getCustomerAppointments, deleteAppointment } from '../api/internal';
import { useNavigation } from '@react-navigation/native';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [customerAppointments, setCustomerAppointments] = useState([]);
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAppointments();
  }, [appointments, setAppointments]);

  const fetchAppointments = async () => {
    try {
      const [appointmentResponse, customerAppointmentResponse] = await Promise.all([
        getAppointment(user._id),
        getCustomerAppointments(user._id),
      ]);
      setAppointments(appointmentResponse.data.appointments);
      setCustomerAppointments(customerAppointmentResponse.data.appointments);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
      setCustomerAppointments(customerAppointments.filter((appointment) => appointment._id !== appointmentId));
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const navigateToHomeTab = () => {
    navigation.navigate('Home'); // Adjust this according to your navigation setup
  };

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

  const renderAppointment = (appointment, isCustomer) => {
    const isHomeDeliveryEnabled = appointment.deliveryMode === 'home';
    const profileImage = isCustomer ? appointment.tailor.profileImage : appointment.customer.profileImage;
    const username = isCustomer ? appointment.tailor.username : appointment.customer.username;

    const handleDeletePress = () => {
      Alert.alert(
        "Delete Appointment",
        "Are you sure you want to delete this appointment?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: () => handleDelete(appointment._id),
            style: "destructive"
          }
        ]
      );
    };

    return (
      <View key={appointment._id} style={styles.appointmentCard}>
        <View style={styles.customerContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.customerProfilePhoto}
          />
          <Text style={styles.customerName}>{username}</Text>
        </View>
        <View style={styles.appointmentDetails}>
          <Text style={styles.appointmentDate}>{formatDate(appointment.date)}</Text>
          <Text style={styles.appointmentTime}>{formatTime(appointment.time)}</Text>
          <Text style={styles.appointmentDescription}>{appointment.description}</Text>
        </View>
        <Text style={styles.detailLabel}>Visit Mode: {appointment.visitMode === 'home' ? 'Home' : 'Shop'}</Text>
        <Text style={styles.detailLabel}>Delivery Mode: {appointment.deliveryMode === 'home' ? 'Home' : 'Pickup'}</Text>
        {appointment.visitMode === 'home' && (
          <>
            <Text style={styles.detailLabel}>Address: {appointment.address}</Text>
            <Text style={styles.detailLabel}>Phone Number: {appointment.phoneNumber}</Text>
          </>
        )}
        {appointment.deliveryMode === 'home' && appointment.visitMode !== 'home' && (
          <>
            <Text style={styles.detailLabel}>Delivery Address: {appointment.address}</Text>
            <Text style={styles.detailLabel}>Delivery Phone Number: {appointment.phoneNumber}</Text>
          </>
        )}
   
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleDeletePress}>
            <Icon name="trash" size={20} color="#FF4D4D" />
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.scrview}>
      <ScrollView style={styles.container}>
        {appointments.length > 0 && <Text style={styles.sectionHeader}>Appointments with You</Text>}
        {appointments.map((appointment) => renderAppointment(appointment, false))}
        {customerAppointments.length > 0 && <Text style={styles.sectionHeader}>Appointments You Booked</Text>}
        {customerAppointments.map((appointment) => renderAppointment(appointment, true))}
        {appointments.length === 0 && customerAppointments.length === 0 && (
          <View style={styles.containernoapp}>
            <Image style={styles.backImg} source={require("../assets/tailorlogo.png")} />
            <Text style={styles.ttext}>No Appointment</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
  },
  scrview: {
    flex: 1,
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'grey',
    marginVertical: 10,
  },
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
  detailLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
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
  containernoapp: {
 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 300,
  },
  backImg: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  ttext: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ptext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileLink: {
    fontSize: 18,
    color: '#FF8C00',
    textAlign: 'center',
  },
  backImg: {
    width: 150,
    height: 150,
  },
  ttext: {
    color: '#FF8C00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  ptext: {
    color: 'black',
    marginTop: 5,
  },
  profileLink: {
    marginTop: 15,
    color: '#FF8C00',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default AppointmentsScreen;
