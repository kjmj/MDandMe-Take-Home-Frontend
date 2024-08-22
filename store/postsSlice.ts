import { Post } from '@/types/Post';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Platform } from 'react-native';
import { RootState } from '@/store/store'; // Import RootState

function API_URL(): string {
    return (Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost') + ":3000/posts";
}

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

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page: number) => {
    const response = await axios.get(`${API_URL()}?_page=${page}&_limit=${PAGE_SIZE}`);
    return response.data;
});

export const fetchMorePosts = createAsyncThunk('posts/fetchMorePosts', async (page: number, { getState, dispatch }) => {
    const { posts: { loading } } = getState() as RootState;
    if (loading) return;

    dispatch(fetchPosts(page));
});

export const updatePostField = createAsyncThunk(
    'posts/updatePostField',
    async ({ post, field, value }: { post: Post; field: keyof Post; value: any }, { rejectWithValue }) => {
        try {
            const updatedPost = {
                ...post,
                [field]: value,
            };

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
                if (state.currentPage === 1) {
                    state.posts = action.payload;
                } else {
                    state.posts = [...state.posts, ...action.payload];
                }
                state.currentPage++;
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