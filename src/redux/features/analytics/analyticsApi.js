import baseApi from "../baseApi/baseApi";

const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectDetailsAnalyticsLastWeek: builder.query({
            query: () => `/analytics/month`,
            providesTags: ["Base"]
        }),
        getProjectDetailsAnalyticsLast30Days: builder.query({
            query: () => `/analytics/30days`,
            providesTags: ["Base"]
        }),
        getProjectDetailsAnalyticsLastMonth: builder.query({
            query: () => `/analytics/month`,
            providesTags: ["Base"]
        }),
        getProjectDetailsAnalyticsLast3Months: builder.query({
            query: () => `/analytics/3months`,
            providesTags: ["Base"]
        }),
        getProjectDetailsAnalyticsLast6Months: builder.query({
            query: () => `/analytics/6months`,
            providesTags: ["Base"]
        }),
        getProjectDetailsAnalyticsThisYear: builder.query({
            query: () => `/analytics/year`,
            providesTags: ["Base"]
        }),
        getProjectDetailsAnalytics2023: builder.query({
            query: () => `/analytics/2023`,
            providesTags: ["Base"]
        }),
        getProjectDetailsAnalytics2022: builder.query({
            query: () => `/analytics/2022`,
            providesTags: ["Base"]
        }),
        getProjectDetailsAnalyticsAllTime: builder.query({
            query: () => `/analytics/all`,
            providesTags: ["Base"]
        }),
        getActiveProjectsAnalytics: builder.query({
            query: () => `/analytics/activeprojects`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalytics: builder.query({
            query: () => `/analytics/finishedprojects`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalyticsLast7Days: builder.query({
            query: () => `/analytics/finishedprojects/7days`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalyticsLast30Days: builder.query({
            query: () => `/analytics/finishedprojects/30days`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalyticsLastMonth: builder.query({
            query: () => `/analytics/finishedprojects/lastmonth`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalyticsLast3Months: builder.query({
            query: () => `/analytics/finishedprojects/last3month`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalyticsLast6Months: builder.query({
            query: () => `/analytics/finishedprojects/last6month`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalyticsThisYear: builder.query({
            query: () => `/analytics/finishedprojects/year`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalytics2023: builder.query({
            query: () => `/analytics/finishedprojects/2023`,
            providesTags: ["Base"]
        }),
        getFinishedProjectsAnalytics2022: builder.query({
            query: () => `/analytics/finishedprojects/2022`,
            providesTags: ["Base"]
        }),
        getWorldMapAnalytics: builder.query({
            query: () => `/analytics/worldmap`,
            providesTags: ["Base"]
        }),
        // ==========>
        getTopCategoriesAnalytics: builder.query({
            query: () => `/analytics/topkeywords`,
            providesTags: ["Base"]
        }),
        getTopCategoriesAnalytics7days: builder.query({
            query: () => `/analytics/topkeywords/7days`,
            providesTags: ["Base"]
        }),
        getTopCategoriesAnalyticsLastMonth: builder.query({
            query: () => `/analytics/topkeywords/month`,
            providesTags: ["Base"]
        }),
        getTopCategoriesAnalytics30days: builder.query({
            query: () => `/analytics/topkeywords/30days`,
            providesTags: ["Base"]
        }),
        getTopCategoriesAnalyticsLast3Months: builder.query({
            query: () => `/analytics/topkeywords/3month`,
            providesTags: ["Base"]
        }),
        getTopCategoriesAnalyticsLast6Months: builder.query({
            query: () => `/analytics/topkeywords/6month`,
            providesTags: ["Base"]
        }),
        getTopCategoriesAnalyticsThisYear: builder.query({
            query: () => `/analytics/topkeywords/thisyear`,
            providesTags: ["Base"]
        }),
        getTopCategoriesAnalytics2023: builder.query({
            query: () => `/analytics/topkeywords/2023`,
            providesTags: ["Base"]
        }),
        getTopCategoriesAnalytics2022: builder.query({
            query: () => `/analytics/topkeywords/2022`,
            providesTags: ["Base"]
        }),
    })
})

export const {
    useGetProjectDetailsAnalyticsLastWeekQuery,
    useGetProjectDetailsAnalyticsLast30DaysQuery,
    useGetProjectDetailsAnalyticsLastMonthQuery,
    useGetProjectDetailsAnalyticsLast3MonthsQuery,
    useGetProjectDetailsAnalyticsLast6MonthsQuery,
    useGetProjectDetailsAnalyticsThisYearQuery,
    useGetProjectDetailsAnalytics2023Query,
    useGetProjectDetailsAnalytics2022Query,
    useGetProjectDetailsAnalyticsAllTimeQuery,
    useGetActiveProjectsAnalyticsQuery,
    useGetFinishedProjectsAnalyticsQuery,
    useGetFinishedProjectsAnalyticsLast7DaysQuery,
    useGetFinishedProjectsAnalyticsLast30DaysQuery,
    useGetFinishedProjectsAnalyticsLastMonthQuery,
    useGetFinishedProjectsAnalyticsLast3MonthsQuery,
    useGetFinishedProjectsAnalyticsLast6MonthsQuery,
    useGetFinishedProjectsAnalyticsThisYearQuery,
    useGetFinishedProjectsAnalytics2023Query,
    useGetFinishedProjectsAnalytics2022Query,
    useGetWorldMapAnalyticsQuery,
    useGetTopCategoriesAnalyticsQuery,
    useGetTopCategoriesAnalytics7daysQuery,
    useGetTopCategoriesAnalytics30daysQuery,
    useGetTopCategoriesAnalyticsLastMonthQuery,
    useGetTopCategoriesAnalyticsLast3MonthsQuery,
    useGetTopCategoriesAnalyticsLast6MonthsQuery,
    useGetTopCategoriesAnalyticsThisYearQuery,
    useGetTopCategoriesAnalytics2023Query,
    useGetTopCategoriesAnalytics2022Query

} = analyticsApi;