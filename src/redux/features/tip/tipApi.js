import baseApi from "../baseApi/baseApi";

const tipApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTip: builder.mutation({
            query: (body) => ({
                url: `/tip`,
                method: "POST",
                body
            })
        }),
        getTipById: builder.query({
            query: (id) => `/tip/${id}`,
            providesTags: ["Base"],
        }),
        updateTip: builder.mutation({
            query: (id) => ({
                url: `/tip/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Base"],
        }),
    })
})

export const { useCreateTipMutation, useGetTipByIdQuery, useUpdateTipMutation } = tipApi;