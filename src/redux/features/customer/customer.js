import baseApi from "../baseApi/baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (data) => ({
        url: `/customer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Base"],
    }),
    createCustomerSocialMedia: builder.mutation({
      query: (data) => ({
        url: `/customer/social`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Base"],
    }),
    getCustomer: builder.query({
      query: () => `/customer`,
      providesTags: ["Base"],
    }),
    getCustomerById: builder.query({
      query: (email) => `/customer/${email}`,
      providesTags: ["Base"],
    }),
    updateCustomerById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/customer/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Base"],
    }),
    updateCustomerSocialMediaById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/customer/social/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Base"],
    })
  }),
});

export const {
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerByIdMutation,
  useCreateCustomerSocialMediaMutation,
  useUpdateCustomerSocialMediaByIdMutation,
  useGetCustomerQuery,
} = customerApi;
