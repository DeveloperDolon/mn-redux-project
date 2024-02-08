import baseApi from "../baseApi/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (data) => ({
                url: '/payments',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Base"]
        }),
        getWithdrawMethodByCustomerId: builder.query({
            query: (id) => `/payments/withdraw-method/${id}`,
            providesTags: ["Base"],
        }),

        saveWithdrawMethod: builder.mutation({
            query: (data) => ({
                url: '/payments/withdraw-method',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Base"]
        }),
        updateWithdrawMethod: builder.mutation({
            query: ({ data, id }) => ({
                url: `/payments/withdraw-method/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ["Base"]
        })
    })
})

export const { 
    useCreatePaymentMutation,
    useSaveWithdrawMethodMutation,
    useUpdateWithdrawMethodMutation,
    useGetWithdrawMethodByCustomerIdQuery
} = paymentApi;