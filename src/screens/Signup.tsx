import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      })
      .then(() => {
        Alert.alert('User Added Successfully');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const validate = () => {
    let isValid = true;
    if (name === '') {
      isValid = false;
    }
    if (email === '') {
      isValid = false;
    }
    if (mobile === '') {
      isValid = false;
    }
    if (password === '') {
      isValid = false;
    }
    if (confirmPassword === '') {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };

  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 100,
        }}
      >
        Signup
      </Text>
      <View style={{ marginHorizontal: 10 }}>
        <TextInput
          placeholderTextColor={'#444'}
          placeholder="Enter your Name"
          value={name}
          onChangeText={text => setName(text)}
          style={{ borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }}
        />
        <TextInput
          placeholderTextColor={'#444'}
          placeholder="Enter your Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={{
            borderWidth: 1,
            marginHorizontal: 10,
            padding: 10,
            borderRadius: 5,
          }}
        />
        <TextInput
          placeholderTextColor={'#444'}
          placeholder="Enter your Mobile"
          keyboardType="number-pad"
          value={mobile}
          onChangeText={text => setMobile(text)}
          style={{ borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }}
        />
        <TextInput
          placeholderTextColor={'#444'}
          placeholder="Enter your Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={{
            borderWidth: 1,
            marginHorizontal: 10,
            padding: 10,
            borderRadius: 5,
          }}
        />
        <TextInput
          placeholder="Enter your Confirm Password"
          value={confirmPassword}
          placeholderTextColor={'#444'}
          onChangeText={text => setConfirmPassword(text)}
          style={{ borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }}
        />
        <TouchableOpacity
          onPress={() => {
            if (validate()) {
              registerUser(),
                setEmail(''),
                setName(''),
                setMobile(''),
                setPassword(''),
                setConfirmPassword(''),
                navigation.navigate('Login');
            } else {
              Alert.alert('Please fill all the fields');
            }
          }}
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 80,
            padding: 15,
            borderRadius: 5,
            elevation: 5,
            marginVertical: 25,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}
          >
            Signup
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          Already have an account?
          <Text
            onPress={() => navigation.goBack('Login')}
            style={{
              color: 'blue',
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            {' '}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;
