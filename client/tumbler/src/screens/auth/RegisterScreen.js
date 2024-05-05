import { gql, useMutation } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';

const MUTATION_REGISTER = gql`
    mutation RegisterUser($name: String!, $username: String!, $email: String!, $password: String!) {
      registerUser(name: $name, username: $username, email: $email, password: $password) {
        _id
        name
        username
        email
      }
    }
`

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [handleRegister, { loading, error, data }] = useMutation(MUTATION_REGISTER, {
        onCompleted: () => {
            navigation.navigate('Login')
        }
    })

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <ErrorComponent />
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="light" />
                <Text style={styles.tumbler}>Tumbler</Text>
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Name
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#ccc"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Username
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#ccc"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#ccc"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#ccc"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleRegister({
                        variables: {
                            name,
                            email,
                            password,
                            username
                        }
                    })
                }}>
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.registerText}>
                        Already have an account?
                        <Text style={styles.loginText}>
                            Login here
                        </Text>
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
