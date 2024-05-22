import React from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';



const Unauthprofile = () => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: () => console.log('Logout confirmed')},
      ],
      {cancelable: false}
    );
  };

  return (
    <View style={styles.container}>
       <FlatList
       
        renderItem={({item}) => (
          <Text
            style={styles.item}
            onPress={item.key === 'Logout'? handleLogout : null}
          >
            {item.key}
          </Text>
        )}
      />
    </View>
  );
};

export default Unauthprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  item: {
    color:'black',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});