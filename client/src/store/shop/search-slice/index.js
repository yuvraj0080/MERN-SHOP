import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const searchProducts = createAsyncThunk(
  "/search/searchProducts",
  async (keyword) => {
    const result = await axios.get(
      `http://127.0.0.1:5000/api/shop/search/${keyword}`
    );
    return result?.data;
  }
);

const searchSLice = createSlice({
  name: "searchSLice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSLice.actions;

export default searchSLice.reducer;
