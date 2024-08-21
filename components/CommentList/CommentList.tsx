import { CommentsMapType } from "@/types/CommentsMapType";
import React from 'react';
import { FlatList } from 'react-native';
import { CommentType } from "@/components/CommentList/types/CommentType";
import { Comment } from "@/components/CommentList/Comment";
import { ParsedCommentsType } from "@/components/CommentList/types/ParsedCommentsType";

interface CommentsListProps {
    commentsData: CommentsMapType;
}

export function CommentsList({ commentsData }: CommentsListProps) {
    const commentsTree = parseComments(commentsData);

    return (
        <FlatList
            data={Object.values(commentsTree)}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const parseComments = (comments: CommentsMapType): ParsedCommentsType => {
    const commentTree: ParsedCommentsType = {};
    const commentMap: { [key: string]: CommentType } = {};

    // Initialize the comment map
    for (const id in comments) {
        commentMap[id] = { ...comments[id], children: [] };
    }

    // Build the tree structure
    for (const id in commentMap) {
        const comment = commentMap[id];
        if (comment.parent_id) {
            commentMap[comment.parent_id].children.push(comment);
        } else {
            commentTree[id] = comment;
        }
    }

    return commentTree;
};
