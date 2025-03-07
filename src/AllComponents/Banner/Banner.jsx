import React from "react";
import deli from "../../assets/banner/new banner.png";

const Banner = () => {
  return (
    <div className="lg:flex items-center justify-center gap-12 px-6 lg:px-16 bg-gray-50">
    
      <div className="max-w-xl lg:text-left lg:space-y-6 space-y-3 mb-6">
        <h1 className="text-2xl lg:text-2xl font-bold text-gray-900 leading-tight">
          Welcome to <span className="text-blue-600">SwiftShip</span>
        </h1>
        <p className="text-3xl lg:text-5xl font-extrabold text-gray-800 leading-snug">
          Your reliable partner for <span className="text-blue-600">swift</span>  
          & <span className="text-blue-600">seamless</span> deliveries.
        </p>
        <p className="text-md lg:text-lg text-gray-600 leading-relaxed">
          Experience hassle-free parcel management with real-time tracking, secure handling, 
          and efficient delivery solutions. Whether it's local or international, 
          we ensure your packages reach their destination safely and on time.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105">
          Get Started
        </button>
      </div>
      <div className="w-full lg:w-[600px] h-[600px] flex justify-center px-2">
        <img className="w-full h-full object-cover rounded hover:scale-110 duration-500" src={deli} alt="SwiftShip Delivery" />
      </div>
    </div>
  );
};

export default Banner;
