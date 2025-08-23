import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = () => {
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const snapshot = await firestore()
        .collection('users')
        .where('email', '!=', email)
        .get();

      if (!snapshot.empty) {
        console.log(JSON.stringify(snapshot.docs[0].data()));
      } else {
        console.log('No users found');
      }
    } catch (err) {
      console.error('Error fetching users: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#d6d6d6ff',
          padding: 20,
        }}
      >
        <Text style={styles.text}>Firebase Chat</Text>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },
});
