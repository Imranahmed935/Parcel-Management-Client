import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["assignMan"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/deliverList/${user.email}`);
      return res.data;
    },
  });

  const handleStatusChange = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this parcel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/cancelStatus/${id}`)
          .then((res) => {
            if (
              res.data.assignUpdated.modifiedCount > 0 &&
              res.data.bookedParcelUpdated.modifiedCount > 0
            ) {
              Swal.fire({
                title: "Cancelled!",
                text: "The delivery and parcel status have been updated.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "An error occurred. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleDeliverStatus = async (id, parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Deliver",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deliver it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/deliverStatus/${id}`);
  
          if (
            res?.data.result?.modifiedCount > 0 &&
            res?.data.delivered?.modifiedCount > 0
          ) {
            Swal.fire({
              title: "Delivered!",
              text: "The parcel has been successfully delivered.",
              icon: "success",
            });
            refetch(); 
          }
  
          await axiosSecure.post(`/deliveredCount`, parcel);
          await axiosSecure.patch(`/users/count/${user?.email}`)
        }
         catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while updating the status.",
            icon: "error",
          });
          console.error("Delivery status update error:", error);
        }
      }
    });
  };
  

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        My Delivery List
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left text-sm font-medium">
                Booked User’s Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Receiver’s Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Booked User’s Phone
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Requested Delivery Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Approximate Delivery Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Receiver’s Phone
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Receiver’s Address
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium">
                Actions
              </th>
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
                <td className="px-4 py-2 text-sm text-gray-700">
                  {parcel.selected.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {parcel.selected.receiverName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {parcel.selected.number}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {parcel.selected.date}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {parcel.deliveryDate || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {parcel.selected.receiverPhone}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {parcel.selected.address}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button className="bg-blue-500 text-white py-1 px-1 rounded-lg shadow-sm hover:bg-blue-600 transition">
                    View Location
                  </button>

                  {parcel.selected.status === "Cancelled" ? (
                    <span className="text-red-500 font-semibold">
                      Cancelled
                    </span>
                  ) : parcel.selected.status === "delivered" ? (
                    <span className="text-green-500 font-semibold">
                      Delivered
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(parcel._id, "Cancelled")
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded-lg shadow-sm hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeliverStatus(parcel._id, parcel)}
                        className="bg-green-500 text-white py-1 px-1 rounded-lg shadow-sm hover:bg-green-600 transition"
                      >
                        Deliver
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;
