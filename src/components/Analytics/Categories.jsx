import { useGetTopCategoriesAnalytics2022Query, useGetTopCategoriesAnalytics2023Query, useGetTopCategoriesAnalytics30daysQuery, useGetTopCategoriesAnalytics7daysQuery, useGetTopCategoriesAnalyticsLast3MonthsQuery, useGetTopCategoriesAnalyticsLast6MonthsQuery, useGetTopCategoriesAnalyticsLastMonthQuery, useGetTopCategoriesAnalyticsQuery, useGetTopCategoriesAnalyticsThisYearQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Categories = () => {

    const { data: topCategoriesAllTimes } = useGetTopCategoriesAnalyticsQuery();
    const { data: topCategories7days } = useGetTopCategoriesAnalytics7daysQuery();
    const { data: topCategories30days } = useGetTopCategoriesAnalytics30daysQuery();
    const { data: topCategoriesLastMonth } = useGetTopCategoriesAnalyticsLastMonthQuery();
    const { data: topCategoriesLast3Months } = useGetTopCategoriesAnalyticsLast3MonthsQuery();
    const { data: topCategoriesLast6Months } = useGetTopCategoriesAnalyticsLast6MonthsQuery();
    const { data: topCategoriesThisYear } = useGetTopCategoriesAnalyticsThisYearQuery();
    const { data: topCategories2023 } = useGetTopCategoriesAnalytics2023Query();
    const { data: topCategories2022 } = useGetTopCategoriesAnalytics2022Query();
    const [fetchCategories, setFetchCategories] = useState([]);

    useEffect(() => {
        if (topCategoriesAllTimes) {
            setFetchCategories(topCategoriesAllTimes?.data)
        }
    }, [topCategoriesAllTimes])

    const handleSort = () => {
        const status = event.target.value;

        if (status === "allTimes") {
            setFetchCategories(topCategoriesAllTimes?.data)
        } else if (status === "last7Days") {
            setFetchCategories(topCategories7days?.data);
        } else if (status === "last30Days") {
            setFetchCategories(topCategories30days?.data)
        } else if (status === "lastMonth") {
            setFetchCategories(topCategoriesLastMonth?.data)
        } else if (status === "last3Months") {
            setFetchCategories(topCategoriesLast3Months?.data)
        } else if (status === "last6Months") {
            setFetchCategories(topCategoriesLast6Months?.data)
        } else if (status === "thisYear") {
            setFetchCategories(topCategoriesThisYear?.data)
        } else if (status === "2023") {
            setFetchCategories(topCategories2023?.data)
        } else if (status === "2022") {
            setFetchCategories(topCategories2022?.data)
        }
    };

    return (
        <div className='my-10'>
            <div>
                <div className="relative overflow-x-auto border border-gray-400">

                    <div className='flex justify-between items-center bg-[#F2F9FF] px-6 py-3'>
                        <h4 className='font-semibold text-lg text-webPrimary'>Categories</h4>

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
                                    Categories
                                </th>
                                <th scope="col" className="px-6 py-4 border-r border-gray-400 text-center">
                                    Projects
                                </th>
                                <th scope="col" className="px-6 py-4 border-r border-gray-400 text-center">
                                    Earnings
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                fetchCategories?.map((item, _idx) => (       
                                    <tr key={_idx} className={_idx % 2 === 0 ? "bg-[#F2F9FF] border-b border-gray-400 dark:bg-gray-800 dark:border-gray-700" : "bg-white border-b border-gray-400 dark:bg-gray-800 dark:border-gray-700"}>
                                        <th scope="row" className="px-6 py-4 border-r border-gray-400 font-medium whitespace-nowrap dark:text-white">
                                            {item?.category}
                                        </th>
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

export default Categories;