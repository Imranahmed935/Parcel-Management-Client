import React from 'react';
import { FaLock, FaShippingFast, FaUsers } from 'react-icons/fa';
import CountUp from 'react-countup';

const Features = () => {
   

    return (
        <div className="bg-gray-100 py-16 px-6">
            {/* Features Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Features</h2>
                <p className="text-gray-600">
                    Discover why SwiftShip is the best choice for your delivery needs.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Feature 1 */}
                <div className=" shadow-lg bg-red-100 rounded-lg p-6 text-center">
                    <div className="text-red-500 text-4xl mb-4">
                        <FaLock />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Parcel Safety</h3>
                    <p className="text-gray-600">
                        Your parcels are always safe with us, ensuring secure handling and delivery.
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-teal-100 shadow-lg rounded-lg p-6 text-center">
                    <div className="text-teal-500 text-4xl mb-4">
                        <FaShippingFast />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Super Fast Delivery</h3>
                    <p className="text-gray-600">
                        Experience lightning-fast delivery for all your shipments, guaranteed.
                    </p>
                </div>
                {/* Feature 3 */}
                <div className="bg-purple-100 shadow-lg rounded-lg p-6 text-center">
                    <div className="text-purple-500 text-4xl mb-4">
                        <FaUsers />
                    </div>
                    <h3 className="text-xl font-bold mb-2">User-Friendly</h3>
                    <p className="text-gray-600">
                        Easy-to-use platform with seamless tracking and management of parcels.
                    </p>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
                <p className="text-gray-600">
                    See the growing trust and popularity of SwiftShip through our stats.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Stat 1 */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                       
                    </h3>
                    <p className="text-gray-600">Total Parcels Booked</p>
                </div>
                {/* Stat 2 */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        
                    </h3>
                    <p className="text-gray-600">Total Parcels Delivered</p>
                </div>
                {/* Stat 3 */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      
                    </h3>
                    <p className="text-gray-600">Total Registered Users</p>
                </div>
            </div>
        </div>
    );
};

export default Features;
