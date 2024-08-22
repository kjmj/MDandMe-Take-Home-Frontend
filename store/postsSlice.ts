import { Post } from '@/types/Post';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Platform } from 'react-native';

function API_URL(): string {
    return (Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost') + ":3000/posts";
}

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
    console.log(API_URL())
    const response = await axios.get(API_URL());
    return response.data;
});

// Thunk for updating a single field in a post
export const updatePostField = createAsyncThunk(
    'posts/updatePostField',
    async ({ post, field, value }: { post: Post; field: keyof Post; value: any }, { rejectWithValue }) => {
        try {
            // Update the specific field
            const updatedPost = {
                ...post,
                [field]: value,
            };

            // Send the updated post to the server
            const response = await axios.put<Post>(`${API_URL()}/${post.post_url}`, updatedPost);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to update post');
        }
    }
);

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
            })
            .addCase(updatePostField.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                state.posts = state.posts.map(post =>
                    post.post_url === updatedPost.post_url ? updatedPost : post
                );
            })
            .addCase(updatePostField.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default postsSlice.reducer;
