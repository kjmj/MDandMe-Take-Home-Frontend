import { View, Text } from 'react-native';
import { Comment } from '@/types/comment';

interface CommentProps {
    comment: Comment;
}

export function CommentCard({ comment }: CommentProps) {
    return (
        <View>
            <Text>{comment.text}</Text>
        </View>);
}
