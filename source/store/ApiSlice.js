import {createSlice} from '@reduxjs/toolkit';

export const ApiSlice = createSlice({
  name: 'ApiSlice',

  initialState: {
    data: [],
    isLoading: false,
    error: false,
  },

  reducers: {
    fetchApiData: state => {
      state.isLoading = true;
    },
    fetchApiDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchApiDataFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {fetchApiData, fetchApiDataFail, fetchApiDataSuccess} =
  ApiSlice.actions;

export default ApiSlice.reducer;
