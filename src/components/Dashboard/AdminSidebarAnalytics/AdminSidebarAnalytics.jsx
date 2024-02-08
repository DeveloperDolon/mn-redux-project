import { useGetAnalytics2021DataQuery, useGetAnalytics2022DataQuery, useGetAnalyticsDataAllTimeQuery, useGetAnalyticsDataLasSixMonthQuery, useGetAnalyticsDataLasThreeMonthQuery, useGetAnalyticsDataLasYearQuery, useGetAnalyticsDataLastMonthQuery } from '@/redux/features/order/orderApi';
import React, { useEffect, useState } from 'react';

const AdminSidebarAnalytics = () => {

    const { data: allTimes } = useGetAnalyticsDataAllTimeQuery();
    const { data: lastMonths } = useGetAnalyticsDataLastMonthQuery();
    const { data: lastThreeMonths } = useGetAnalyticsDataLasThreeMonthQuery();
    const { data: lastSixMonths } = useGetAnalyticsDataLasSixMonthQuery();
    const { data: lastYear } = useGetAnalyticsDataLasYearQuery();
    const { data: data2022 } = useGetAnalytics2022DataQuery();
    const { data: data2021 } = useGetAnalytics2021DataQuery();
    const [fetchAnalytics, setFetchAnalytics] = useState({});

    console.log(fetchAnalytics);

    useEffect(() => {
        if (allTimes) {
            setFetchAnalytics(allTimes?.data)
        }
    }, [allTimes])

    const handleAnalytics = event => {

        const status = event.target.value;

        if (status === "All_Times") {
            setFetchAnalytics(allTimes?.data)
        } else if (status === "Last_Month") {
            setFetchAnalytics(lastMonths?.data);
        } else if (status === "Last_Three_Months") {
            setFetchAnalytics(lastThreeMonths?.data)
        } else if (status === "Last_Six_Months") {
            setFetchAnalytics(lastSixMonths?.data)
        } else if (status === "This_Year") {
            setFetchAnalytics(lastYear?.data)
        } else if (status === "2022") {
            setFetchAnalytics(data2022?.data)
        } else if (status === "2021") {
            setFetchAnalytics(data2021?.data)
        }

    };

    return (
        <div className="bg-[#FEF0F0] p-5 mt-5">
            <div className="flex justify-between items-center border-b border-webPrimary pb-2">
                <h5 className="text-lg font-semibold text-webPrimary">
                    All Times
                </h5>

                <select
                    className="border text-sm font-medium outline-none"
                    onChange={handleAnalytics}
                >
                    <option value="All_Times">All Times</option>
                    <option value="Last_Month">Last Month</option>
                    <option value="Last_Three_Months">Last 3 Months</option>
                    <option value="Last_Six_Months">Last 6 Months</option>
                    <option value="This_Year">This Year</option>
                    <option value="2022">2023</option>
                    <option value="2021">2022</option>
                </select>
            </div>

            {/* ====================================================== */}
            <div className="my-3">
                <p className="font-medium mb-1">Completed Projects</p>
                <span className="font-bold">{fetchAnalytics?.allTimeCompletedCount || fetchAnalytics?.lastMonthCompletedCount || fetchAnalytics?.lastThreeMonthCompletedCount || fetchAnalytics?.lastSixMonthCompletedCount || 0}</span>
            </div>

            <div className="mb-3">
                <p className="font-medium mb-1">Earnings</p>
                <span className="font-bold">${fetchAnalytics?.allTimeAverageAmount?.toFixed(2) || fetchAnalytics?.lastMonthTotalEarning?.toFixed(2) || fetchAnalytics?.lastThreeMonthTotalEarning?.toFixed(2) || fetchAnalytics?.lastSixMonthTotalEarning?.toFixed(2)}</span>
            </div>

            <div className="mb-3">
                <p className="font-medium mb-1">Cancelled Projects</p>
                <span className="font-bold">{fetchAnalytics?.allTimeCanceledCount || fetchAnalytics?.lastMonthCanceledCount || fetchAnalytics?.lastThreeMonthCanceledCount || fetchAnalytics?.lastSixMonthCanceledCount || 0} (${fetchAnalytics?.allTimeCanceledEarning || fetchAnalytics?.lastMonthCanceledEarning || fetchAnalytics?.lastThreeMonthCanceledEarning || fetchAnalytics?.lastSixMonthCanceledEarning || 0})</span>
            </div>

            {/* <div>
                <p className="font-medium mb-1">Avg. Selling Price</p>
                <span className="font-bold">${fetchAnalytics?.allTimeAverageAmount?.toFixed(2) || fetchAnalytics?.lastMonthAverageAmount?.toFixed(2) || fetchAnalytics?.lastThreeMonthAverageAmount?.toFixed(2) || fetchAnalytics?.lastSixMonthAverageAmount.toFixed(2)}</span>
            </div> */}
        </div>
    );
};

export default AdminSidebarAnalytics;