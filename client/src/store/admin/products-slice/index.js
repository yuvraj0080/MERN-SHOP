import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProducts = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://127.0.0.1:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (formData) => {
    const result = await axios.get(
      "http://127.0.0.1:5000/api/admin/products/get"
    );
    return result?.data;
  }
);

export const editProducts = createAsyncThunk(
  "/products/editProducts",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://127.0.0.1:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProducts = createAsyncThunk(
  "/products/addnewproduct",
  async (id) => {
    const result = await axios.delete(
      `http://127.0.0.1:5000/api/admin/products/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
