import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  image: string;
  content: string;
  publishedAt: string;
}

interface PostsState {
  posts: Post[];
  post: Post | null;
  relatedPosts: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  post: null,
  relatedPosts: [],
  loading: false,
};

// ✅ Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://jsonplaceholder.org/posts");
  return response.data.slice(0, 50); // Limit to 16 posts
});

// ✅ Fetch a single post by ID
export const fetchPostById = createAsyncThunk("posts/fetchPostById", async (id: string) => {
  const response = await axios.get(`https://jsonplaceholder.org/posts/${id}`);
  return response.data;
});

// ✅ Fetch related posts (excluding the current post)
export const fetchRelatedPosts = createAsyncThunk("posts/fetchRelatedPosts", async (id: string) => {
  const response = await axios.get("https://jsonplaceholder.org/posts");
  return response.data.filter((post: Post) => post.id !== Number(id)).slice(0, 7);
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.relatedPosts = action.payload;
      });
  },
});

export default postsSlice.reducer;
