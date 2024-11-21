import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: []
};

export const addProductReview = createAsyncThunk(
    "/review/getProductReviews",
    async (data) => {
      const result = await axios.post(
        `http://127.0.0.1:5000/api/shop/review/add`,data
      );
      return result?.data;
    }
  );

export const getProductReviews = createAsyncThunk(
    "/review/getProductReviews",
    async (productId) => {
      const result = await axios.get(
        `http://127.0.0.1:5000/api/shop/review/${productId}`
      );
      return result?.data;
    }
  );

const reviewProductsSlice = createSlice({
  name: "reviewProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductReviews.pending, state=>{
        state.isLoading=true
    }).addCase(getProductReviews.fulfilled, (state,action)=>{
        state.isLoading=false
        state.reviews = action.payload.data
    }).addCase(getProductReviews.rejected, state=>{
        state.isLoading=false
        state.reviews =[]
    })
  },
});

export default reviewProductsSlice.reducer
