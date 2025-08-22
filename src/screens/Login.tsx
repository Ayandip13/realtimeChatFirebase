import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const navigation = useNavigation()

    const loginUser = () => {
        setVisible(true)
        firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(res => {
                setVisible(false)
                console.log(JSON.stringify(res.docs[0].data()));
                Alert.alert('Success', 'Login successful');
                setEmail('');
                setPassword('');
                goToNext(
                    res.docs[0].data().name,
                    res.docs[0].data().email,
                    res.docs[0].data().userId
                )
            })
            .catch(err => {
                Alert.alert('Error', err.message)
                setVisible(false)
                console.log(err);
            });
    }

    const goToNext = async (name: string, email: string, userId: string) => {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('userId', userId);
        navigation.navigate('Main')
    }

    return (
        <View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 100 }}>Login</Text>
            <View style={{ marginHorizontal: 20 }}>
                <TextInput
                    placeholder='Enter your Email'
                    placeholderTextColor={'#444'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{ borderWidth: 1, marginHorizontal: 10, padding: 10, borderRadius: 5, marginTop: 20 }}
                />
                <TextInput
                    placeholder='Enter your Password'
                    value={password}
                    placeholderTextColor={'#444'}
                    onChangeText={(text) => setPassword(text)}
                    style={{ borderWidth: 1, marginHorizontal: 10, padding: 10, borderRadius: 5, marginVertical: 10 }}
                />
                <TouchableOpacity onPress={loginUser} style={{ backgroundColor: '#fff', marginHorizontal: 80, padding: 15, borderRadius: 5, elevation: 5, marginVertical: 20 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Login</Text>
                </TouchableOpacity>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>Don't have an account?
                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        style={{
                            color: 'blue',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}> SignUp</Text>
                </Text>
            </View>
            {
                visible && <ActivityIndicator style={{ marginTop: 50 }} size={'large'} color={'#000'} />
            }
        </View>
    )
}

export default Login