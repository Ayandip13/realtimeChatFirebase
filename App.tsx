import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import auth from '@react-native-firebase/auth';

const App = () => {
  return (
      <AppNavigator />
  )
}

export default App