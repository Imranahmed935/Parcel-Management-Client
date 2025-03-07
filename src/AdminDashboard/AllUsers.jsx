import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${user?.email}?currentPage=${currentPage}&itemsParPage=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const { data: totalCount = 0 } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data.count;
    },
  });

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  const handleMakeDeliveryMan = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make Delivery man",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/user/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "success!",
              text: "You have been successfully made delivery man.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "success!",
              text: "You have been successfully made Admin.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl  font-semibold text-gray-800 mb-6">
        All Users ({users.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border border-gray-400">
              <th className="px-4 py-2 text-left text-sm font-medium border border-gray-400">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium border border-gray-400">Phone Number</th>
              <th className="px-4 py-2 text-center text-sm font-medium border border-gray-400">Parcels Booked</th>
              <th className="px-4 py-2 text-center text-sm font-medium border border-gray-400">Total Spent</th>
              <th className="px-4 py-2 text-center text-sm font-medium border border-gray-400">Role</th>
              <th className="px-4 py-2 text-center text-sm font-medium border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition duration-200`}
              >
                <td className="px-4 py-2 text-sm text-gray-700 border">{user.name || "N/A"}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border">{user.phone || "N/A"}</td>
                <td className="px-4 py-2 text-center text-sm text-gray-700 border">{user.totalBooked || 0}</td>
                <td className="px-4 py-2 text-center text-sm text-gray-700 border">${user.totalPrice?.toFixed(2) || "0.00"}</td>
                <td
                  className={`px-4 py-2 text-center text-sm text-gray-700 ${
                    user.role === "deliveryMan" ? "bg-indigo-500 text-white border" :
                    user.role === "admin" ? "bg-green-500 text-white border" :
                    user.role === "user" ? "bg-gray-500 text-white border" : ""
                  }`}
                >
                  {user.role || "N/A"}
                </td>

                <td className="px-4 py-2 text-center border">
                  <div className="flex gap-2 justify-center">
                    <button
                      disabled={user.role === "deliveryMan"}
                      className={`px-4 py-2 text-sm font-medium text-white rounded-lg  shadow-sm ${
                        user.role === "deliveryMan" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={() => handleMakeDeliveryMan(user._id)}
                    >
                      {user.role === "deliveryMan" ? "Already Delivery Man" : "Make Delivery Man"}
                    </button>
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 shadow-sm"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded-md border text-sm font-medium 
              hover:bg-indigo-500 hover:text-white transition-colors duration-200 
              ${page === currentPage ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
