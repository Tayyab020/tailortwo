import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your actual backend URL
});

// Attach the token to the request headers
instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken'); // Replace with your storage mechanism
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export const registerUser = userData => instance.post('/register', userData);
export const loginUser = userData => instance.post('/login', userData);
export const googleAuth = googleData =>
  instance.post('/google-auth', googleData);
export const facebookAuth = facebookData =>
  instance.post('/facebook-auth', facebookData);

// Example protected route
export const getProtectedData = () => instance.get('/protected-route');
