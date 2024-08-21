import { ActivityIndicator, FlatList, View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { PostCard } from "@/components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/store/postsSlice";
import { AppDispatch, RootState } from "@/store";

export default function Index() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} disableTapOnPost={false} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});