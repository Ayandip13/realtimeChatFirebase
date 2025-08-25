import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route }) => {
  const { data } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  const otherUserId = data.userId;
  const roomId =
    currentUserId && otherUserId
      ? currentUserId < otherUserId
        ? currentUserId + otherUserId
        : otherUserId + currentUserId
      : '';

  // 🔹 Load current user
  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => id && setCurrentUserId(id));
  }, []);

  // 🔹 Listen for messages
  useEffect(() => {
    if (!roomId) return;
    return firestore()
      .collection('chats')
      .doc(roomId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
  }, [roomId]);

  // 🔹 Send message
  const sendMessage = async () => {
    if (!text.trim()) return;
    await firestore()
      .collection('chats')
      .doc(roomId)
      .collection('messages')
      .add({
        text,
        senderId: currentUserId,
        receiverId: otherUserId,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    setText('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.userBar}>
        <Image
          source={require('../assets/user.png')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{data.name}</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        inverted
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.senderId === currentUserId ? styles.myMsg : styles.theirMsg,
            ]}
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputBar}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendTxt}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  userBar: {
    padding: 15,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    padding: 10,
    margin: 8,
    borderRadius: 10,
    maxWidth: '70%',
  },
  myMsg: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirMsg: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  inputBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
