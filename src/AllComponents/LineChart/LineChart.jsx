import React from 'react';
import Chart from 'react-apexcharts';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const LineChart = ({ bookings }) => {
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/totalParcels');
            return res.data.map((parcel) => ({
                deliveryDate: parcel.deliveryDate,
                delivered: parcel.delivered,
            }));
        },
    });

    const chartOptions = {
        series: [
            {
                name: 'Booked Parcels',
                data: bookings.map((item) => ({
                    x: item.date, 
                    y: item.count, 
                })),
            },
            {
                name: 'Delivered Parcels',
                data: parcels.map((item) => ({
                    x: item.deliveryDate, 
                    y: item.delivered, 
                })),
            },
        ],
        chart: {
            type: 'line',
            height: 350,
            zoom: {
                enabled: true,
            },
        },
        xaxis: {
            type: 'category',
            title: {
                text: 'Date',
            },
            labels: {
                rotate: -45,
                formatter: (value) => new Date(value).toLocaleDateString(),
            },
        },
        yaxis: {
            title: {
                text: 'Number of Parcels',
            },
        },
        stroke: {
            curve: 'smooth', 
        },
        markers: {
            size: 5, 
        },
        title: {
            text: 'Booked vs Delivered Parcels',
            align: 'center',
        },
        legend: {
            position: 'top',
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        colors: ['#00E396', '#775DD0'],
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 w-7/12">Line Chart</h1>
            {parcels.length > 0 && bookings.length > 0 ? (
                <Chart options={chartOptions} series={chartOptions.series} type="line" height={350} />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default LineChart;
