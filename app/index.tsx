import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useEffect } from "react";
import { PostCard } from "@/components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchMorePosts } from "@/store/postsSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function Index() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);
  const currentPage = useSelector(
    (state: RootState) => state.posts.currentPage,
  );

  useEffect(() => {
    dispatch(fetchPosts(1)); // Fetch the first page initially
  }, [dispatch]);

  const handleEndReached = () => {
    if (!loading) {
      dispatch(fetchMorePosts(currentPage + 1));
    }
  };

  if (loading && currentPage === 1)
    return (
      <ActivityIndicator size="large" color="gray" style={styles.loading} />
    );
  if (error)
    return (
      <View>
        <Text style={styles.error}>Error: {error}</Text>
        <Text style={styles.error}>Make sure the backend is running!</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.post_url}
        renderItem={({ item }) => (
          <PostCard post={item} disableTapOnPost={false} showAll={false} />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="gray" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f1fe",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
