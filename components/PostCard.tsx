import { CommentsMapType } from '@/types/CommentsMapType';
import { Post } from '@/types/Post';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { ThemedText } from './ThemedText';
import IconButton from '@/components/IconButton';
import { updatePostField } from '@/store/postsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';

interface PostCardProps {
    post: Post;
    disableTapOnPost: boolean;
}

export function PostCard({ post, disableTapOnPost }: PostCardProps) {
    const dispatch: AppDispatch = useDispatch();

    const handleHeartPress = () => {
        dispatch(updatePostField({ post: post, field: 'num_hugs', value: post.num_hugs + 1 }));
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={disableTapOnPost ? () => { } : () => postPress(post)}>
                <View style={styles.zzz}>
                    <ThemedText type='defaultSemiBold' style={styles.textContainer}>{post.title}</ThemedText>
                    <Text style={styles.textContainer}>{post.patient_description}</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.engagementContainer}>
                <IconButton
                    iconName="heart"
                    count={post.num_hugs}
                    onPress={handleHeartPress}
                    noStateChange={true}
                    animate={true}
                    showCount={true}
                />

                <IconButton
                    iconName="comment"
                    count={numComments(post.comments)}
                    onPress={() => console.log('Comment pressed')}
                    noStateChange={true}
                    showCount={true}
                />

                <IconButton
                    iconName="bookmark"
                    onPress={() => console.log('Bookmark button pressed')}
                    animate={true}
                    filledColor="blue"
                    showCount={false}
                />

            </View>
        </View>
    )
}


function numComments(comments: CommentsMapType): number {
    return Object.keys(comments).length
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginBottom: 13,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "white",
        // // Shadow for iOS
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
        // // Shadow for Android
        // elevation: 5,
    },
    zzz: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 6,

    },
    textContainer: {
        marginBottom: 12,
    },
    engagementContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

function postPress(post: Post): void {
    router.push({ pathname: "/PostDetailView", params: { post_url: post.post_url } });
}