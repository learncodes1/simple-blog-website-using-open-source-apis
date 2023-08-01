import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { blogFetchPage } from '@/api/api';

import type { AppState, AppThunk } from '..';

export const BlogSlice = createSlice({
  name: 'blog',

  initialState: {
    data: null,
  },

  reducers: {
    setBlogData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
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
  (page): AppThunk =>
  async (dispatch) => {
    const data = await blogFetchPage(page);
    dispatch(setBlogData(data));
  };

export default BlogSlice.reducer;
