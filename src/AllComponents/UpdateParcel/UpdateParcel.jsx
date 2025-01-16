import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data = {} } = useQuery({
    queryKey: ["parcel"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/updateParcel/${id}`);
      return res.data;
    },
  });
  const {
    name,
    email,
    number,
    type,
    weight,
    receiverName,
    receiverPhone,
    address,
    date,
    latitude,
    longitude,
    price,

  } = data;

  const handleUpdateParcel = async (e)=>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const type = form.type.value;
    const weight = form.weight.value;
    const receiverName = form.receiverName.value;
    const receiverPhone = form.receiverPhone.value;
    const address = form.address.value;
    const date = form.date.value;
    const latitude = form.latitude.value;
    const longitude = form.longitude.value;
    const allData = {
      name,
      email,
      number,
      type,
      weight,
      receiverName,
      receiverPhone,
      address,
      date,
      latitude,
      longitude,
    
    };
    const res = await axiosSecure.patch(`/updateParcel/${id}`, allData);
    if (res.data.modifiedCount > 0) {
      toast.success("Parcel update successfully!");
    }

  }


  return (
    <div>
      <div>
        <h2 className="text-2xl text-indigo-500 font-bold">Update Book a Parcel</h2>
        <div className="flex justify-center items-center  bg-gray-100 p-4">
          <form
          onSubmit={handleUpdateParcel}
           
            className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-md space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  readOnly
                  defaultValue={name}
                  placeholder="Enter your full name"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  defaultValue={email}
                  placeholder="Enter your email"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={number}
                  name="number"
                  placeholder="Enter phone number"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Parcel Type
                </label>
                <input
                  type="text"
                  defaultValue={type}
                  name="type"
                  placeholder="Enter parcel type"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Parcel Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  defaultValue={weight}
                  placeholder="Enter parcel weight"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
               
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Receiver's Name
                </label>
                <input
                  type="text"
                  defaultValue={receiverName}
                  name="receiverName"
                  placeholder="Enter receiver's name"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Receiver's Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={receiverPhone}
                  name="receiverPhone"
                  placeholder="Enter receiver's phone number"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  defaultValue={address}
                  placeholder="Enter delivery address"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Delivery Date
                </label>
                <input
                  type="date"
                  defaultValue={date}
                  name="date"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Latitude
                </label>
                <input
                  type="text"
                  defaultValue={latitude}
                  name="latitude"
                  placeholder="Enter latitude"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Longitude
                </label>
                <input
                  type="text"
                  defaultValue={longitude}
                  name="longitude"
                  placeholder="Enter longitude"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  defaultValue={price}
                  name="price"
                  value={`${price} Tk`}
                  readOnly
                  className="w-full mt-2 p-3 border bg-gray-100 rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 font-semibold bg-indigo-500 text-white rounded-md w-full transform hover:scale-105 transition duration-300"
              >
                Update Parcel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateParcel;
