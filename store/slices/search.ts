import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { searchBlog } from '@/api/api';

import type { AppState, AppThunk } from '..';

export const SearchSlice = createSlice({
  name: 'search',

  initialState: {
    data: null,
  },

  reducers: {
    setSearchData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state:any, action:any) => {
      if (!action.payload.search) {
        return state;
      }
      state.data = action.payload.search.data;
    });
  },
});

export const { setSearchData } = SearchSlice.actions;

export const filteredData = (state: AppState) => state.search.data;

export const fetchBlog =
  (params:any): AppThunk =>
  async (dispatch) => {
    const data = await searchBlog(params);
    dispatch(setSearchData(data));
  };

export default SearchSlice.reducer;
