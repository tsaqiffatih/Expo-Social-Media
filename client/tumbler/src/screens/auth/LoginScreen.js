import { gql, useMutation } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';
import AuthContext from '../../components/context/auth';

const MUTATION_LOGIN = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            access_token
            email
        }
    }

`
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext)

    const [
        loginHandler,
        {
            loading,
            error,
            data
        }
    ] = useMutation(MUTATION_LOGIN, {
        onCompleted: async (result) => {
            // console.log(result.loginUser.access_token);

            if (result?.loginUser?.access_token) {
                await SecureStore.setItemAsync("access_token", result.loginUser.access_token);
            }
            auth.setIsSignedIn(true)
        }
    })

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style='light' />
                <Text style={styles.tumbler}>
                    Tumbler
                </Text>
                <Text style={styles.title}>
                    Sign In
                </Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#2f4f4f"
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
                        secureTextEntry
                        placeholderTextColor="#2f4f4f"
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        loginHandler({
                            variables: {
                                email,
                                password
                            }
                        });
                    }}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.registerText, styles.registerLink]}>
                            Register here
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
