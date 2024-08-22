import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import postsReducer, {
  fetchPosts,
  fetchMorePosts,
  updatePostField,
} from "@/store/postsSlice";
import { Post } from "@/types/Post";

const mock = new MockAdapter(axios);
const initialState = {
  posts: [] as Post[],
  loading: false,
  error: null,
  currentPage: 1,
};

describe("postsSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
      preloadedState: {
        posts: initialState,
      },
    });
  });

  afterEach(() => {
    mock.reset();
  });

  test("fetchPosts successful", async () => {
    const mockPosts: Post[] = [
      {
        post_url: "1",
        title: "Test Post",
        created_at: "2024-08-21T12:00:00Z",
        num_hugs: 10,
        patient_description: "Patient is feeling well.",
        assessment: "No significant changes.",
        question: "How are you today?",
        comments: {},
      },
    ];
    mock
      .onGet("http://localhost:3000/posts?_page=1&_limit=5")
      .reply(200, mockPosts);

    await store.dispatch(fetchPosts(1));
    const state = store.getState().posts;

    expect(state.posts).toEqual(mockPosts);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.currentPage).toBe(2);
  });

  test("fetchPosts failure", async () => {
    mock.onGet("http://localhost:3000/posts?_page=1&_limit=5").reply(500);

    await store.dispatch(fetchPosts(1));
    const state = store.getState().posts;

    expect(state.posts).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Request failed with status code 500");
  });

  test("fetchMorePosts when loading is true", async () => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
      preloadedState: {
        posts: { ...initialState, loading: true },
      },
    });

    await store.dispatch(fetchMorePosts(2));
    const state = store.getState().posts;

    expect(state.posts).toEqual([]);
    expect(state.loading).toBe(true);
    expect(state.currentPage).toBe(1);
  });

  test("updatePostField successful", async () => {
    const initialPost: Post = {
      post_url: "1",
      title: "Original Title",
      created_at: "2024-08-21T12:00:00Z",
      num_hugs: 10,
      patient_description: "Patient description.",
      assessment: "Assessment.",
      question: "Question?",
      comments: {},
    };
    const updatedPost: Post = {
      post_url: "1",
      title: "Updated Title",
      created_at: "2024-08-21T12:00:00Z",
      num_hugs: 10,
      patient_description: "Patient description.",
      assessment: "Assessment.",
      question: "Question?",
      comments: {},
    };
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
      preloadedState: {
        posts: { ...initialState, posts: [initialPost] },
      },
    });

    mock.onPut("http://localhost:3000/posts/1").reply(200, updatedPost);

    await store.dispatch(
      updatePostField({
        post: initialPost,
        field: "title",
        value: "Updated Title",
      }),
    );
    const state = store.getState().posts;

    expect(state.posts[0].title).toBe("Updated Title");
    expect(state.error).toBeNull();
  });

  test("updatePostField failure", async () => {
    const initialPost: Post = {
      post_url: "1",
      title: "Original Title",
      created_at: "2024-08-21T12:00:00Z",
      num_hugs: 10,
      patient_description: "Patient description.",
      assessment: "Assessment.",
      question: "Question?",
      comments: {},
    };
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
      preloadedState: {
        posts: { ...initialState, posts: [initialPost] },
      },
    });

    mock.onPut("http://localhost:3000/posts/1").reply(500);

    await store.dispatch(
      updatePostField({
        post: initialPost,
        field: "title",
        value: "Updated Title",
      }),
    );
    const state = store.getState().posts;

    expect(state.posts[0].title).toBe("Original Title");
    expect(state.error).toBe("Failed to update post");
  });
});
