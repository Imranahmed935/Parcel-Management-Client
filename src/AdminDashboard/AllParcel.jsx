import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allParcels');
      console.log(res.data)
      return res.data;
    },
  });

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Booked Parcels</h1>
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
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.number}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {parcel.date}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{parcel.price}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        parcel.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {parcels.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-4"
                  >
                    No parcels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllParcel;
