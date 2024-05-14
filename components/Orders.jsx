import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AppointmentsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Appointment 1',
      startDate: '2023-05-18',
      endDate: '2023-05-18',
      attendees: [
        { id: 1, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: 2, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 3, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar8.png' },
        { id: 4, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: 5, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
        { id: 6, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
      ],
      backgroundColor: '#ffdcb2',
      titleColor: '#ff8c00',
    },
    {
      id: 2,
      title: 'Appointment 2',
      startDate: '2023-05-19',
      endDate: '2023-05-19',
      attendees: [
        { id: 7, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 8, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: 9, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
      ],
      backgroundColor: '#bfdfdf',
      titleColor: '#008080',
    },
    {
      id: 3,
      title: 'Appointment 2',
      startDate: '2023-05-19',
      endDate: '2023-05-19',
      attendees: [
        { id: 10, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 11, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: 12, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: 13, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
        { id: 14, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
      ],
      backgroundColor: '#e2caf8',
      titleColor: '#8a2be2',
    },
    {
      id: 4,
      title: 'Appointment 2',
      startDate: '2023-05-19',
      endDate: '2023-05-19',
      attendees: [
        { id: 15, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 16, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: 17, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
      ],
      backgroundColor: '#d8e4fa',
      titleColor: '#6495ed',
    },
    // Add more appointments here
  ]);

  const renderAppointmentCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
      <Text style={[styles.cardTitle, { color: item.titleColor }]}>{item.title}</Text>
      <View style={styles.cardDates}>
        <Text style={styles.cardDate}>{item.startDate}</Text>
        <Text style={styles.cardDate}> - {item.endDate}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.attendeesContainer}>
          {item.attendees.map((attendee) => (
            <Image key={attendee.id} source={{ uri: attendee.remoteImage }} style={styles.attendeeImage} />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Config</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const searchFilter = (item) => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList 
        contentContainerStyle={styles.listContainer}
        data={appointments.filter(searchFilter)}
        renderItem={renderAppointmentCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:50,
    flex: 1,
    padding: 10,
    paddingTop:10,
  },
  listContainer:{
    paddingHorizontal:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius:5,
    borderColor:'#A9A9A9',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize:18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  cardDates: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cardDate: {
    color: '#888',
  },
  cardContent: {
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  attendeesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  attendeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: -10,
    borderWidth:0.5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginTop:15,
    backgroundColor: '#DCDCDC',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#00008B',
  },
});

export default AppointmentsScreen;
