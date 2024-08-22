import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { PostCard } from "@/components/PostCard";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CommentsMapType } from "@/types/CommentsMapType";
import { Post } from "@/types/Post";
import { CommentsList } from "@/components/CommentList/CommentList";
import EmptyState from "@/components/CommentList/EmptyState";

export default function PostDetailView() {
  const post_url = useLocalSearchParams().post_url as string;
  const posts = useSelector((state: RootState) => state.posts.posts);
  const post = posts.find((obj: Post) => obj.post_url === post_url);
  const commentsData: CommentsMapType = post?.comments || {};

  if (!post) {
    return <Text>Post not found</Text>; // Handle the case where the post is not found
  }

  const hasComments = Object.keys(commentsData).length > 0;

  return (
    <FlatList
      style={styles.container}
      data={[post]} // Only the post is passed here
      renderItem={({ item }) => (
        <PostCard post={item} disableTapOnPost={true} showAll={true} />
      )}
      keyExtractor={(item) => item.post_url}
      ListFooterComponent={() => (
        <>
          <Text style={styles.commentsTitle}>Comments</Text>
          {hasComments ? (
            <CommentsList commentsData={commentsData} />
          ) : (
            <EmptyState />
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  container: {
    backgroundColor: "#fafafe",
  },
});
