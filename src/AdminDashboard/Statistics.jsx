import React from "react";
import Chart from "react-apexcharts";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LineChart from "@/AllComponents/LineChart/LineChart";
import useAuth from "@/Hooks/useAuth";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      const dates = res.data.bookingsByDate.dates;
      const counts = res.data.bookingsByDate.counts;

      return dates.map((date, index) => ({
        date,
        count: counts[index],
      }));
    },
  });

  const chartOptions = {
    series: [
      {
        name: "Bookings",
        data: bookings.map((item) => ({
          x: item.date,
          y: item.count,
        })),
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      type: "category",
      title: {
        text: "Booking Date",
      },
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Number of Bookings",
      },
    },
    title: {
      text: "Bookings by Date",
      align: "center",
    },
    colors: ["#00E396"],
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || bookings.length === 0) {
    return <p>No data available to display</p>;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div>
      <div className="bg-white rounded-2xl max-w-lg w-full py-4">
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-800">
          {getGreeting()}, <span className="text-lime-700">{user?.displayName || "Guest"}</span>! 👋
        </h1>
        <p className="text-gray-700 mt-2">
          Welcome to your dashboard. Let's get started!
        </p>
      </div>
      <div className=" lg:mt-16 border border-gray-400 rounded-xl p-2">
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={350}
      />
      </div>
      <div>
        <LineChart />
      </div>
    </div>
  );
};

export default Statistics;
