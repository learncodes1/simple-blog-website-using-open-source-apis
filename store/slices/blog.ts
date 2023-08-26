import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { blogFetchPage } from '@/api/api';

import type { AppState, AppThunk } from '..';

interface BlogState {
  data: any;
}

const initialState:BlogState = {
  data: null,
}

export const BlogSlice = createSlice({
  name: 'blog',
initialState,
  reducers: {
    setBlogData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state:any, action:any) => {
      if (!action.payload.blog) {
        return state;
      }
      state.data = action.payload.blog.data;
    });
  },
});

export const { setBlogData } = BlogSlice.actions;

export const selectBlogData = (state: AppState) => state.blog.data;

export const fetchBlogData =
  (page:any): AppThunk =>
  async (dispatch) => {
    const data = await blogFetchPage(page);
    dispatch(setBlogData(data));
  };

export default BlogSlice.reducer;
