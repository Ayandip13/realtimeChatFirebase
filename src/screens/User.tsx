import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const User = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      console.log('Current Email:', email);

      const snapshot = await firestore().collection('users').get();
      console.log('Total users in Firestore:', snapshot.size);

      if (!snapshot.empty) {
        const allUsers = snapshot.docs
          .map(doc => doc.data())
          .filter(user => user.email !== email);

        console.log('Filtered users:', allUsers); // 👈 check fields
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.text}>Firebase Chat</Text>
      </View>

      {/* User List */}
      <FlatList
        style={{ flex: 1 }}
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => navigation.navigate('Chat', { data: item })}
          >
            <Image
              source={require('../assets/user.png')}
              style={styles.userIcon}
            />
            <Text style={styles.userName}>{item.name || 'No name'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#d6d6d6ff',
    padding: 20,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userIcon: {
    width: 50,
    height: 50,
  },
});
