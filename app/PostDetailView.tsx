import { PostCard } from "@/components/PostCard";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CommentsMapType } from "@/types/CommentsMapType";
import { Post } from "@/types/PostFoo";
import { CommentsList } from "@/components/CommentList/CommentList";



export default function PostDetailView() {
    const post_url = useLocalSearchParams().post_url as string;
    const posts = useSelector((state: RootState) => state.posts.posts);
    const post = posts.find((obj: Post) => obj.post_url === post_url);
    const commentsData: CommentsMapType = post?.comments || {};

    if (!post) {
        return <Text>Post not found</Text>; // Handle the case where post is not found
    }

    return (
        <View>
            <PostCard post={post} disableTapOnPost={true} />
            <Text>Comments</Text>
            <CommentsList commentsData={commentsData} />
        </View>
    );
}
