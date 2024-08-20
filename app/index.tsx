import { FlatList, View } from "react-native";
import { useEffect } from "react";
import { PostCard } from "@/components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/store/postsSlice";

export default function Index() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

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
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}