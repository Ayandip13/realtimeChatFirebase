import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './User';
import Profile from './Settings';


const Main = () => {
    const [activeTab, setActiveTab] = useState<'user' | 'settings'>('user');

    const renderScreen = () => {
        switch (activeTab) {
            case 'user':
                return <Home />;
            case 'settings':
                return <Profile />;
        }
    };

    return (
        <View style={styles.container}>
            {/* Main Screen */}
            <View style={styles.body}>{renderScreen()}</View>

            {/* Bottom Tab */}
            <View style={styles.tabBar}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.tabButton}
                    onPress={() => setActiveTab('user')}>
                    <Icon
                        name="person"
                        size={28}
                        color={activeTab === 'user' ? 'blue' : 'gray'}
                    />
                    <Text style={{ color: activeTab === 'user' ? 'blue' : 'gray' }}>
                        User
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.tabButton}
                    onPress={() => setActiveTab('settings')}>
                    <Icon
                        name="settings"
                        size={28}
                        color={activeTab === 'settings' ? 'blue' : 'gray'}
                    />
                    <Text style={{ color: activeTab === 'settings' ? 'blue' : 'gray' }}>
                        Settings
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    tabButton: {
        alignItems: 'center'
    },
});
