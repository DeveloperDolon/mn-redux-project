import { useGetActiveProjectsAnalyticsQuery, useGetFinishedProjectsAnalytics2022Query, useGetFinishedProjectsAnalytics2023Query, useGetFinishedProjectsAnalyticsLast30DaysQuery, useGetFinishedProjectsAnalyticsLast3MonthsQuery, useGetFinishedProjectsAnalyticsLast6MonthsQuery, useGetFinishedProjectsAnalyticsLast7DaysQuery, useGetFinishedProjectsAnalyticsLastMonthQuery, useGetFinishedProjectsAnalyticsQuery, useGetFinishedProjectsAnalyticsThisYearQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect, useState } from 'react';
import HSBar from "react-horizontal-stacked-bar-chart";

const ProjectStackedBar = () => {

    const { data: activeProjectsAnalytics } = useGetActiveProjectsAnalyticsQuery();

    const { data: finishedProjectsAnalyticsAllTimes } = useGetFinishedProjectsAnalyticsQuery();
    const { data: finishedProjectsAnalyticsLast7Days } = useGetFinishedProjectsAnalyticsLast7DaysQuery();
    const { data: finishedProjectsAnalyticsLast30Days } = useGetFinishedProjectsAnalyticsLast30DaysQuery();
    const { data: finishedProjectsAnalyticsLastMonth } = useGetFinishedProjectsAnalyticsLastMonthQuery();
    const { data: finishedProjectsAnalyticsLast3Months } = useGetFinishedProjectsAnalyticsLast3MonthsQuery();
    const { data: finishedProjectsAnalyticsLast6Months } = useGetFinishedProjectsAnalyticsLast6MonthsQuery();
    const { data: finishedProjectsAnalyticsThisYear } = useGetFinishedProjectsAnalyticsThisYearQuery();
    const { data: finishedProjectsAnalytics2023 } = useGetFinishedProjectsAnalytics2023Query();
    const { data: finishedProjectsAnalytics2022 } = useGetFinishedProjectsAnalytics2022Query();
    const [fetchFinishedProjects, setFetchFinishedProjects] = useState([]);

    // ==================================================>
    const barChartDataActive = activeProjectsAnalytics?.data?.map(item => ({
        name: getPercent(item?.count),
        value: item?.count,
        color: getStatusColor(item?.status),
    })) || [];

    const barChartDataFinished = fetchFinishedProjects?.map(item => ({
        name: getPercent(item?.count),
        value: item?.count,
        color: getStatusColor(item?.status),
    })) || [];

    function getStatusColor(status) {
        switch (status) {
            case "Revision":
                return "#D95609";
            case "Ongoing":
                return "#098610";
            case "Waiting":
                return "#9D0E66";
            case "Delivered":
                return "#1096A1";
            case "Completed":
                return "#1781CB";
            case "Canceled":
                return "#E70006";
            default:
                return;
        }
    }

    function getPercent(count) {
        const totalNumberOfCount = activeProjectsAnalytics?.data?.reduce((total, item) => total + item.count, 0);

        if (totalNumberOfCount !== 0) {
            const result = ((100 / totalNumberOfCount) * count) + "%";
            return result;
        } else {
            console.error("Total count is zero, cannot calculate percentage.");
            return "0%";
        }
    }
    // ==================================================>

    useEffect(() => {
        if (finishedProjectsAnalyticsAllTimes) {
            setFetchFinishedProjects(finishedProjectsAnalyticsAllTimes?.data)
        }
    }, [finishedProjectsAnalyticsAllTimes])

    const handleSort = (event) => {

        const status = event.target.value;

        if (status === "allTimes") {
            setFetchFinishedProjects(finishedProjectsAnalyticsAllTimes?.data)
        } else if (status === "last7Days") {
            setFetchFinishedProjects(finishedProjectsAnalyticsLast7Days?.data);
        } else if (status === "last30Days") {
            setFetchFinishedProjects(finishedProjectsAnalyticsLast30Days?.data)
        } else if (status === "lastMonth") {
            setFetchFinishedProjects(finishedProjectsAnalyticsLastMonth?.data)
        } else if (status === "last3Months") {
            setFetchFinishedProjects(finishedProjectsAnalyticsLast3Months?.data)
        } else if (status === "last6Months") {
            setFetchFinishedProjects(finishedProjectsAnalyticsLast6Months?.data)
        } else if (status === "thisYear") {
            setFetchFinishedProjects(finishedProjectsAnalyticsThisYear?.data)
        } else if (status === "2023") {
            setFetchFinishedProjects(finishedProjectsAnalytics2023?.data)
        } else if (status === "2022") {
            setFetchFinishedProjects(finishedProjectsAnalytics2022?.data)
        }

    };

    return (
        <div className='space-y-20'>
            <div>
                <div className='flex items-center gap-24'>
                    <h4 className='font-semibold text-lg text-webPrimary'>Active Projects</h4>

                    <div className='flex items-center gap-10'>
                        {
                            activeProjectsAnalytics?.data?.map((item, _idx) => (
                                <div key={_idx} className='flex items-center gap-2'>
                                    <div className={`${item.status === "Revision" ? 'bg-[#D95609]' : item.status === "Ongoing" ? 'bg-[#098610]' : item.status === "Waiting" ? 'bg-[#9D0E66]' : item.status === "Delivered" ? 'bg-[#1096A1]' : ""} w-3 h-3 rounded-full`}></div>
                                    <span className='text-base font-medium'>{item?.status} ({item?.count})</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='mt-5'>
                    <HSBar data={barChartDataActive} />
                </div>
            </div>

            <div>
                <div className='flex justify-between items-center gap-24'>
                    <h4 className='font-semibold text-lg text-webPrimary'>Finished Projects</h4>

                    <div className='flex items-center gap-10'>
                        {
                            fetchFinishedProjects?.map((item, _idx) => (
                                <div key={_idx} className='flex items-center gap-2'>
                                    <div className={`${item.status === "Completed" ? 'bg-[#1781CB]' : item.status === "Canceled" ? 'bg-[#E70006]' : ""} w-3 h-3 rounded-full`}></div>
                                    <span className='text-base font-medium'>{item?.status} ({item?.count})</span>
                                </div>
                            ))
                        }
                    </div>

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
                    <HSBar data={barChartDataFinished} />
                </div>
            </div>

            <div>
                <div className='flex justify-between items-center gap-24'>
                    <h4 className='font-semibold text-lg text-webPrimary'>New Projects</h4>

                    <div className='flex items-center gap-5'>

                        <div className='flex items-center gap-2'>
                            <div className={`bg-[#F56F6C] w-3 h-3 rounded-full`}></div>
                            <span className='text-base font-medium'>Direct (0)</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <div className={`bg-[#9258C8] w-3 h-3 rounded-full`}></div>
                            <span className='text-base font-medium'>Custom (0)</span>
                        </div>

                    </div>

                    <select
                        className='outline-none border px-3 border-gray-300 py-1 cursor-pointer'
                    >
                        <option value="allTimes">All times</option>
                        <option value="last30Days">Last 30 days</option>
                        <option value="last7Days">Last 7 days</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="last3Months">Last 3 months</option>
                        <option value="last6Months">Last 6 months</option>
                        <option value="thisYear">This Year</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>

                <div className='mt-5'>
                    <HSBar data={[{ value: 1, color: "#F56F6C" }, { value: 1, color: "#8E883C" }]} />
                </div>
            </div>

            <div>
                <div className='flex justify-between items-center gap-24'>
                    <h4 className='font-semibold text-lg text-webPrimary'>Avg. Selling Price</h4>

                    <div className='flex items-center gap-5'>

                        <div className='flex items-center gap-2'>
                            <div className={`bg-[#7BA7C2] w-3 h-3 rounded-full`}></div>
                            <span className='text-base font-medium'>Direct ($0)</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <div className={`bg-[#9258C8] w-3 h-3 rounded-full`}></div>
                            <span className='text-base font-medium'>Custom ($0)</span>
                        </div>

                    </div>

                    <select
                        className='outline-none border px-3 border-gray-300 py-1 cursor-pointer'
                    >
                        <option value="allTimes">All times</option>
                        <option value="last30Days">Last 30 days</option>
                        <option value="last7Days">Last 7 days</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="last3Months">Last 3 months</option>
                        <option value="last6Months">Last 6 months</option>
                        <option value="thisYear">This Year</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>

                <div className='mt-5'>
                    <HSBar data={[{ value: 10, color: "#7BA7C2" }, { value: 10, color: "#9258C8" }]} />
                </div>
            </div>
        </div>
    );
};

export default ProjectStackedBar;
