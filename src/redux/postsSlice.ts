import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../supabase/client';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await supabase.from('posts').select('*');
  return data as Post[];
});

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ title, content }: { title: string; content: string }) => {
    const { data } = await supabase.from('posts').insert([{ title, content }]).select();
    return data?.[0] as Post;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
  },
});

export default postsSlice.reducer;
