import { PostCard } from "@/components/PostCard";
import { CommentCard } from "@/components/CommentCard";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Comment } from "@/types/comment";



export default function PostDetailView() {
    const post_url = useLocalSearchParams().post_url;
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find(obj => obj.post_url === post_url);
    const commentsList = Object.values(post.comments) as Comment[]

    return (
        <View>
            <PostCard post={post} disableTapOnPost={true}></PostCard>
            <Text>Comments</Text>
            <FlatList
                data={commentsList}
                renderItem={({ item }) => <CommentCard comment={item} />}
            />
        </View>
    );
}
