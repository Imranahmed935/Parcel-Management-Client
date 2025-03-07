import React from "react";
import { FaCamera } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageApiKey = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: profile = {},
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myProfile/${user.email}`);
      return res.data;
    },
  });

  const handleImage = async (e) => {
    const imageFile = new FormData();
    imageFile.append("image", e.target.files[0]);

    try {
      const res = await axiosPublic.post(imageApiKey, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;
        await axiosPublic.put(`/users/${user.email}`, { image: imageUrl });
        refetch()
        
      } else {
        console.error("Error uploading image:", res.data.error.message);
      }
    } catch (error) {
      console.error(
        "Image upload failed:",
        error.response?.data || error.message
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-indigo-600 w-12 h-12 animate-spin rounded-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Error: {error.message}
        </p>
      </div>
    );
  }

  const profileDetails = [
    { label: "Name", value: profile?.name || "User" },
    { label: "Email", value: profile?.email || "user@example.com" },
    { label: "Phone", value: profile?.phone || "Not Available" },
    { label: "Role", value: profile?.role || "User" },
  ];

  return (
    <div className=" bg-gray-50 py-10 ">
      <h1 className="text-2xl font-extrabold text-black mb-12">
        My Profile
      </h1>
      <div className="lg:max-w-4xl bg-white rounded-lg p-8 border border-indigo-600">
        {/* Profile Section */}
        <div className="relative lg:w-48 lg:h-48 w-32 h-32">
          <img
            src={profile?.photo || "/default-avatar.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-indigo-600"
          />
          <label
            htmlFor="profileUpload"
            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-3 rounded-full cursor-pointer"
          >
            <FaCamera size={24} />
          </label>
          <input
            type="file"
            id="profileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-x-2">
          {/* Personal Info */}
          <div className=" w-full">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Personal Info
              </h2>
              <div className="space-y-3">
                {profileDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2 gap-2"
                  >
                    <span className="font-semibold text-gray-700">
                      {detail.label}:
                    </span>
                    <span className="text-gray-600">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Update Profile Button */}
            <div className="mt-6 text-center">
              <Link to="/dashboard/update">
                <button className="py-4 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all w-full">
                  Update Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
