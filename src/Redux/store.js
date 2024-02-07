import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi, productDetailsApi } from "./productApi";
import counterReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [productDetailsApi.reducerPath]: productDetailsApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(productApi.middleware)
    .concat(productDetailsApi.middleware),
});

setupListeners(store.dispatch);
