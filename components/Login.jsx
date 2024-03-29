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
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginUser, googleAuth, facebookAuth} from '../utils/api';

import BottomTab from"./Tab"

import axios from "axios";
import { useNavigation } from '@react-navigation/native'; // import the necessary modules for navigation

// Inside your component function


function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn=async()=>{
    const userData = {
      
      username: email,
      password:password
    };
    console.log(userData)
    try {
      
      const response=await axios.post("http://192.168.40.182:3000/login",userData)
      console.log("login success",response.data)
      props.navigation.navigate('BottomTab');
      // toast.success("login success")
     
    } catch (error) {
      console.log("login failed ",error.message)
    
      // toast.error(error.message)
    }
    // finally{
    //   setLoading(false)
    // }
  }
  // const handleSignIn = async () => {
    
  //   try {
  //     const response = await loginUser({email, password});
  //     // Handle successful sign-in (e.g., save token to AsyncStorage, navigate to the next screen)
  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle sign-in error
  //     console.error(error);
  //   }
  // };

  const handleGoogleAuth = async () => {
    try {
      // Implement Google authentication logic
      const response = await googleAuth({
        /* Google authentication data */
      });
      // Handle successful authentication (e.g., save token to AsyncStorage, navigate to the next screen)
      console.log(response.data);
    } catch (error) {
      // Handle authentication error
      console.error(error);
    }
  };

  const handleFacebookAuth = async () => {
    try {
      // Implement Facebook authentication logic
      const response = await facebookAuth({
        /* Facebook authentication data */
      });
      // Handle successful authentication (e.g., save token to AsyncStorage, navigate to the next screen)
      console.log(response.data);
    } catch (error) {
      // Handle authentication error
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor:'orange' ,alignItems: 'center'}}>
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>SIGN IN</Text>
        <Text style={styles.paragraph}>
          Welcome back! Please sign in to continue.
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon
              name="user"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
             
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#888"
              color="black"
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              color="black"
              secureTextEntry={!passwordVisible}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIconContainer}>
              <Icon
                name={passwordVisible ? 'eye-slash' : 'eye'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}
            
            >Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={[styles.signUpText, styles.loginLink]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
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
        </View>
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
