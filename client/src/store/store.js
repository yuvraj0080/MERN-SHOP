import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/products-slice";
import shopProductSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: shopProductSlice,
    shopCart: shoppingCartSlice,
  },
});

export default store;
