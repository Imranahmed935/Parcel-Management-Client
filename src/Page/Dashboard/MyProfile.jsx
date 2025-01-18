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
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myProfile/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
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

  const handleImage = async (e) => {
    const imageFile = new FormData();
    imageFile.append("image", e.target.files[0]);

    try {
      const res = await axiosPublic.post(imageApiKey, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;
        const updateRes = await axiosPublic.put(`/users/${user.email}`, {
          image: imageUrl,
        });

        if (updateRes.data.success) {
          console.log("Profile image updated successfully");
        } else {
          console.error("Error updating profile image:", updateRes.data.error);
        }
      } else {
        console.error(
          "Error uploading image to imgBB:",
          res.data.error.message
        );
      }
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8 sm:px-12">
      <h1 className="text-2xl font-extrabold text-gray-600 mb-12">
        My Profile
      </h1>
      <div className="lg:max-w-4xl bg-white rounded p-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center items-center">
          <div className="relative w-48 h-48">
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
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-semibold text-gray-800">
              Personal Info
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-gray-600">{profile?.name || "User"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">
                  {profile?.email || "user@example.com"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Phone:</span>
                <span className="text-gray-600">
                  {profile?.phone || "Not Available"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Role:</span>
                <span className="text-gray-600">{profile?.role || "User"}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/dashboard/update">
              <button className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all">
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
