import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { gql, useMutation, useQuery } from '@apollo/client';

const LIKE_POST = gql`
    mutation AddLikePost($postId: ID!) {
      addLikePost(postId: $postId) {
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

export default function PostCard({ post, navigation }) {
    const [handleLike, { loading, error, data }] = useMutation(LIKE_POST, {
        variables: {
            postId: post._id
        }
    })

    const profilePicture = 'https://media.cnn.com/api/v1/images/stellar/prod/230112091039-joko-widodo-file.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp'

    const handleComment = (postId) => {
        console.log(postId);
    }

    return (
        <View style={styles.postContainer}>
            <View style={styles.stats}>
                <Image
                    source={{ uri: profilePicture }}
                    style={styles.profilePicture}
                />
                <Text style={styles.username}>
                    {post.author.username}
                </Text>
            </View>
            <Image source={{ uri: post.imgurl }} style={styles.image} />
            <Text style={styles.description}>
                {post.content}
            </Text>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleLike(post._id)}>
                    <Feather name={post.likes.length > 0 ? 'heart' : 'heart'} size={24} color={post.likes.length > 0 ? 'red' : 'white'} />
                </TouchableOpacity>
                <Text style={styles.actionText}>
                    {post.likes.length}
                </Text>
                <TouchableOpacity onPress={() => handleComment(post._id)}>
                    <Feather name="message-circle" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.actionText}>
                    {post.comments.length}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("DetailPost", {
                            postId: post._id
                        })
                    }}>
                    <Text style={{ color: 'white', marginLeft: 170 }}>
                        see details...
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        marginBottom: 20,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 7,
        color: '#fff',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        color: '#fff',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#fff',
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    actionText: {
        marginLeft: 5,
        color: '#fff',
        marginRight: 10
    }
});
