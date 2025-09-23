import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducers,
  },
});
