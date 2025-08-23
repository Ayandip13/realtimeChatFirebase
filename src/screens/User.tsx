import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      console.log('Current Email:', email);

      const snapshot = await firestore()
        .collection('users')
        .get();

      if (!snapshot.empty) {
        // filter out logged-in user
        const allUsers = snapshot.docs
          .map(doc => doc.data())
          .filter(user => user.email !== email);

        setUsers(allUsers);
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
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },
  userCard: {
    padding: 15,
    margin: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
