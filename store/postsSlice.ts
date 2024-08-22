import { Post } from "@/types/Post";
import { Comment } from "@/types/Comment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store/store";
import { API_URL } from "@/store/storeUtils";

const PAGE_SIZE = 5; // Number of posts to load per page

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  currentPage: 1,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number) => {
    const response = await axios.get(
      `${API_URL()}?_page=${page}&_limit=${PAGE_SIZE}`,
    );
    return response.data;
  },
);

export const fetchMorePosts = createAsyncThunk(
  "posts/fetchMorePosts",
  async (page: number, { getState, dispatch }) => {
    const {
      posts: { loading },
    } = getState() as RootState;
    if (loading) return;

    dispatch(fetchPosts(page));
  },
);

export const updatePostField = createAsyncThunk(
  "posts/updatePostField",
  async (
    { post, field, value }: { post: Post; field: keyof Post; value: any },
    { rejectWithValue },
  ) => {
    try {
      const updatedPost = {
        ...post,
        [field]: value,
      };

      const response = await axios.put<Post>(
        `${API_URL()}/${post.post_url}`,
        updatedPost,
      );
      return response.data;
    } catch {
      return rejectWithValue("Failed to update post");
    }
  },
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (
    { postUrl, comment }: { postUrl: string; comment: Omit<Comment, "id"> },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as RootState;
      const post = state.posts.posts.find((p) => p.post_url === postUrl);

      if (!post) {
        return rejectWithValue("Post not found");
      }

      const newCommentId = Object.keys(post.comments).length + 1;

      const updatedPost = {
        ...post,
        comments: {
          ...post.comments,
          [newCommentId]: {
            ...comment,
            id: newCommentId,
          },
        },
      };

      const response = await axios.put<Post>(
        `${API_URL()}/${postUrl}`,
        updatedPost,
      );

      return response.data;
    } catch {
      return rejectWithValue("Failed to add comment");
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentPage === 1) {
          state.posts = action.payload;
        } else {
          const newPosts = action.payload.filter(
            (newPost: { post_url: string }) =>
              !state.posts.some(
                (existingPost) => existingPost.post_url === newPost.post_url,
              ),
          );
          state.posts = [...state.posts, ...newPosts];
        }
        state.currentPage++;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updatePostField.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post.post_url === updatedPost.post_url,
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      })
      .addCase(updatePostField.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post.post_url === updatedPost.post_url,
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default postsSlice.reducer;
