import React from 'react';

const TopDeliveryMan = () => {
    const topDeliveryMen = [
        {
            name: 'John Doe',
            image: 'https://via.placeholder.com/150',
            parcelsDelivered: 120,
            avgRating: 4.9,
        },
        {
            name: 'Jane Smith',
            image: 'https://via.placeholder.com/150',
            parcelsDelivered: 110,
            avgRating: 4.8,
        },
        {
            name: 'Michael Lee',
            image: 'https://via.placeholder.com/150',
            parcelsDelivered: 100,
            avgRating: 4.7,
        },
    ];

    return (
        <div className="bg-gray-100 py-16 px-6">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Top Delivery Men</h2>
                <p className="text-gray-600">
                    Meet our best performers ensuring reliable and swift deliveries.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {topDeliveryMen.map((man, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
                    >
                        {/* Image */}
                        <img
                            src={man.image}
                            alt={man.name}
                            className="w-32 h-32 rounded-full mb-4 border-4 border-red-500"
                        />
                        {/* Name */}
                        <h3 className="text-xl font-bold mb-2">{man.name}</h3>
                        {/* Parcels Delivered */}
                        <p className="text-gray-600 mb-2">
                            Parcels Delivered: <span className="font-semibold">{man.parcelsDelivered}</span>
                        </p>
                        {/* Average Rating */}
                        <p className="text-gray-600">
                            Average Rating: <span className="font-semibold">{man.avgRating} / 5</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopDeliveryMan;
