import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllDeliveryMan = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: deliveryMen = [], isLoading } = useQuery({
    queryKey: ['deliveryman1'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/allDeliveryMan/deliveryMan');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader border-t-4 border-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 ">
        All Delivery Men ({deliveryMen.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className='border border-gray-400'>
            <tr className="bg-gray-100 text-gray-700 ">
              <th className="px-4 py-2 text-left text-sm font-medium border border-gray-400">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium border border-gray-400">Phone Number</th>
              <th className="px-4 py-2 text-center text-sm font-medium border border-gray-400">Parcels Delivered</th>
              <th className="px-4 py-2 text-center text-sm font-medium border border-gray-400">Average Review</th>
            </tr>
          </thead>
          <tbody>
            {deliveryMen.map((man, index) => (
              <tr
                key={man._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition duration-200 `}
              >
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  {man.name || 'N/A'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-200">
                  {man.phone || 'N/A'}
                </td>
                <td className="px-4 py-2 text-center text-sm text-gray-700 border border-gray-200">
                  {man.count || 0}
                </td>
                <td className="px-4 py-2 text-center text-sm text-gray-700 border border-gray-200">
                  {man.reviewed?.toFixed(1) || 'N/A'}
                </td>
              </tr>
            ))}
            {deliveryMen.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No delivery men found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliveryMan;
