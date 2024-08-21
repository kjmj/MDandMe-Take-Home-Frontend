import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommentType } from "@/components/CommentList/types/CommentType";

interface CommentProps {
    comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
    return (
        <View style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{comment.display_name}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
            <Text style={styles.commentDate}>{new Date(comment.created_at).toLocaleString()}</Text>

            {comment.children.length > 0 && (
                <View style={styles.repliesContainer}>
                    {comment.children.map(child => (
                        <Comment key={child.id} comment={child} />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        padding: 10,
        marginLeft: 10,
    },
    commentAuthor: {
        fontWeight: 'bold',
    },
    commentText: {
        marginVertical: 5,
    },
    commentDate: {
        fontSize: 12,
        color: 'gray',
    },
    repliesContainer: {
        marginLeft: 20,
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        paddingLeft: 10,
    },
});