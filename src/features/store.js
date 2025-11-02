// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "../features/categorySlice";
import foodReducer from "../features/foodSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    categories: categoryReducer,
    foods: foodReducer,
  },
});
