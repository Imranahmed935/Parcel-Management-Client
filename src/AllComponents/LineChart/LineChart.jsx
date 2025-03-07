import React from 'react';
import ReactApexChart from 'react-apexcharts';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const LineChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: parcels = {}, isLoading } = useQuery({
        queryKey: ['parcelLine'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminStats');
            return res.data;
        },
    });

    // Default values to prevent errors on first render
    const dates = parcels?.bookingVsDelivered?.dates || [];
    const booked = parcels?.bookingVsDelivered?.booked || [];
    const delivered = parcels?.bookingVsDelivered?.delivered || [];

    const optionsForLine = {
        chart: { type: 'line', height: 350 },
        xaxis: { 
            categories: dates,
            title: { text: 'Dates' },
        },
        title: { text: 'Comparison of Booked and Delivered Parcels', align: 'center' },
        colors: ['#00E396', '#FF4560'],
        dataLabels: { enabled: true },
    };

    const seriesForLine = [
        { name: 'Bookings', data: booked },
        { name: 'Delivered', data: delivered },
    ];

    if (isLoading) {
        return <p>Loading Line Chart...</p>;
    }

    return (
        <div className='lg:mt-16 border border-gray-400 rounded-xl p-2'>
            {dates.length > 0 ? (
                <ReactApexChart options={optionsForLine} series={seriesForLine} type="line" height={350} />
            ) : (
                <p>No data available to display</p>
            )}
        </div>
    );
};

export default LineChart;
