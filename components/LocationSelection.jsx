import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ToastAndroid, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../store/userSlice';
import { useNavigation } from '@react-navigation/native';
import { saveLocation } from '../api/internal'; // Import the new API function

const LocationSelection = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            setErrorMsg('Permission to access location was denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        setErrorMsg(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSaveLocation = async () => {
    if (location) {
      try {
        const { latitude, longitude } = location.coords;
        const response = await saveLocation(user._id, { latitude, longitude });

        if (response.status === 200) {
          dispatch(setLocation({ latitude, longitude }));
          ToastAndroid.show('Location saved successfully', ToastAndroid.SHORT);
          navigation.navigate('CustomerHome');
        } else {
          ToastAndroid.show('Failed to save location', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error saving location:', error);
        ToastAndroid.show('Error saving location', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Location not available', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      ) : (
        <Text>Fetching current location...</Text>
      )}
      <Button title="Use Current Location" onPress={handleSaveLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
});

export default LocationSelection;
