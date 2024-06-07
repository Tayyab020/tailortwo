// Messages.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getChats } from '../api/internal'; // Ensure you have an API method to fetch chats

const Messages = () => {


  return (
    <View style={styles.container}>
     
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
