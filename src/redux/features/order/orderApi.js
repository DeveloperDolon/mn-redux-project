import baseApi from "../baseApi/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Base"]
        }),
        getAllOrders: builder.query({
            query: () => `/orders`,
            providesTags: ["Base"]
        }),
        getActiveAllOrders: builder.query({
            query: () => `/orders/activeAll`,
            providesTags: ["Base"]
        }),
        // =========
        getActiveOrders: builder.query({
            query: () => `/orders/active`,
            providesTags: ["Base"]
        }),
        getRevisionOrders: builder.query({
            query: () => `/orders/revision`,
            providesTags: ["Base"]
        }),
        getOngoingOrders: builder.query({
            query: () => `/orders/ongoing`,
            providesTags: ["Base"]
        }),
        getWaitingOrders: builder.query({
            query: () => `/orders/waiting`,
            providesTags: ["Base"]
        }),
        getDeliveredOrders: builder.query({
            query: () => `/orders/delivered`,
            providesTags: ["Base"]
        }),
        getCompletedOrders: builder.query({
            query: () => `/orders/completed`,
            providesTags: ["Base"]
        }),
        getCancelledOrders: builder.query({
            query: () => `/orders/cancelled`,
            providesTags: ["Base"]
        }),
        // ==============
        getAnalyticsDataAllTime: builder.query({
            query: () => `/orders/analyticsAllTime`,
            providesTags: ["Base"]
        }),
        getAnalyticsDataLastMonth: builder.query({
            query: () => `/orders/analyticsLastMonth`,
            providesTags: ["Base"]
        }),
        getAnalyticsDataLasThreeMonth: builder.query({
            query: () => `/orders/analyticsLastThreeMonths`,
            providesTags: ["Base"]
        }),
        getAnalyticsDataLasSixMonth: builder.query({
            query: () => `/orders/analyticsLastSixMonths`,
            providesTags: ["Base"]
        }),
        getAnalyticsDataLasYear: builder.query({
            query: () => `/orders/analyticsLastYear`,
            providesTags: ["Base"]
        }),
        getAnalytics2022Data: builder.query({
            query: () => `/orders/analytics2022`,
            providesTags: ["Base"]
        }),
        getAnalytics2021Data: builder.query({
            query: () => `/orders/analytics2021`,
            providesTags: ["Base"]
        }),
        // =========
        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ["Base"]
        }),
        getOrderByCustomerId: builder.query({
            query: (id) => `/orders/customer/${id}`,
            providesTags: ["Base"]
        }),
        updateOrderPrice: builder.mutation({
            query: ({ id, data }) => ({
                url: `/orders/fastDelivery/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Base"]
        }),
        updateOrderIsActive: builder.mutation({
            query: (id) => ({
                url: `/orders/isActive/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ["Base"]
        })
    })
})

export const {
    useCreateOrderMutation,
    useUpdateOrderPriceMutation,
    useGetOrderByIdQuery,
    useGetAllOrdersQuery,
    useGetActiveOrdersQuery,
    useGetRevisionOrdersQuery,
    useGetOngoingOrdersQuery,
    useGetWaitingOrdersQuery,
    useGetDeliveredOrdersQuery,
    useGetCompletedOrdersQuery,
    useGetCancelledOrdersQuery,
    useGetActiveAllOrdersQuery,
    useGetOrderByCustomerIdQuery,
    useUpdateOrderIsActiveMutation,
    useGetAnalyticsDataAllTimeQuery,
    useGetAnalyticsDataLastMonthQuery,
    useGetAnalyticsDataLasThreeMonthQuery,
    useGetAnalyticsDataLasSixMonthQuery,
    useGetAnalyticsDataLasYearQuery,
    useGetAnalytics2022DataQuery,
    useGetAnalytics2021DataQuery
} = orderApi;
