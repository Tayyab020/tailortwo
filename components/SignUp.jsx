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
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';

function SignUp(props) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  
  const signuphandler=async()=>{
   
    console.log("hello")
    try {
      const name="tayyab"
      console.log(username,email,name,password)
      const response = await axios.post("http://localhost:5000/register", {
        username: username,
        email: email,
        name: name,
        password: password
      });
      console.log("login success",response.data)
      toast.success("login success")
     
    } catch (error) {
      console.log("login failed ",error.message)
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1, alignItems: 'center'}}>
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
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              color="black" 
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon
              name="envelope"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              color="black" 
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              color="black" 
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
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
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              color="black" 
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!passwordVisible}
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
          <TouchableOpacity style={styles.button}>
          {/* () => props.navigation.navigate('Tab') */}
            <Text style={styles.buttonText} onPress={signuphandler}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}
        
        >Already have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={[styles.signUpText, styles.loginLink]}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Sign In With</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/google.png')}
              style={styles.socialButtonIcon}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
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
    opacity: 0.6,
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
    color: 'white',
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
    backgroundColor: '#FF2D00',
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
