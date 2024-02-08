import baseApi from "../baseApi/baseApi";

const requirementsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRequirements: builder.mutation({
            query: (body) => ({
                url: '/requirements',
                method: "POST",
                body
            }),
            invalidatesTags: ["Base"]
        }),
        getRequirementById: builder.query({
            query: (id) => `/requirements/${id}`,
            providesTags: ["Base"]
        }),
        updateRequirementById: builder.mutation({
            query: ({ data, id }) => ({
              url: `/requirements/${id}`,
              method: "PUT",
              body: data
            }),
            invalidatesTags: ["Base"],
          }),
    })
})

export const { useCreateRequirementsMutation, useGetRequirementByIdQuery, useUpdateRequirementByIdMutation } = requirementsApi;