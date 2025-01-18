import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth()

  const { data={} } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userDashboard/${user.email}`);
      return res.data; 
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white flex flex-col items-center py-8 w-full md:w-1/5">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-4 text-lg">
          {/* Admin Menu */}
          {data.role === "admin" && (
            <>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="Statistics">Statistics</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="AllUsers">All Users</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="AllParcels">All Parcels</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="DeliverMan">All Delivery Man</NavLink>
              </li>
            </>
          )}

          {/* User Menu */}
          {data.role === "user" && (
            <>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="profile">My Profile</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="bookParcel">Book A Parcel</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="myParcel">My Parcel</NavLink>
              </li>
            </>
          )}

          {/* Delivery Man Menu */}
          {data.role === "deliveryMan" && (
            <>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="myDeliveryList">My Delivery List</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="reviews">My Reviews</NavLink>
              </li>
            </>
          )}

          {/* Common Menu */}
          <hr className="w-full border-t border-gray-300 my-4" />
          <li className="hover:text-gray-300 cursor-pointer">
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-8 border-t md:border-t-0 md:border-l border-gray-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
