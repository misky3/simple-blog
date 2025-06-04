import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../supabase/client';

interface Post {
  id: number;
  title: string;
  content: string;
  user_id?: string;
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
  const { data, error } = await supabase.from('posts').select('*');
  if (error) throw error;
  return data as Post[];
});

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ title, content }: { title: string; content: string }) => {
    const {data:{user}, error: useError} = await supabase.auth.getUser();

    if(useError || !user) throw new Error("Not Authenticated");

    const { data, error } = await supabase.from('posts').insert([{ title, content, user_id: user.id }]).select();

    if(error) throw error;
    return data?.[0] as Post;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({id, title, content}: {id: string; title: string; content: string}) =>{
    const {data, error } = await supabase.from('posts').update({title, content}).eq('id',id).select();

    if(error) throw error;
    return data?.[0] as Post;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: string) =>{
    const {error} = await supabase.from('posts').delete().eq('id',id);
    if(error) throw error;
    return id;
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
    builder.addCase(updatePost.fulfilled,(state, action)=>{
      const updatePost = action.payload;
      const index = state.posts.findIndex((p) => p.id === updatePost.id);
      if (index !== -1){
        state.posts[index] = updatePost;
      }
    });
    builder.addCase(deletePost.fulfilled, (state, action)=>{
      state.posts = state.posts.filter(post => post.id !== action.payload);
    });
  },
});

export default postsSlice.reducer;
