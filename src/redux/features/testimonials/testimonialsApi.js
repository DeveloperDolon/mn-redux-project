import baseApi from "../baseApi/baseApi";

const testimonialsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTestimonial: builder.mutation({
            query: (body) => ({
                url: `/testimonials`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Base"],
        }),
        getAllTestimonials: builder.query({
            query: () => '/testimonials',
            providesTags: ["Base"]
        }),
        getAverageFiveStartToOneStartRating: builder.query({
            query: () => '/testimonials/fivetoone',
            providesTags: ["Base"]
        }),
        getAverageRating: builder.query({
            query: () => '/testimonials/average',
            providesTags: ["Base"]
        }),
        getRecentTestimonials: builder.query({
            query: () => '/testimonials/recent',
            providesTags: ["Base"]
        }),
        getRelevantTestimonials: builder.query({
            query: () => '/testimonials/relevant',
            providesTags: ["Base"]
        }),
        searchByTestimonials: builder.query({
            query: (searchTerm) => `/testimonials/searchCustomer?search=${searchTerm}`,
            providesTags: ["Base"]
        })
    })
})

export const {
    useCreateTestimonialMutation,
    useGetAllTestimonialsQuery,
    useGetAverageRatingQuery,
    useGetRecentTestimonialsQuery,
    useGetRelevantTestimonialsQuery,
    useSearchByTestimonialsQuery,
    useGetAverageFiveStartToOneStartRatingQuery
} = testimonialsApi;