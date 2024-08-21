import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { PostCard } from "@/components/PostCard";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CommentsMapType } from "@/types/CommentsMapType";
import { Post } from '@/types/Post';
import { CommentsList } from "@/components/CommentList/CommentList";

export default function PostDetailView() {
    const post_url = useLocalSearchParams().post_url as string;
    const posts = useSelector((state: RootState) => state.posts.posts);
    const post = posts.find((obj: Post) => obj.post_url === post_url);
    const commentsData: CommentsMapType = post?.comments || {};

    if (!post) {
        return <Text>Post not found</Text>; // Handle the case where the post is not found
    }

    return (
        <FlatList
            data={[post]} // Only the post is passed here
            renderItem={({ item }) => <PostCard post={item} disableTapOnPost={true} />}
            keyExtractor={(item) => item.post_url}
            contentContainerStyle={styles.container}
            ListFooterComponent={() => (
                <>
                    <Text style={styles.commentsTitle}>Comments</Text>
                    <CommentsList commentsData={commentsData} />
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});
