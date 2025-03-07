import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Marquee from "react-fast-marquee";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const AllComment = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviewsValue = [], error, isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 w-12 h-12 rounded-full"></div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-gray-100 py-32 relative overflow-hidden">
      <h1 className="lg:text-3xl text-2xl text-gray-600 font-bold text-center mb-8">Customer Reviews ({reviewsValue.length})</h1>
      
      {/* Gradient Opacity Effect */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-100 opacity-40"></div>

      <div className="p-6 lg:p-10 py-12 rounded-lg lg:w-8/12 mx-auto bg-white z-10 relative">
        <Marquee pauseOnHover speed={50}>
          {reviewsValue.map((item, index) => (
            <div
              key={index}
              className="mx-4 bg-white border border-blue-500 p-4 rounded-lg shadow-lg hover:scale-105 duration-300 flex flex-col items-center max-w-xs"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full border-2 border-gray-300"
              />
              <h2 className="text-lg font-semibold mt-4">{item.name}</h2>
              <div className="flex mt-1">{renderStars(item.ratings)}</div>
              <p className="text-gray-600 mt-3 text-center">{item.review}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default AllComment;
