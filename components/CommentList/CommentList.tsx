import { CommentsMapType } from "@/types/CommentsMapType";
import React from "react";
import { FlatList } from "react-native";
import { CommentType } from "@/components/CommentList/types/CommentType";
import { Comment } from "@/components/CommentList/Comment";
import { ParsedCommentsType } from "@/components/CommentList/types/ParsedCommentsType";

interface CommentsListProps {
  commentsData: CommentsMapType;
}

export function CommentsList({ commentsData }: CommentsListProps) {
  const commentsTree = parseComments(commentsData);

  // Convert the tree to an array and sort it
  const sortedComments = Object.values(commentsTree).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <FlatList
      data={sortedComments}
      renderItem={({ item }) => <Comment comment={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

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
