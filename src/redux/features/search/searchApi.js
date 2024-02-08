import baseApi from "../baseApi/baseApi";

const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (search) => `/gigs/search?search=${search}`,
      providesTags: ["Base"],
    }),
  }),
});

export const { useGetSearchQuery } = searchApi;
