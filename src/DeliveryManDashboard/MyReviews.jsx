import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = {} } = useQuery({
        queryKey: ['deliveryMan', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleDeliveryMan/${user?.email}`);
            console.log(res.data);
            return res.data;
        },
    });

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', data?._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${data?._id}`);
            console.log(res.data);
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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Reviews</h1>

            {reviews.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border rounded-lg p-6 shadow-lg bg-white"
                        >
                            <h2 className="text-xl text-center font-semibold mb-4">{review.name}</h2>
                            <img
                                src={review.image}
                                alt={review.name}
                                className="w-24 h-24 object-cover rounded-full mx-auto mb-4" 
                            />
                            <p className="text-gray-700 mb-4">{review.review}</p>
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
