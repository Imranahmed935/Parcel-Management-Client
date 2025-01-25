import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const TopDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();

  const { data: topCounts = [] } = useQuery({
    queryKey: ["topMan"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/topDeliveryMan/deliveryMan");
      return res.data;
    },
  });

  return (
    <div className=" py-16">
      <div className="text-center mb-12">
        <h2 className="lg:text-3xl text-2xl text-gray-500 font-bold mb-4">
          Top Delivery Men
        </h2>
        <p className="text-gray-600">
          Meet our best performers ensuring reliable and swift deliveries.
        </p>
      </div>

      <div className=" lg:w-7/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {topCounts.map((count, index) => (
          <div
            key={index}
            className="bg-white rounded p-6 flex hover:scale-105 duration-500 flex-col items-center text-center"
          >
            <img
              src={count.photo}
              alt={count.name}
              className=" h-60 rounded mb-4"
            />
            <div className="border-2 border-[#fdc441] rounded-tr-none rounded-3xl p-6">
              <h3 className="text-xl text-gray-600 font-bold mb-2">{count.name}</h3>

              <p className="text-gray-600 mb-2">
                Parcels Delivered:{" "}
                <span className="font-semibold text-2xl">{count.count}</span>
              </p>

              <p className="text-gray-600">
                Average Rating:{" "}
                <span className="font-semibold">{count.reviewed}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeliveryMan;
