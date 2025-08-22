import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const User = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User</Text>
    </View>
  );
};

export default User;

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
  },
});
