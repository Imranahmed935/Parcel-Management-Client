import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaBox, FaBoxOpen, FaHome, FaListAlt, FaShippingFast, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { FcStatistics } from "react-icons/fc";
import { LucideNotebookPen } from "lucide-react";
import { MdReviews } from "react-icons/md";
import PrivateRoute from "@/route/PrivateRoute";

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
    <div className="flex flex-col md:flex-row ">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white flex flex-col items-center min-h-screen py-8 w-full md:w-1/5">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-4 text-lg">
          {/* Admin Menu */}
          {data.role === "admin" && (
            <>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
               <FcStatistics className="text-2xl"/>
               <PrivateRoute> <NavLink to="Statistics" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>Statistics</NavLink></PrivateRoute>
              </li>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
                <FaUsers/>
               <PrivateRoute> <NavLink to="AllUsers" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>All Users</NavLink></PrivateRoute>
              </li>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
              <FaBoxOpen />
               <PrivateRoute> <NavLink to="AllParcels" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>All Parcels</NavLink></PrivateRoute>
              </li>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
                <FaShippingFast/>
               <PrivateRoute> <NavLink to="DeliverMan" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>All Delivery Man</NavLink></PrivateRoute>
              </li>
            </>
          )}

          {/* User Menu */}
          {data.role === "user" && (
            <>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
                <FaUser/>
                <PrivateRoute><NavLink to="profile" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>My Profile</NavLink></PrivateRoute>
              </li>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
              <LucideNotebookPen />
              <PrivateRoute><NavLink to="bookParcel" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>Book A Parcel</NavLink></PrivateRoute>  
              </li>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
                <FaBox/>
               <PrivateRoute> <NavLink to="myParcel" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>My Parcel</NavLink></PrivateRoute>
              </li>
            </>
          )}

          {/* Delivery Man Menu */}
          {data.role === "deliveryMan" && (
            <>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
                <FaListAlt/>
                <PrivateRoute><NavLink to="myDeliveryList" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>My Delivery List</NavLink></PrivateRoute>
              </li>
              <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
              <MdReviews />
                <PrivateRoute><NavLink to="reviews" className={({isActive})=> isActive ? 'bg-white px-2 rounded text-gray-600':''}>My Reviews</NavLink></PrivateRoute>
              </li>
            </>
          )}

          {/* Common Menu */}
          <hr className="w-full border-t border-gray-300 my-4" />
          <li className="hover:text-gray-300 flex items-center gap-2 cursor-pointer">
            <FaHome/> 
            <NavLink to="/" >Home</NavLink>
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
