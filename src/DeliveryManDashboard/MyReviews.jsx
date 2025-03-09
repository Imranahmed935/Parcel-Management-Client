import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ['deliveryMan', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleDeliveryMan/${user?.email}`);
            return res.data;
        },
    });

    const { data: reviews = [] } = useQuery({
        queryKey: ['CustomerReviews', data?._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${data?._id}`);
            return res.data;
        },
        enabled: !!data?._id,
    });

    
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i < rating ? 'text-yellow-500' : 'text-gray-400'} 
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="loader border-t-4 border-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        );
      }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Reviews</h1>

            {reviews.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border rounded-lg p-2 bg-white"
                        >
                            
                            <img
                                src={review.image}
                                alt={review.name}
                                className="w-16 h-16 object-cover rounded-full mx-auto mb-2" 
                            />
                            <h2 className="text-xl text-center font-semibold mb-2">{review.name}</h2>
                            <p className="text-gray-700 mb-2">{review.review}</p>
                            <p className="text-sm text-gray-500">Rating: {renderStars(review.ratings)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
};

export default MyReviews;
