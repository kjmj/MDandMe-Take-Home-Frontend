import React, { useState, useRef } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
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

  const [comment, setComment] = useState("");
  const commentInputRef = useRef<TextInput | null>(null);

  if (!post) {
    return <Text>Post not found</Text>; // Handle the case where the post is not found
  }

  const hasComments = Object.keys(commentsData).length > 0;

  const handleSendComment = () => {
    if (comment.trim()) {
      // Handle sending the comment
      console.log("Comment sent:", comment);
      setComment("");
      commentInputRef.current?.blur(); // Dismiss the keyboard
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 70}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <FlatList
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
          <View style={styles.commentBoxContainer}>
            <TextInput
              ref={commentInputRef}
              style={styles.commentBox}
              placeholder="Leave a comment here"
              value={comment}
              onChangeText={setComment}
              onSubmitEditing={handleSendComment}
              multiline
              numberOfLines={3} // Show up to 3 lines of text
              scrollEnabled
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendComment}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    margin: 10,
  },
  commentBoxContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 10,
    backgroundColor: "white",
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
  },
  sendButtonText: {
    color: "rgb(255, 150, 7)",
    fontWeight: "bold",
  },
});
