import { PostCard } from "@/components/PostCard";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";



export default function PostDetailView() {
    const post_url = useLocalSearchParams().post_url;
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find(obj => obj.post_url === post_url);

    return (
        <View>
            <PostCard post={post}></PostCard>
            <Text>Comment feed here</Text>
        </View>
    );
}
