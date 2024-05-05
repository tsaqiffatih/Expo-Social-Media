import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useQuery, gql } from '@apollo/client';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';
import CommentItem from '../components/CommentComponent';

const GET_POST_BY_ID = gql`
    query FetchPostById($postId: ID!) {
        fetchPostById(postId: $postId) {
          _id
          content
          tags
          imgurl
          authorId
          author {
            name
            username
          }
          comments {
            username
            content
          }
          likes { 
            username
          }
        }
    }
`

export default function PostDetailScreen({ route }) {
    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: {
            postId: route.params.postId
        }
    })

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <ErrorComponent />
    }

    // Data postingan
    const post = {
        id: '1',
        user: data?.fetchPostById.username,
        image: data?.fetchPostById.imgurl,
        description: data?.fetchPostById.content,
        liked: false,
        likes: data?.fetchPostById.likes.length,
        comments: [
            { id: 1, text: 'Komentar pertama' },
            { id: 2, text: 'Komentar kedua' },
        ],
    };

    // State untuk komentar
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments);

    // Fungsi untuk menambahkan komentar
    const handleComment = () => {
        console.log("hai");
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.tabBar}>
                    <Text style={styles.tabText}>
                        Tumbler
                    </Text>
                </View>
                <Image source={{ uri: post.image }} style={styles.image} />
                <Text style={styles.description}>{post.description}</Text>
                <View style={styles.actionContainer}>
                    <TouchableOpacity>
                        <Feather
                            name={post.liked ? 'heart' : 'heart'}
                            size={24}
                            color={post.liked ? 'red' : 'white'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.featherText}>
                        {post.likes}
                    </Text>
                    <TouchableOpacity>
                        <Feather name="message-circle" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.featherText}>
                        {post.comments.length}
                    </Text>
                </View>
                <Text style={styles.commentTitle}>Comments:</Text>
                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <CommentItem comment={item} />}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Write a comment..."
                    value={comment}
                    onChangeText={setComment}
                    placeholderTextColor={"#F5F5F5"}
                />
                <TouchableOpacity style={styles.button} onPress={handleComment}>
                    <Text style={styles.buttonText}>
                        Post Comment
                    </Text>
                </TouchableOpacity>
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
    featherText: {
        color: '#fff',
        marginRight: 10,
        marginLeft: 5
    },
    tabText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#fff',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    commentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#fff',
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
