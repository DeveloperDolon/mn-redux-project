import { useGetWorldMapAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect, useState } from 'react';
import WorldMap from "react-svg-worldmap";

const WorldDomination = () => {

    const {data: worldMapAnalytics, isLoading} = useGetWorldMapAnalyticsQuery();
    const [data, setData] = useState([]);

    useEffect(() => {

        if(!isLoading && worldMapAnalytics) {
            setData(worldMapAnalytics?.data?.analytics);
        }

    }, [worldMapAnalytics, isLoading])

    return (
        <div className='my-10 border'>
            <p className='font-medium p-10'>World Domination {worldMapAnalytics?.data?.percentage}%</p>
            <div className='flex justify-center items-center'>
                <WorldMap
                    color="black"
                    value-suffix="Sales"
                    size="xl"
                    data={data}
                />
            </div>
        </div>
    );
};

export default WorldDomination;