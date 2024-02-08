import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://52.221.241.120:5000/api" }),
  tagTypes: ["Base"],
  endpoints: builder => ({}),
});

export default baseApi;
