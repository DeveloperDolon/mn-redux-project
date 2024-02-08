import baseApi from "../baseApi/baseApi";

const adminUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAminUsers: builder.query({
      query: () => "/adminUsers/all",
      providesTags: ["Base"],
    }),
    getAdminUserByEmail: builder.query({
      query: ({ email }) => `/adminUsers/${email}`,
      providesTags: ["Base"],
    }),
    getRoleByEmail: builder.query({
      query: ({ email }) => `/adminUsers/role/${email}`,
      providesTags: ["Base"],
    }),
    getCurrentUser: builder.query({
      query: (email) => `/adminUsers/current/${email}`
    }),
    postAdminUser: builder.mutation({
      query: (data) => ({
        url: "/adminUsers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Base"],
    }),
  }),
});

export const {
  useGetAminUsersQuery,
  useGetRoleByEmailQuery,
  useGetCurrentUserQuery,
  usePostAdminUserMutation,
  useGetAdminUserByEmailQuery,
} = adminUserApi;
