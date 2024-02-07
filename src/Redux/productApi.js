import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getproductByName: builder.query({
      query: (name) => `products`,
    }),
  }),
});

export const productDetailsApi = createApi({
  reducerPath: 'productDetailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getproductDetailsByName: builder.query({
      query: (name) => `products/${name}`,
    }),
  }),
})


export const { useGetproductByNameQuery } = productApi;
export const { useGetproductDetailsByNameQuery } = productDetailsApi;
