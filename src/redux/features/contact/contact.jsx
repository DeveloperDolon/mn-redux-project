import baseApi from "../baseApi/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createContacts: builder.mutation({
      query: () => body => ({
        url: `/contacts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Base"],
    }),
  }),
});
export const { useCreateContactsMutation } = contactApi;
