import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice"; 

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    categories: categoryReducer, 
  },
});

export default store;
