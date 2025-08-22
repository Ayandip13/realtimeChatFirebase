import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('Login')
      isLoggedIn();
    }, 2000);
  }, []);
  const isLoggedIn = async () => {
    const Id = await AsyncStorage.getItem('userId');
    if (Id !== null) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
