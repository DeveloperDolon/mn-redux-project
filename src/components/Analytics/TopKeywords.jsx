import { useGetTopCategoriesAnalytics2022Query, useGetTopCategoriesAnalytics2023Query, useGetTopCategoriesAnalytics30daysQuery, useGetTopCategoriesAnalytics7daysQuery, useGetTopCategoriesAnalyticsLast3MonthsQuery, useGetTopCategoriesAnalyticsLast6MonthsQuery, useGetTopCategoriesAnalyticsLastMonthQuery, useGetTopCategoriesAnalyticsQuery, useGetTopCategoriesAnalyticsThisYearQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect, useState } from 'react';

const TopKeywords = () => {

    const [sortOption, setSortOption] = useState('');

    const { data: topKeywordsAllTimes } = useGetTopCategoriesAnalyticsQuery();
    const { data: topKeywords7days } = useGetTopCategoriesAnalytics7daysQuery();
    const { data: topKeywords30days } = useGetTopCategoriesAnalytics30daysQuery();
    const { data: topKeywordsLastMonth } = useGetTopCategoriesAnalyticsLastMonthQuery();
    const { data: topKeywordsLast3Months } = useGetTopCategoriesAnalyticsLast3MonthsQuery();
    const { data: topKeywordsLast6Months } = useGetTopCategoriesAnalyticsLast6MonthsQuery();
    const { data: topKeywordsThisYear } = useGetTopCategoriesAnalyticsThisYearQuery();
    const { data: topKeywords2023 } = useGetTopCategoriesAnalytics2023Query();
    const { data: topKeywords2022 } = useGetTopCategoriesAnalytics2022Query();
    const [fetchKeywords, setFetchKeywords] = useState([]);

    useEffect(() => {
        if (topKeywordsAllTimes) {
            setFetchKeywords(topKeywordsAllTimes?.data)
        }
    }, [topKeywordsAllTimes])

    const handleSort = () => {

        const status = event.target.value;

        if (status === "allTimes") {
            setFetchKeywords(topKeywordsAllTimes?.data)
        } else if (status === "last7Days") {
            setFetchKeywords(topKeywords7days?.data);
        } else if (status === "last30Days") {
            setFetchKeywords(topKeywords30days?.data)
        } else if (status === "lastMonth") {
            setFetchKeywords(topKeywordsLastMonth?.data)
        } else if (status === "last3Months") {
            setFetchKeywords(topKeywordsLast3Months?.data)
        } else if (status === "last6Months") {
            setFetchKeywords(topKeywordsLast6Months?.data)
        } else if (status === "thisYear") {
            setFetchKeywords(topKeywordsThisYear?.data)
        } else if (status === "2023") {
            setFetchKeywords(topKeywords2023?.data)
        } else if (status === "2022") {
            setFetchKeywords(topKeywords2022?.data)
        }
    };

    return (
        <div className='my-10'>
            <div>
                <div className="relative overflow-x-auto border border-gray-400">

                    <div className='flex justify-between items-center bg-[#FEF0F0] px-6 py-3'>
                        <h4 className='font-semibold text-lg text-webPrimary'>Top Keywords</h4>

                        <select
                            className='outline-none border px-3 border-gray-300 py-1 cursor-pointer'
                            onChange={handleSort}
                        >
                            <option value="allTimes">All times</option>
                            <option value="last7Days">Last 7 days</option>
                            <option value="last30Days">Last 30 days</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="last3Months">Last 3 months</option>
                            <option value="last6Months">Last 6 months</option>
                            <option value="thisYear">This Year</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>

                    <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">

                        <thead className="text-sm capitalize bg-white border-b border-t border-gray-400 dark:border-gray-700  dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-4 border-r border-gray-400">
                                    Keyword
                                </th>
                                <th scope="col" className="px-6 py-4 border-r border-gray-400 text-center">
                                    Impressions
                                </th>
                                <th scope="col" className="px-6 py-4 border-r border-gray-400 text-center">
                                    Clicks
                                </th>
                                <th scope="col" className="px-6 py-4 border-r border-gray-400 text-center">
                                    Projects
                                </th>
                                <th scope="col" className="px-6 py-4 text-center">
                                    Earnings
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                fetchKeywords?.map((item, _idx) => (
                                    <tr key={_idx} className={_idx % 2 === 0 ? "bg-[#FEF0F0] border-b border-gray-400 dark:bg-gray-800 dark:border-gray-700" : "bg-white border-b border-gray-400 dark:bg-gray-800 dark:border-gray-700"}>
                                        <th scope="row" className="px-6 py-4 border-r border-gray-400 font-medium whitespace-nowrap dark:text-white">
                                            {item?.category}
                                        </th>
                                        <td className="px-6 py-4 border-r border-gray-400 text-center font-medium">
                                            {item?.impressions}
                                        </td>
                                        <td className="px-6 py-4 border-r border-gray-400 text-center font-medium">
                                            {item?.clicks}
                                        </td>
                                        <td className="px-6 py-4 border-r border-gray-400 text-center font-medium">
                                            {item?.orderCount}
                                        </td>
                                        <td className="px-6 py-4 text-center font-medium">
                                            ${item?.totalAmount}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopKeywords;