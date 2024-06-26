
import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginUser, googleAuth, facebookAuth} from '../utils/api';

import BottomTab from"./Tab"

import axios from "axios";
import { useNavigation } from '@react-navigation/native'; 
import {login} from"../api/internal"
import { setUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);


    

  
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(25, 'Password is too long - should be 25 chars maximum.')
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/,
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special character"),
});


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const dispatch = useDispatch();
  const handleSignIn=async()=>{
  
    const userData = {
      username: email,
      password:password
    };
    console.log(userData)
    try{
      const response=await login(userData)
      console.log("login ho gya",response)
      if (response.status === 200) {
        
        // 1. setUser
        const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
          };
    
          dispatch(setUser(user));
          
        // console.log(`setUser success`,user)
        // 2. redirect -> homepage
        props.navigation.navigate('BottomTab');
        ToastAndroid.show('login success', ToastAndroid.SHORT);
      
      } else if (response.code === "ERR_BAD_REQUEST") {
        // display error message
        setError(response.response.data.message);
      }
    }
     catch (error) {
      console.log("login failed ",error.message)
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
    // finally{
    //   setLoading(false)
    // }
  }


  return (
    <KeyboardAvoidingView style={{flex: 1,alignItems: 'center'}}>
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>SIGN IN</Text>
        <Text style={styles.paragraph}>
          Welcome back! Please sign in to continue.
        </Text>
        <Formik
          initialValues={{ username: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response=await login(values)
              // const response = await axios.post("http://192.168.32.160:3000/login", values);
             

        
              if (response.status === 200) {
                console.log("Login Sucessfully", response.data);
                const user = {
                  _id: response.data.user._id,
                  email: response.data.user.email,
                  username: response.data.user.username,
                  auth: response.data.auth,
                  isTailored: response.data.isTailor
                };

               
                await AsyncStorage.setItem('user', JSON.stringify(user));
                
                const jsonValue = await AsyncStorage.getItem('user');
                const storedonStorage=JSON.parse(jsonValue) 
                console.log("Async stored Sucessfully",storedonStorage)
                // 1. setUser
                
                dispatch(setUser(user));
                 
                
                // console.log(`setUser success`,user)
                // 2. redirect -> homepage
                props.navigation.navigate('BottomTab');
                ToastAndroid.show('login success', ToastAndroid.SHORT);
              
              } else if (response.code === "ERR_BAD_REQUEST") {
                // display error message
                setError(response.response.data.message);
              }                                          

              ToastAndroid.show("Login Sucessfully", ToastAndroid.SHORT);
              props.navigation.navigate('BottomTab');
            } catch (error) {
              console.log("login failed ", error.message);
              ToastAndroid.show(error.message, ToastAndroid.SHORT);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  color="black"
                  placeholderTextColor="#888"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </View>
              {errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}
            
              {/* Password */}
              <View style={styles.inputWrapper}>
                <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  color="black"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                  <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={[styles.signUpText, styles.loginLink]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Sign In With</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleAuth}>
            <Image
              source={require('../assets/google.png')}
              style={styles.socialButtonIcon}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleFacebookAuth}>
            <Image
              source={require('../assets/facebook.png')}
              style={styles.socialButtonIcon}
            />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  backgroundImage: {
    opacity: 0.9,
    position: 'absolute',
    top: 100,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: '20%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 27,
    margin: 27,
    borderRadius: 20,
    paddingBottom: 27,
  },
  title: {
    fontSize: 27,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: "#FF8C00",
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    marginTop: 27,
  },
  paragraph: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    marginBottom: 27,
  },
  inputContainer: {
    marginBottom: 27,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  inputIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{translateY: -10}],
  },
  button: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  signUpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 27,
  },
  signUpText: {
    color: 'white',
    marginRight: 5, // Adjust spacing between texts if needed
  },
  loginLink: {
    textDecorationLine: 'underline',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  orText: {
    color: 'white',
    marginHorizontal: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flexDirection: 'row', // Adjusted to align icon and text horizontally
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Adjust as needed
  },
  socialButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Change text color to white
  },
});
