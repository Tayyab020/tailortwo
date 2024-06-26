import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  ScrollView
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { signup } from '../api/internal';

const SignUp = (props) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
  const dispatch = useDispatch();

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
        "Password must contain 8 characters, one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>SIGN UP</Text>
        <Text style={styles.paragraph}>
          Set up your username and password. You can always change it later.
        </Text>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await signup(values);
              if (response.status === 200) {
                const user = {
                  _id: response.data.user._id,
                  email: response.data.user.email,
                  username: response.data.user.username,
                  auth: response.data.auth,
                  isTailor: response.data.user.isTailor,
                };
                await AsyncStorage.setItem('user', JSON.stringify(user));
                dispatch(setUser(user));
                props.navigation.navigate('BottomTab');
                ToastAndroid.show('Signup successful', ToastAndroid.SHORT);
              } else {
                setError(response.response.data.message);
              }
            } catch (error) {
              console.error("Signup failed", error);
              ToastAndroid.show(error.message, ToastAndroid.SHORT);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <ScrollView contentContainerStyle={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
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
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
              <View style={styles.inputWrapper}>
                <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#888"
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
              <View style={styles.inputWrapper}>
                <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#888"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={!confirmPasswordVisible}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIconContainer}>
                  <Icon name={confirmPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </Formik>
        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={[styles.signUpText, styles.loginLink]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

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
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: 'black',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  button: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
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
    marginRight: 5,
  },
  loginLink: {
    textDecorationLine: 'underline',
  },
});
