import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, gql } from '@apollo/client';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';


const GET_MY_PROFILE = gql`
    query GetUserById {
        getUserById {
          _id
          name
          username
          email
          followers {
            username
            
          }
          following {
            
            username
          }
        }
    }
`

export default function ProfileScreen() {
    const { loading, error, data } = useQuery(GET_MY_PROFILE);

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <ErrorComponent />
    }

    const userProfile = {
        id: '123',
        name: data?.getUserById?.name,
        email: data?.getUserById?.email,
        profilePicture: 'https://media.cnn.com/api/v1/images/stellar/prod/230112091039-joko-widodo-file.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp',
    };

    const followers = data?.getUserById?.followers.length || 0;
    const followings = data?.getUserById?.following.length || 0;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style='light' />

                <View style={styles.stats}>
                    <Image
                        source={{ uri: userProfile.profilePicture }}
                        style={styles.profilePicture}
                    />
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{followers}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{followings}</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>
                <View style={styles.header}>
                    <Text style={styles.name}>
                        {userProfile.name}
                    </Text>
                </View>
                <Text style={styles.email}>{userProfile.email}</Text>
                <Text style={{color:'white'}}>
                    ___________________________________________________
                </Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#fff',
    },
    email: {
        fontSize: 16,
        color: '#fff',
    },
});