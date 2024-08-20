import { Comments } from '@/types/comments';
import { Post } from '@/types/post';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';

interface PostCardProps {
    post: Post;
    disableTapOnPost: boolean;
}

export function PostCard({ post, disableTapOnPost }: PostCardProps) {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={disableTapOnPost ? () => { } : () => postPress(post)}>
                <View>
                    <Text>{post.title}</Text>
                    <Text>{post.patient_description}</Text>
                    <View style={styles.engagementContainer}>
                        <Text>{numHugsText(post.num_hugs)}</Text>
                        <Text>{numCommentsText(post.comments)}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.engagementContainer}>
                <Button title='Hug'></Button>
                <Button title='Comment'></Button>
                <Button title='Save'></Button>
            </View>
        </View>
    )
}

function numHugsText(numHugs: number): string {
    return `${numHugs} Hug${numHugs === 1 ? "" : "s"}`
}

function numCommentsText(comments: Comments): string {
    const numComments = Object.keys(comments).length
    return `${numComments} Comment${numComments === 1 ? "" : "s"}`
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "gray"
    },
    engagementContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

function postPress(post: Post): void {
    router.push({ pathname: "/PostDetailView", params: { post_url: post.post_url } });
}