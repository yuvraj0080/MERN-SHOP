import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrders = createAsyncThunk(
  "/order/getAllOrders",
  async () => {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/admin/orders/get`
    );

    return response.data;
  }
);

export const getOrderDetailsAdmin = createAsyncThunk(
  "/order/getOrderDetailsAdmin",
  async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/admin/orders/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
    "/order/updateOrderStatus",
    async ({id,orderStatus}) => {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/admin/orders/update/${id}`,{orderStatus}
      );
  
      return response.data;
    }
  );

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetailsAdmin: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = true;
        state.orderList = [];
      })
      .addCase(getOrderDetailsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsAdmin.rejected, (state) => {
        state.isLoading = true;
        state.orderDetails = null;
      });
  },
});

export const {resetOrderDetailsAdmin} = adminOrderSlice.actions

export default adminOrderSlice.reducer;
