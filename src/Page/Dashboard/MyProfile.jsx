import React from "react";
import { FaCamera } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
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

        const updateRes = await axiosPublic.put(`/users/${user.email}`, { image: imageUrl });

        if (updateRes.data.success) {
          console.log("Profile image updated successfully");
        } else {
          console.error("Error updating profile image:", updateRes.data.error);
        }
      } else {
        console.error("Error uploading image to imgBB:", res.data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error.message);
    }
   
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-500">My Profile</h1>
      <div className="flex justify-center items-center mt-10 ">
      
      <div className="w-full max-w-xl bg-white  rounded p-8 border border-gray-200">
       
        <div className="flex flex-col items-center">
          <div className="relative w-36 h-36">
            <img
              src={profile?.photo || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
            <label
              htmlFor="profileUpload"
              className="absolute bottom-0 right-0 bg-indigo-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-indigo-600 transition-all"
            >
              <FaCamera size={18} />
            </label>
            <input
              type="file"
              id="profileUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">{profile?.name || "User Name"}</h1>
          <p className="text-gray-500">{profile?.email || "user@example.com"}</p>
        </div>

    
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-4 shadow-sm">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-600">{profile?.name || "User"}</span>
          </div>
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-4 shadow-sm">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-600">{profile?.email || "user@example.com"}</span>
          </div>
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-4 shadow-sm">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="text-gray-600">{profile?.role || "User"}</span>
          </div>
        </div>

    
        <div className="mt-8">
          <button className="w-full px-6 py-3 bg-indigo-500 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-600 transition-all">
            Update Profile
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyProfile;
