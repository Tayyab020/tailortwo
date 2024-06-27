import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signout, updateProfileImage, getProfileImage } from '../api/internal';
import { resetUser, setUser } from '../store/userSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sellerMode, setSellerMode] = useState(user.isTailor);
  const [notifications, setNotifications] = useState(2);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await getProfileImage(user._id);
        if (response.status === 200) {
          setProfileImage(response.data.profileImage);
        } else {
          console.error('Failed to fetch profile image, status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchProfileImage();
    }
  }, [user]);

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.5, includeBase64: true });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const base64 = `data:${asset.type};base64,${asset.base64}`;
      setProfileImage(base64);

      try {
        const response = await updateProfileImage(user._id, base64);
        if (response.status === 200) {
          const updatedUser = { ...user, profileImage: base64 };
          dispatch(setUser(updatedUser)); 
          await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes', onPress: async () => {
            try {
              await signout();
              dispatch(resetUser());

              const resetUserData = {
                _id: "",
                email: "",
                username: "",
                auth: false,
                isTailor: false,
              };
              await AsyncStorage.setItem('user', JSON.stringify(resetUserData));

              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            } catch (error) {
              console.error('Logout failed', error);
            }
          }
        },
      ],
      { cancelable: false }
    );
  };

  const handleSellerModeToggle = async (value) => {
    setSellerMode(value);
    const updatedUser = { ...user, isTailor: value };
    dispatch(setUser(updatedUser));
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.sellerModeContainer}>
          <Text style={styles.sellerModeText}>Seller Mode</Text>
          <Switch
            value={sellerMode}
            onValueChange={handleSellerModeToggle}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={sellerMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollableContent}>
        <View style={styles.section}>

          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <Icon name="sign-out" size={20} color="#333" style={styles.optionIcon} />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    zIndex: 1,  
    backgroundColor: '#FF8C00',
    paddingBottom: 20,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    marginTop:10
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileImagePlaceholderText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerInfo: {
    flex: 1,
    paddingTop: 10    
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  email: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 2,
  },
  balance: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
  notificationContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 3,
    paddingHorizontal: 6,
  },
  notificationText: {
    color: '#FFF',
    fontSize: 12,
  },
  sellerModeContainer: {
    position: 'relative',
    top: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sellerModeText: {
    color: '#000',
    marginRight: 10,
    fontSize: 16,
  },
  scrollableContent: {
    zIndex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Profile;
