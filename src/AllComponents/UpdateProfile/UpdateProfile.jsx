import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data = {} } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/updateUser/${user.email}`);
      return res.data;
    },
  });

  const handleUpdate =  async(e)=>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const updateData = {name, email}

    const res = await axiosSecure.patch(`/updateUser/${user.email}`, updateData)
     if(res.data.modifiedCount > 0){
        navigate('/dashboard/profile')
        toast.success('Profile Update Successfully.')
     }

  }
  return (
    <div>
        <h1 className="text-2xl text-indigo-500 font-bold">Update your Profile</h1>
        <form onSubmit={handleUpdate} className="space-y-6 max-w-4xl mx-auto mt-10 border border-gray-500 p-4 rounded">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          defaultValue={data.name}
          id="name"
          name="name"
          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          defaultValue={data.email}
          id="email"
          name="email"
          className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </div>
    </form>
    </div>
  );
};

export default UpdateProfile;
