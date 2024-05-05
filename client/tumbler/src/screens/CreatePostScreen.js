import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';

const MUTATION_CREATE_POST = gql`
  mutation AddPost($content: String!, $imgurl: String, $tags: [String]) {
      addPost(content: $content, imgurl: $imgurl, tags: $tags) {
        _id
        content
        imgurl
        authorId
        author {
          name
          username
        }
        comments {
          username
        }
        likes {
          username
        }
        createdAt
        updatedAt
        tags
      }
    }
`;

export default function CreatePostScreen({ navigation }) {
    const [content, setContent] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [tags, setTags] = useState('');

    const [createPost, { loading, error, data }] = useMutation(MUTATION_CREATE_POST, {
        onCompleted: () => {
            navigation.navigate('Home')
        },
        refetchQueries: [
            "FetchPosts"
        ]
    });

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <ErrorComponent />
    }

    const handleCreatePost = () => {
        const tagArray = tags.split(',').map(tag => tag.trim());
        createPost({
            variables: { content, imgurl: imgUrl, tags: tagArray }
        }).then(() => {
            navigation.navigate('Home');
        }).catch(error => {
            console.error('Error creating post:', error);
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Your Content "
                    value={content}
                    onChangeText={text => setContent(text)}
                    multiline={true}
                    placeholderTextColor="#fff"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Image URL"
                    value={imgUrl}
                    onChangeText={text => setImgUrl(text)}
                    placeholderTextColor="#fff"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Tags (comma separated)"
                    value={tags}
                    onChangeText={text => setTags(text)}
                    placeholderTextColor="#fff"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
                <Text style={styles.buttonText}>
                    Create Post
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#fff',
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
