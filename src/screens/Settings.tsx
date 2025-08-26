import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // clear user data (jwt / uid / anything)
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');

      // Navigate back to Login screen
      navigation.replace('Login');
      // replace => so user can't go back using back button
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Settings


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#DCDCDC',
    borderRadius: 8,
  },
  btnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
