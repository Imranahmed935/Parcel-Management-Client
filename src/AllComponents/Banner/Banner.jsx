import React from 'react';
import deli from '../../assets/banner/deli.jpg';

const Banner = () => {
    return (
        <div
            className="relative bg-cover bg-center lg:h-[800px] h-[300px] w-full"
            style={{ backgroundImage: `url(${deli})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                    Welcome to SwiftShip
                </h1>
                <p className="text-lg lg:text-xl mb-8">
                    Your reliable partner for swift and seamless deliveries.
                </p>
                <div className="flex w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search for services or products..."
                        className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-black"
                    />
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-red-600 transition"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
