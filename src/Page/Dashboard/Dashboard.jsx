import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaBox,
  FaBoxOpen,
  FaHome,
  FaListAlt,
  FaShippingFast,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { FcStatistics } from "react-icons/fc";
import { LucideNotebookPen, Menu } from "lucide-react";
import { MdReviews } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Dashboard = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data = {} } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userDashboard/${user.email}`);
      return res.data;
    },
  });

  // dashboard menu
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const toggleDrawer = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <div className="w-9/12 mx-auto">
      <div
        aria-label="close-sidebar"
        onClick={toggleDrawer}
        className={`fixed inset-0 z-40 bg-black transition-all duration-300 ${
          sidebarOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
      ></div>
      <div
        className={`fixed top-0 z-50 left-0 lg:left-52 w-68 p-10 h-full text-black shadow-lg bg-gray-300 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <button
          onClick={toggleDrawer}
          className="lg:hidden text-red-600 text-2xl  "
        >
          <IoMdClose />
        </button>
        <div className=" text-black p-2">
          {/* websites title */}
          <h1 className="text-2xl font-bold mb-10">Dashboard</h1>
        </div>
        <div className="divider mb-0"></div>

        {/* sidbar content */}
        <div className="space-y-2">
          <ul className="space-y-4 text-lg">
            {/* Admin Menu */}
            {data.role === "admin" && (
              <>
                <li className="text-black flex items-center gap-2 cursor-pointer">
                  <FcStatistics className="text-2xl" />
                  <NavLink
                    to="Statistics"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    Statistics
                  </NavLink>
                </li>
                <li className="text-black flex items-center gap-2 cursor-pointer">
                  <FaUsers />
                  <NavLink
                    to="AllUsers"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    All Users
                  </NavLink>
                </li>
                <li className="text-black flex items-center gap-2 cursor-pointer">
                  <FaBoxOpen />
                  <NavLink
                    to="AllParcels"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    All Parcels
                  </NavLink>
                </li>
                <li className="text-black flex items-center gap-2 cursor-pointer">
                  <FaShippingFast />
                  <NavLink
                    to="DeliverMan"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    All Delivery Man
                  </NavLink>
                </li>
              </>
            )}
            {/* User Menu */}
            {data.role === "user" && (
              <>
                <li className="text-black flex items-center gap-2 cursor-pointer">
                  <FaUser />
                  <NavLink
                    to="profile"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    My Profile
                  </NavLink>
                </li>
                <li className=" text-black flex items-center gap-2 cursor-pointer">
                  <LucideNotebookPen />
                  <NavLink
                    to="bookParcel"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    Book A Parcel
                  </NavLink>
                </li>
                <li className=" text-black flex items-center gap-2 cursor-pointer">
                  <FaBox />
                  <NavLink
                    to="myParcel"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    My Parcel
                  </NavLink>
                </li>
              </>
            )}
            {/* Delivery Man Menu */}
            {data.role === "deliveryMan" && (
              <>
                <li className="text-black flex items-center gap-2 cursor-pointer">
                  <FaListAlt />
                  <NavLink
                    to="myDeliveryList"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    My Delivery List
                  </NavLink>
                </li>
                <li className="text-black flex items-center gap-2 cursor-pointer">
                  <MdReviews />
                  <NavLink
                    to="reviews"
                    className={({ isActive }) =>
                      isActive ? "bg-white px-2 rounded text-gray-600" : ""
                    }
                  >
                    My Reviews
                  </NavLink>
                </li>
              </>
            )}
            {/* Common Menu */}
            <hr className="w-full border-t border-gray-300 my-4" />
            <li className="text-black flex items-center gap-2 cursor-pointer">
              <FaHome />
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* main contsan */}
      <div
        className={`flex-1 p-3 transition-transform duration-300 lg:ml-60 ${
          sidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <button
          onClick={toggleDrawer}
          className="p-2 text-black text-lg rounded-md lg:hidden"
        >
          <Menu />
        </button>
        {/* main page content */}
        <div className=" lg:mt-0 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
