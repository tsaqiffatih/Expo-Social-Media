import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useQuery, gql } from '@apollo/client';
import PostCard from '../components/PostCard';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';
import { Header } from '@react-navigation/stack';
import FloatingButton from '../components/FloatingButton';


const GET_POSTS = gql`
query FetchPosts {
  fetchPosts {
    _id
    content
    tags
    imgurl
    authorId
    author {
      username
      name
    }
    comments {
      username
      content
    }
    likes {
      username
    }
    createdAt
    updatedAt
  }
}
`

export default function HomeScreen({ navigation }) {

    const { loading, error, data } = useQuery(GET_POSTS);

    const posts = data?.fetchPosts;

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <ErrorComponent />
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <PostCard
                            post={item}
                            navigation={navigation}
                        />
                    )}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        paddingHorizontal: 20,
    },
    tabBar: {
        backgroundColor: '#141414',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});
