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
  Button,
  ToastAndroid
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';


import axios from "axios";


function SignUp(props) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(25, 'Password is too long - should be 25 chars maximum.')
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/,
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  
  const handleSignup=async()=>{
    const userData = {
      
      username: username,
      email:email,
      password:password,

    };
    console.log(userData)
    try {
      
      const response=await axios.post("http://10.0.2.2:3000/register",userData)   
      console.log("login success",response.data)
      ToastAndroid.show("login success", ToastAndroid.SHORT);
      // toast.success("login success")
      props.navigation.navigate('BottomTab')
     
    } catch (error) {
      console.log("login failed ",error.message)
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      // toast.error(error.message)
    }
    // finally{
    //   setLoading(false)
    // }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1,backgroundColor:'orange', alignItems: 'center'}}>
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>SIGN UP</Text>
        <Text style={styles.paragraph}
        >
          Set up your username and password. You can always change it later.
        </Text>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post("http://192.168.56.160:3000/register", values);
              console.log("Account created Sucessfully", response.data);
              ToastAndroid.show("Account created Sucessfully", ToastAndroid.SHORT);
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
              <View style={styles.inputWrapper}>
                <Icon name="envelope" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  color="black"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
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
              {/* Confirm Password */}
              <View style={styles.inputWrapper}>
                <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#888"
                  color="black"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                  <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={[styles.signUpText, styles.loginLink]}>Sign in</Text>
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
            >
            <Image
              source={require('../assets/google.png')}
              style={styles.socialButtonIcon}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}>
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

export default SignUp;

const styles = StyleSheet.create({
  backgroundImage: {
    opacity: 0.9,
    position: 'absolute',
    top: 100,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: '10%',
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
    color: '#FF8C00',
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
  signUpText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 27,
  },

  signUpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 27,
  },
  signUpText: {
    color: 'white',
    marginRight: 5,
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






// import * as React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import axios from "axios";
// import Icon from 'react-native-vector-icons/FontAwesome';

// function SignUp(props) {

//   const [passwordVisible, setPasswordVisible] = React.useState(false); // State for password visibility

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const SignupSchema = Yup.object().shape({
//     username: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string()
//       .min(6, 'Password is too short - should be 6 chars minimum.')
//       .required('Required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Required'),
//   });

//   return (
//     <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'orange', alignItems: 'center' }}>
//       <View style={styles.overlay}>
//         <Text style={styles.title}>SIGN UP</Text>
//         <Text style={styles.paragraph}>Set up your username and password. You can always change it later.</Text>
//        ` <Formik
//           initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
//           validationSchema={SignupSchema}
//           onSubmit={async (values, { setSubmitting }) => {
//             try {
//               const response = await axios.post("http://10.0.2.2:3000/register", values);
//               console.log("login success", response.data);
//               ToastAndroid.show("login success", ToastAndroid.SHORT);
//               props.navigation.navigate('BottomTab');
//             } catch (error) {
//               console.log("login failed ", error.message);
//               ToastAndroid.show(error.message, ToastAndroid.SHORT);
//             } finally {
//               setSubmitting(false);
//             }
//           }}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
//             <View style={styles.inputContainer}>
//               <View style={styles.inputWrapper}>
//                 <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Username"
//                   color="black"
//                   placeholderTextColor="#888"
//                   onChangeText={handleChange('username')}
//                   onBlur={handleBlur('username')}
//                   value={values.username}
//                 />
//               </View>
//               {errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}
//               <View style={styles.inputWrapper}>
//                 <Icon name="envelope" size={20} color="#888" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Email"
//                   placeholderTextColor="#888"
//                   color="black"
//                   onChangeText={handleChange('email')}
//                   onBlur={handleBlur('email')}
//                   value={values.email}
//                   keyboardType="email-address"
//                 />
//               </View>
//               {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
//               {/* Password */}
//               <View style={styles.inputWrapper}>
//                 <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Password"
//                   placeholderTextColor="#888"
//                   color="black"
//                   onChangeText={handleChange('password')}
//                   onBlur={handleBlur('password')}
//                   value={values.password}
//                   secureTextEntry={!passwordVisible}
//                 />
//                 <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
//                   <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#888" />
//                 </TouchableOpacity>
//               </View>
//               {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
//               {/* Confirm Password */}
//               <View style={styles.inputWrapper}>
//                 <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Confirm Password"
//                   placeholderTextColor="#888"
//                   color="black"
//                   onChangeText={handleChange('confirmPassword')}
//                   onBlur={handleBlur('confirmPassword')}
//                   value={values.confirmPassword}
//                   secureTextEntry={!passwordVisible}
//                 />
//                 <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
//                   <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#888" />
//                 </TouchableOpacity>
//               </View>
//               {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
//               <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                 <Text style={styles.buttonText}>SIGN UP</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </Formik>`
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// export default SignUp;

// const styles = StyleSheet.create({
//   backgroundImage: {
//     opacity: 0.9,
//     position: 'absolute',
//     top: 100,
//     resizeMode: 'cover',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   overlay: {
//     position: 'absolute',
//     top: '10%',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 27,
//     margin: 27,
//     borderRadius: 20,
//     paddingBottom: 27,
//   },
//   title: {
//     fontSize: 27,
//     alignSelf: 'center',
//     fontWeight: 'bold',
//     color: '#FF8C00',
//     fontFamily: 'Poppins-Bold',
//     marginBottom: 10,
//     marginTop: 27,
//   },
//   paragraph: {
//     alignSelf: 'center',
//     fontSize: 16,
//     color: 'white',
//     marginBottom: 27,
//   },
//   inputContainer: {
//     marginBottom: 27,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: 'white',
//     borderRadius: 8,
//   },
//   inputIcon: {
//     marginLeft: 10,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//   },
//   eyeIconContainer: {
//     position: 'absolute',
//     right: 15,
//     top: '50%',
//     transform: [{translateY: -10}],
//   },
//   button: {
//     backgroundColor: '#FF8C00',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   signUpText: {
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 27,
//   },

//   signUpTextContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 27,
//   },
//   signUpText: {
//     color: 'white',
//     marginRight: 5,
//   },
//   loginLink: {
//     textDecorationLine: 'underline',
//   },
//   orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 27,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: 'white',
//   },
//   orText: {
//     color: 'white',
//     marginHorizontal: 10,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   socialButton: {
//     flexDirection: 'row', // Adjusted to align icon and text horizontally
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '48%', // Adjust as needed
//   },
//   socialButtonIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   socialButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black', // Change text color to white
//   },
// });
