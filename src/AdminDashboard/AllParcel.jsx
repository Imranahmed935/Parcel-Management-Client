import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allParcels");
      return res.data;
    },
  });

  const { data: deliveryMen = [] } = useQuery({
    queryKey: ["deliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/deliveryMan");
      return res.data;
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryman, setDeliveryman] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");

  const openDialog = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeDialog = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
    setDeliveryman("");
    setDeliveryDate("");
    setDeliveryEmail("");
  };

  const handleAssign = async () => {
    if (!deliveryman || !deliveryDate) {
      toast.error("Please select a deliveryman and date.");
      return;
    }

    try {
      await axiosSecure.post(`parcels/${selectedParcel._id}`, {
        selected: selectedParcel,
        deliveryManId: deliveryman,
        deliveryManEmail: deliveryEmail,
        deliveryDate,
      });
      toast.success("Parcel successfully assigned!");
      closeDialog();
      refetch();
    } catch (error) {
      toast.error("Failed to assign parcel. Please try again.");
    }

    await axiosSecure.patch(`/users/status/${selectedParcel._id}`);
    refetch();
  };

  const handleDeliverymanChange = (e) => {
    const selectedId = e.target.value;
    const selectedMan = deliveryMen.find((man) => man._id === selectedId);
    setDeliveryman(selectedId);
    setDeliveryEmail(selectedMan?.email || "");
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Booked Parcels
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 text-left text-sm font-medium">User Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Booking Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Requested Delivery</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Cost</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-2 text-center text-sm font-medium">Manage</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.number}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.price}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
  
                        parcel.status === "pending" ? "bg-red-600 text-white":"bg-green-100 text-green-600",
                        parcel.status === "Cancelled" ? "bg-red-100 text-red-700":"bg-green-100 text-green-600"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => openDialog(parcel)}
                      className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {parcels.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">
                    No parcels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-1/3 rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Assign Delivery Man</h2>
              <p>
                <strong>Parcel Name:</strong> {selectedParcel?.name}
              </p>
              <p>
                <strong>Current Status:</strong> {selectedParcel?.status}
              </p>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Deliveryman
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  value={deliveryman}
                  onChange={handleDeliverymanChange}
                >
                  <option value="">Select</option>
                  {deliveryMen.map((man) => (
                    <option key={man._id} value={man._id}>
                      {man.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Approximate Delivery Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAssign}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                >
                  Assign
                </button>
                <button
                  onClick={closeDialog}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcel;
