import baseApi from "../baseApi/baseApi";

const gigsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGigs: builder.query({
      query: () => "/gigs",
      providesTags: ["Base"],
    }),
    getGigsById: builder.query({
      query: (id) => `/gigs/${id}`,
      providesTags: ["Base"],
    }),
    createGig: builder.mutation({
      query: (body) => ({
        url: `/gigs`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Base"],
    }),
    updateGig: builder.mutation({
      query: ({ id, body }) => ({
        url: `/gigs/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Base"],
    }),
    deleteGig: builder.mutation({
      query: (id) => ({
        url: `/gigs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Base"],
    }),
    getIndustryUnique: builder.query({
      query: () => `/gigs/industryUnique`,
      providesTags: ["Base"],
    }),
    getGigsByIndustry: builder.query({
      query: (industry) => `/gigs/industry/${industry}`,
      providesTags: ["Base"],
    }),
    searchGigs: builder.query({
      query: (searchQuery) => `/gigs/search?searchQuery=${searchQuery}`,
      providesTags: ["Base"],
    }),
    getGigsByCategoryId: builder.query({
      query:({id, page}) => `/gigs/pagination/${id}?page=${page}`,
      providesTags: ["Base"],
    }),
    getRelatedGigsByCategoryId: builder.query({
      query: ({id, categoryId}) => `/gigs/related/${id}/${categoryId}`,
      providesTags: ["Base"], 
    })
  }),
});

export const {
  useGetGigsQuery,
  useGetGigsByIdQuery,
  useGetIndustryUniqueQuery,
  useGetGigsByIndustryQuery,
  useCreateGigMutation,
  useDeleteGigMutation,
  useUpdateGigMutation,
  useSearchGigsQuery,
  useGetGigsByCategoryIdQuery,
  useGetRelatedGigsByCategoryIdQuery
} = gigsApi;
