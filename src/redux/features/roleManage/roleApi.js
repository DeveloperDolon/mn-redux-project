import baseApi from "../baseApi/baseApi";

const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoleByEmail: builder.query({
      query: (email) => `/adminUsers/role/${email}`,
      providesTags: ["Base"],
    }),
    getIdByEmail: builder.query({
      query: (email) => `/adminUsers/id/${email}`,
      providesTags: ["Base"],
    }),
  }),
});

export const { useGetRoleByEmailQuery, useGetIdByEmailQuery } = roleApi;
