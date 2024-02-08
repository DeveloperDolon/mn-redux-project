import baseApi from "../baseApi/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createContact: builder.mutation({
      query: body => ({
        url: `/contact`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Base"],
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
