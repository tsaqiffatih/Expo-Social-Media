import { StyleSheet, View, Text } from 'react-native';

export default function CommentItem({ comment }) {
    return (
        <View style={styles.commentContainer}>
            <Text style={styles.comment}>{comment.text}</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    comment: {
        fontSize: 14,
    },
})