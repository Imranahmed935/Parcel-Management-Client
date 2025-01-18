import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ['allParcel'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookParcel/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center text-xl font-semibold">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500 font-semibold">Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-indigo-500 mb-6">My Parcels</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">#</th>
              <th className="px-4 py-2 border border-gray-300">Parcel Type</th>
              <th className="px-4 py-2 border border-gray-300">Requested Delivery Date</th>
              <th className="px-4 py-2 border border-gray-300">Approximate Delivery Date</th>
              <th className="px-4 py-2 border border-gray-300">Booking Date</th>
              <th className="px-4 py-2 border border-gray-300">Delivery Men ID</th>
              <th className="px-4 py-2 border border-gray-300">Booking Status</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-300">{parcel.type}</td>
                <td className="px-4 py-2 border border-gray-300">{parcel.date}</td>
                <td className="px-4 py-2 border border-gray-300">{parcel.approximateDeliveryDate || 'Not Set'}</td>
                <td className="px-4 py-2 border border-gray-300">{new Date(parcel.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {parcel.deliveryMenId || 'Not Assigned'}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      parcel.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : parcel.status === 'on the way'
                        ? 'bg-blue-200 text-blue-800'
                        : parcel.status === 'delivered'
                        ? 'bg-green-200 text-green-800'
                        : parcel.status === 'returned'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="px-2 py-2 border border-gray-300 space-y-2">
              
                  <Link to={`/dashboard/updateParcel/${parcel._id}`}><button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Update
                  </button></Link>
                  <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Cancel
                  </button>

                
                  {parcel.status === 'delivered' && (
                    <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                      Review
                    </button>
                  )}

            
                  {parcel.status === 'pending' && (
                    <button className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600">
                      Pay
                    </button>
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
