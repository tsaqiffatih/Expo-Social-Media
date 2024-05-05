import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    // Fungsi untuk menangani submit pencarian
    const handleSearch = () => {
        // Implementasi logika pencarian user
        console.log('pencarian untuk:', searchQuery);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style='light' />
                <TextInput
                    style={styles.input}
                    placeholder="Search user..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
