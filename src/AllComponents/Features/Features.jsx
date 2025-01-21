import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaLock, FaShippingFast, FaUsers } from "react-icons/fa";
import CountUp from "react-countup";

const Features = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stats");
      return res.data;
    },
  });

  return (
    <div className="bg-gray-100 py-16 px-6 lg:w-7/12 mx-auto">
      <div className="text-center mb-12">
        <h2 className="lg:text-3xl text-2xl text-gray-500 font-bold mb-4">Our Features</h2>
        <p className="text-gray-600">
          Discover why SwiftShip is the best choice for your delivery needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className=" shadow-lg bg-red-100 rounded-lg p-6">
          <div className="text-red-500 text-4xl mb-4">
            <FaLock />
          </div>
          <h3 className="text-xl font-bold mb-2">Parcel Safety</h3>
          <p className="text-gray-600">
            Your parcels are always safe with us, ensuring secure handling and
            delivery.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="bg-teal-100 shadow-lg rounded-lg p-6 ">
          <div className="text-teal-500 text-4xl mb-4">
            <FaShippingFast />
          </div>
          <h3 className="text-xl font-bold mb-2">Super Fast Delivery</h3>
          <p className="text-gray-600">
            Experience lightning-fast delivery for all your shipments,
            guaranteed.
          </p>
        </div>

        <div className="bg-purple-100 shadow-lg rounded-lg p-6">
          <div className="text-purple-500 text-4xl mb-4">
            <FaUsers />
          </div>
          <h3 className="text-xl font-bold mb-2">User-Friendly</h3>
          <p className="text-gray-600">
            Easy-to-use platform with seamless tracking and management of
            parcels.
          </p>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="lg:text-3xl text-2xl text-gray-500 font-bold mb-4">Our Impact</h2>
        <p className="text-gray-600">
          See the growing trust and popularity of SwiftShip through our stats.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#8EB69B] rounded- p-6 text-center">
          <CountUp end={stats.totalParcel} className="text-5xl text-white" />
          <p className="text-gray-600">Total Parcels Booked</p>
        </div>

        <div className="bg-[#E5F3F3] rounded p-6 text-center">
          <CountUp
            end={stats.totalDelivered}
            className="text-5xl text-green-500"
          />
          <p className="text-gray-600">Total Parcels Delivered</p>
        </div>

        <div className="bg-[#BACEE3] rounded p-6 text-center">
          <CountUp
            end={stats.totalUsers}
            className="text-5xl text-indigo-600"
          />
          <p className="text-gray-600">Total Registered Users</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
