import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { PostCard } from "@/components/PostCard";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { CommentsMapType } from "@/types/CommentsMapType";
import { Post } from "@/types/Post";
import { CommentsList } from "@/components/CommentList/CommentList";
import { EmptyState } from "@/components/CommentList/EmptyState";
import { addComment } from "@/store/postsSlice";

export default function PostDetailView() {
  const post_url = useLocalSearchParams().post_url as string;
  const shouldFocusCommentsTextArea = Boolean(
    useLocalSearchParams().should_focus_comments_text_area as string,
  );

  const posts = useSelector((state: RootState) => state.posts.posts);
  const post = posts.find((obj: Post) => obj.post_url === post_url);
  const commentsData: CommentsMapType = post?.comments || {};

  const [comment, setComment] = useState("");
  const commentInputRef = useRef<TextInput | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (shouldFocusCommentsTextArea && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [shouldFocusCommentsTextArea]);

  if (!post) {
    return <Text>Post not found</Text>; // Handle the case where the post is not found
  }

  const hasComments = Object.keys(commentsData).length > 0;

  function handleSendComment() {
    if (comment.trim()) {
      const newComment = {
        parent_id: null, // or the relevant parent ID for replies
        display_name: "Anonymous", // replace with actual user's display name
        text: comment,
        created_at: new Date().toISOString(),
      };

      dispatch(
        addComment({ postUrl: post?.post_url ?? "", comment: newComment }),
      );

      // Clear the input field
      setComment("");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 70}
    >
      <FlatList
        data={[post]}
        renderItem={({ item }) => (
          <PostCard post={item} disableTapOnPost={true} showAll={true} />
        )}
        keyExtractor={(item) => item.post_url}
        ListFooterComponent={
          <View>
            <Text style={styles.commentsTitle}>Comments</Text>
            {hasComments ? (
              <CommentsList commentsData={commentsData} />
            ) : (
              <EmptyState />
            )}
          </View>
        }
      />
      <View style={styles.commentBoxContainer}>
        <TextInput
          ref={commentInputRef}
          style={styles.commentBox}
          placeholder="Leave a comment here"
          value={comment}
          onChangeText={setComment}
          onSubmitEditing={handleSendComment}
          multiline
          numberOfLines={3}
          scrollEnabled
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafe",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  commentBoxContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  commentBox: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fafafe",
    textAlignVertical: "top",
  },
  sendButton: {
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 150, 7, 0.1)",
    borderRadius: 8,
    marginLeft: 10,
    height: 40,
    maxHeight: 40,
  },
  sendButtonText: {
    color: "rgb(255, 150, 7)",
    fontWeight: "bold",
  },
});
