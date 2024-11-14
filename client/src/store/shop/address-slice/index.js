import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresseses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `http://127.0.0.1:5000/api/shop/address/add`,
      formData
    );
    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "/addresseses/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://127.0.0.1:5000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/addresseses/fetchAllAddress",
  async (userId) => {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresseses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://127.0.0.1:5000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
        
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
       
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state,action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state,action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer
