import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { ThemedText } from './ThemedText';
import IconButton from '@/components/IconButton';
import { updatePostField } from '@/store/postsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { CommentsMapType } from '@/types/CommentsMapType';
import { Post } from '@/types/Post';
import { router } from 'expo-router';
import { getTimeAgo } from '@/util/utils';
import { AvatarImage } from '@/components/AvatarImage';

interface PostCardProps {
    post: Post;
    disableTapOnPost: boolean;
    showAll: boolean;
}

export function PostCard({ post, disableTapOnPost, showAll }: PostCardProps) {
    const dispatch: AppDispatch = useDispatch();
    const [seeMore, setSeeMore] = useState(showAll);

    const handleHeartPress = () => {
        dispatch(updatePostField({ post: post, field: 'num_hugs', value: post.num_hugs + 1 }));
    };

    const toggleSeeMore = () => {
        setSeeMore(!seeMore);
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={disableTapOnPost ? () => { } : () => postPress(post)}>
                <View style={styles.bottomBorder}>
                    <View style={styles.headerContainer}>
                        <AvatarImage />
                        <View style={styles.textContainer}>
                            <ThemedText type='defaultSemiBold' >{post.title}</ThemedText>
                            <Text style={styles.postTime}>{getTimeAgo(new Date(post.created_at))}</Text>
                        </View>
                    </View>

                    <Text style={styles.description} numberOfLines={seeMore ? undefined : 3}>
                        {post.patient_description}
                    </Text>
                    {!seeMore && (
                        <TouchableWithoutFeedback onPress={toggleSeeMore}>
                            <Text style={styles.seeMoreText}>...see more</Text>
                        </TouchableWithoutFeedback>
                    )}
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
    );
}

function numComments(comments: CommentsMapType): number {
    return Object.keys(comments).length;
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginBottom: 13,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "white",
    },
    bottomBorder: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 6,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    postTime: {
        fontSize: 12,
        color: 'gray',
    },
    description: {
        marginBottom: 12,
    },
    seeMoreText: {
        alignSelf: 'flex-end',
        color: 'gray',
        fontWeight: '700',
        marginBottom: 12,
    },
    engagementContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

function postPress(post: Post): void {
    router.push({ pathname: "/PostDetailView", params: { post_url: post.post_url } });
}
