import { useGetProjectDetailsAnalytics2022Query, useGetProjectDetailsAnalytics2023Query, useGetProjectDetailsAnalyticsAllTimeQuery, useGetProjectDetailsAnalyticsLast30DaysQuery, useGetProjectDetailsAnalyticsLast3MonthsQuery, useGetProjectDetailsAnalyticsLast6MonthsQuery, useGetProjectDetailsAnalyticsLastMonthQuery, useGetProjectDetailsAnalyticsLastWeekQuery, useGetProjectDetailsAnalyticsThisYearQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect, useState } from 'react';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ProjectStackedBar from './ProjectStackedBar';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Get the data for the hovered point
        return (
            <div className="custom-tooltip bg-white rounded-2xl p-5">
                {/* <p>{`Amount: $${data.amount}`}</p> */}
                {/* <p>{`Parent Status: ${data.parentStatus}`}</p> */}

                <h4 className='text-webPrimary mb-2 text-lg font-semibold'>{`${data.date}`}</h4>
                <div className='flex justify-center items-center gap-2'>
                    <div className={`${data.parentStatus === "New Projects" ? 'bg-[#088510]' : data.parentStatus === "Completed Projects" ? 'bg-[#1C8CDC]' : data.parentStatus === "Canceled Projects" ? 'bg-[#E60106]' : ""} w-3 h-3 rounded-full`}></div>
                    <span className='text-sm font-medium'>{data?.parentStatus}: (${data?.amount})</span>
                </div>
            </div>
        );
    }

    return null;
};


const ProjectDeatils = () => {

    const { data: allTimeDetails } = useGetProjectDetailsAnalyticsAllTimeQuery();
    const { data: weekDetails } = useGetProjectDetailsAnalyticsLastWeekQuery();
    const { data: last30daysDetails } = useGetProjectDetailsAnalyticsLast30DaysQuery();
    const { data: lastMonthDetails } = useGetProjectDetailsAnalyticsLastMonthQuery();
    const { data: last3MonthsDetails } = useGetProjectDetailsAnalyticsLast3MonthsQuery();
    const { data: last6MonthsDetails } = useGetProjectDetailsAnalyticsLast6MonthsQuery();
    const { data: thisYearDetails } = useGetProjectDetailsAnalyticsThisYearQuery();
    const { data: Details2023 } = useGetProjectDetailsAnalytics2023Query();
    const { data: Details2022 } = useGetProjectDetailsAnalytics2022Query();
    const [fetchDetails, setFetchDetails] = useState([]);


    // =========================================================>
    const formattedOrders = fetchDetails?.flatMap(item =>
        item.orders.map(order => ({
            amount: order.amount,
            status: order.status,
            date: new Date(order.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            }),
            parentStatus: item.status,
            fill: (() => {
                switch (item.status) {
                    case "New Projects":
                        return "#088510";
                    case "Completed Projects":
                        return "#1C8CDC";
                    case "Canceled Projects":
                        return "#E60106";
                    default:
                        return "#8884d8"; // Default color if status doesn't match any case
                }
            })()
        }))
    ).sort((a, b) => new Date(a.date) - new Date(b.date));

    // =========================================================>
    useEffect(() => {
        if (allTimeDetails) {
            setFetchDetails(allTimeDetails?.data)
        }
    }, [allTimeDetails])


    const handleSort = (event) => {

        const status = event.target.value;

        if (status === "allTimes") {
            setFetchDetails(allTimeDetails?.data)
        } else if (status === "last7Days") {
            setFetchDetails(weekDetails?.data);
        } else if (status === "last30Days") {
            setFetchDetails(last30daysDetails?.data)
        } else if (status === "lastMonth") {
            setFetchDetails(lastMonthDetails?.data)
        } else if (status === "last3Months") {
            setFetchDetails(last3MonthsDetails?.data)
        } else if (status === "last6Months") {
            setFetchDetails(last6MonthsDetails?.data)
        } else if (status === "thisYear") {
            setFetchDetails(thisYearDetails?.data)
        } else if (status === "2023") {
            setFetchDetails(Details2023?.data)
        } else if (status === "2022") {
            setFetchDetails(Details2022?.data)
        }
    };

    return (
        <div className='my-10'>

            <div className='p-5 bg-[#FEF0F0]'>
                <div className='flex justify-between items-center'>
                    <h4 className='font-semibold text-lg text-webPrimary'>Project Details</h4>

                    {
                        fetchDetails?.map((item, _idx) => (
                            <div key={_idx} className='flex justify-center items-center gap-2'>
                                <div className={`${item.status === "New Projects" ? 'bg-[#088510]' : item.status === "Completed Projects" ? 'bg-[#1C8CDC]' : item.status === "Canceled Projects" ? 'bg-[#E60106]' : ""} w-3 h-3 rounded-full`}></div>
                                <span className='text-sm font-medium'>{item?.status} {item?.count} (${item?.earning})</span>
                            </div>
                        ))
                    }

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

                <div className='mt-5'>
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis dataKey="date" />
                            <YAxis dataKey="amount" unit="$" />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                content={<CustomTooltip />}
                            />
                            <Scatter name="A school" data={formattedOrders} fill="#088510" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='p-5 pb-14 bg-[#F2F9FF] mt-10'>
                <ProjectStackedBar />
            </div>

        </div>
    );
};

export default ProjectDeatils;