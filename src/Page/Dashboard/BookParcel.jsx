import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookParcel = () => {
  const { user } = useAuth();
  const [price, setPrice] = useState(0);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  

  const handleFormValue = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const type = form.type.value;
    const weight = form.weight.value;
    const receiverName = form.receiverName.value;
    const receiverPhone = form.receiverPhone.value;
    const photo = user.photoURL
    const address = form.address.value;
    const date = form.date.value;
    const latitude = form.latitude.value;
    const longitude = form.longitude.value;
    const price = parseInt(form.price.value);
    const status = "pending";
    const deliveryManId='N/A'
    
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
      price,
      status,
      photo,
      deliveryManId
    };
    const res = await axiosSecure.post("/bookParcel", allData);
    if (res.data.insertedId) {
      toast.success("Parcel booked successfully!");
      navigate('/dashboard/myParcel')
      
    }
  };

  const handleWeightChange = (e) => {
    const weight = e.target.value;
    if (weight == 1) {
      setPrice(50);
    } else if (weight == 2) {
      setPrice(100);
    } else if (weight > 2) {
      setPrice(150);
    }else{
      setPrice(0)
    }
  
  };
    
  return (
    <div className="mt-10">
      <h2 className="text-2xl mb-5 text-black font-bold">
          Book a Parcel
        </h2>
      <div className=" flex justify-center items-center  bg-gray-100 p-4 border">
       
      <form
        onSubmit={handleFormValue}
        className="w-full p-6 bg-white rounded-md space-y-6"
      >
       

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              readOnly
              placeholder="Enter your full name"
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              readOnly
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              name="number"
              placeholder="Enter phone number"
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        </div>

        {/* Parcel Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Parcel Type
            </label>
            <input
              type="text"
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
              placeholder="Enter parcel weight"
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              onChange={handleWeightChange}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Receiver's Name
            </label>
            <input
              type="text"
              name="receiverName"
              placeholder="Enter receiver's name"
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Receiver's Phone Number
            </label>
            <input
              type="number"
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
              placeholder="Enter delivery address"
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">
             Requested Date
            </label>
            <input
              type="date"
              name="date"
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        </div>

        {/* Location and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Latitude
            </label>
            <input
              type="text"
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
              type="number"
              name="price"
              value={price}
              readOnly
              className="w-full mt-2 p-3 border bg-gray-100 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 font-semibold bg-indigo-500 text-white rounded-md w-full transform hover:scale-105 transition duration-300"
          >
            Book Parcel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default BookParcel;