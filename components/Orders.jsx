import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { getAppointment } from '../api/internal';

const AppointmentCard = ({ appointment }) => {
  return (
    <TouchableOpacity style={styles.appointmentCard}>
      <View style={styles.customerContainer}>
        <Image
          source={{ uri: appointment.customer.profileImage }}
          style={styles.customerProfilePhoto}
        />
        <Text style={styles.customerName}>{appointment.customer.username}</Text>
      </View>
      <View>
        <Text style={styles.appointmentDate}>{appointment.date}</Text>
        <Text style={styles.appointmentTime}>{appointment.time}</Text>
      </View>
      <View>
        <Text style={styles.appointmentDescription}>{appointment.description}</Text>
      </View>
     
       <View  style={styles.actionButtons}>
      
        <TouchableOpacity >
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.completedButton}>Completed</Text>
        </TouchableOpacity>
        
       </View>
     
    </TouchableOpacity>
  );
};

  const styles = StyleSheet.create({
    appointmentCard: {
      
      padding: 20,
      marginBottom: 10,
     
      backgroundColor: '#EEF6D5',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    customerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    customerProfilePhoto: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: 10,
    },
    customerName: {
      fontWeight: 'bold',
    },
    appointmentDate: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    appointmentTime: {
      fontSize: 14,
      color: '#666',
    },
    appointmentDescription: {
      fontSize: 14,
      marginTop: 5,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent:'flex-end',
      marginTop: 10,
      width: '100%',
    },
    deleteButton: {
      color: 'red',
      fontWeight: 'bold',
      marginRight: 10,
    },
    completedButton: {
      color: 'green',
      fontWeight: 'bold',
    }
});


//... rest of the code remains the same



const AppointmentsScreen = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
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
    padding: 10,
  },
});

export default AppointmentsScreen;