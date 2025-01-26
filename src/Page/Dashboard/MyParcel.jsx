import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");
 
  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allParcel", filter, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookParcel/${user.email}?filter=${filter}`
      );
      return res.data;
    },
  });

  const handleReview = (e, id) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
  
    const ratings = data.ratings;
    if (!ratings || isNaN(ratings)) {
      toast.error('Invalid ratings value');
      return;
    }
  
    // POST the review data
    axiosSecure
      .post('/reviews', data)
      .then((res) => {
        if (res.status === 200) {
          const userReview = { reviewed: parseFloat(ratings) };
  
          // Update the user with the new review
          return axiosSecure.put(`/review/man/${id}`, userReview);
        } else {
          throw new Error('Failed to save review');
        }
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Review added and user updated successfully');
          form.reset();
        } else {
          throw new Error('Failed to update user review');
        }
      })
      .catch((error) => {
        console.error('Error submitting review or updating user:', error);
        toast.error('Failed to submit review or update user');
      });
  };
  
  


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-semibold">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-indigo-500 mb-6">My Parcels</h1>

        <div>
          <Select onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px] border border-gray-400">
              <SelectValue placeholder="filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>filter by status</SelectLabel>
                <SelectItem value="delivered">delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="On the">On the way</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">#</th>
              <th className="px-4 py-2 border border-gray-300">Parcel Type</th>
              <th className="px-4 py-2 border border-gray-300">
                Requested Delivery Date
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Approximate Delivery Date
              </th>
              <th className="px-4 py-2 border border-gray-300">Booking Date</th>
              <th className="px-4 py-2 border border-gray-300">
                Delivery Men ID
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Booking Status
              </th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {parcel.type}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {parcel.date}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {parcel.deliveryDate || "Not Set"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(parcel.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {JSON.stringify(parcel.deliveryManId) || "Not Set"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      parcel.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : parcel.status === "on the way"
                        ? "bg-blue-200 text-blue-800"
                        : parcel.status === "delivered"
                        ? "bg-green-200 text-green-800"
                        : parcel.status === "returned"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="px-2 py-2 border border-gray-300 space-y-2">
                  {parcel.status === "pending" ? (
                    <>
                      {/* Update Button */}
                      <Link to={`/dashboard/updateParcel/${parcel._id}`}>
                        <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Update
                        </button>
                      </Link>

                      {/* Cancel Button */}
                      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Cancel
                      </button>

                      {/* Pay Button */}
                      <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600">
                          Pay
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
            
                      <button
                        className="px-2 py-1 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
                        disabled
                      >
                        Update
                      </button>
               
                      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Cancel
                      </button>
                  
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                            Review
                          </button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Your Review</DialogTitle>
                            <DialogDescription>
                              Please provide your feedback below.
                            </DialogDescription>
                          </DialogHeader>

                          <form
                            className="space-y-4"
                            onSubmit={(e) =>
                              handleReview(e, parcel.deliveryManId)
                            } 
                          >
                           
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                type="text"
                                id="name"
                                name="name" 
                                defaultValue={parcel.name}
                              />
                            </div>

                            
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="image">Image</Label>
                              <Input
                                type="text"
                                id="image"
                                name="image" 
                                defaultValue={parcel.photo}
                              />
                            </div>

                           
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="id">Delivery Men’s ID</Label>
                              <Input
                                type="text"
                                id="id"
                                name="id" 
                                defaultValue={parcel.deliveryManId}
                                readOnly 
                              />
                            </div>

                           
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="ratings">Rating out of 5</Label>
                              <Input
                                type="number"
                                id="ratings"
                                name="ratings" 
                                min="1"
                                max="5"
                                placeholder="Rate between 1 to 5"
                              />
                            </div>

                           
                            <div>
                              <Label htmlFor="review">Give your Review</Label>
                              <textarea
                                id="review"
                                name="review" 
                                className="w-full border rounded-md p-2"
                                rows="4"
                                placeholder="Write your review..."
                              ></textarea>
                            </div>

                        
                            <button
                              type="submit"
                              className="btn-secondary w-full bg-blue-600 py-1 rounded text-white hover:bg-blue-700"
                            >
                              Submit
                            </button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      ;
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
