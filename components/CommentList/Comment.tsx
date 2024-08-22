import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CommentType } from "@/components/CommentList/types/CommentType";
import { getTimeAgo } from '@/util/utils';

interface CommentProps {
    comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
    return (
        <View style={styles.commentContainer}>
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: 'https://avatar.iran.liara.run/public' }} // Placeholder avatar URL
                    style={styles.avatar}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.commentAuthor}>{comment.display_name}</Text>
                    <Text style={styles.commentDate}>{getTimeAgo(new Date(comment.created_at))}</Text>
                </View>
            </View>
            <Text style={styles.commentText}>{comment.text}</Text>

            {comment.children.length > 0 && (
                <View style={styles.repliesContainer}>
                    {comment.children.map(child => (
                        <Comment key={child.id} comment={child} />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    commentContainer: {
        padding: 10,
        marginLeft: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    commentAuthor: {
        fontWeight: 'bold',
    },
    commentDate: {
        fontSize: 12,
        color: 'gray',
    },
    commentText: {
        marginVertical: 5,
    },
    repliesContainer: {
        marginLeft: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        paddingLeft: 5,
    },
});
