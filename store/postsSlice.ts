import { Post } from '@/types/Post';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Platform } from 'react-native';

interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    // Android doesn't use localhost properly - this is a workaround
    const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';
    const response = await axios.get(baseUrl + ":3000/posts");
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
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
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default postsSlice.reducer;
