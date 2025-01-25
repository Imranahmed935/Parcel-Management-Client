import React from 'react';
import Chart from 'react-apexcharts';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LineChart from '@/AllComponents/LineChart/LineChart';

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [] } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminStats');
  
            return res.data.bookingsByDate.dates.map((date, index) => ({
                date,
                count: res.data.bookingsByDate.counts[index],
            }));
        },
    });

    const chartOptions = {
        series: [
            {
                name: 'Bookings',
                data: bookings.map((item) => ({
                    x: item.date, 
                    y: item.count, 
                })),
            },
        ],
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
            },
        },
        xaxis: {
            type: 'category',
            title: {
                text: 'Booking Date',
            },
            labels: {
                rotate: -45,
            },
        },
        yaxis: {
            title: {
                text: 'Number of Bookings',
            },
        },
        title: {
            text: 'Bookings by Date',
            align: 'center',
        },
        colors: ['#00E396'],
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Statistics Page</h1>
            {bookings.length > 0 ? (
                <Chart options={chartOptions} series={chartOptions.series} type="bar" height={350} />
            ) : (
                <p>Loading chart...</p>
            )}
            <div>
                <LineChart bookings={bookings} />
            </div>
        </div>
    );
};

export default Statistics;

