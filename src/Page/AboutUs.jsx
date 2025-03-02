import React from "react";
import mentor1 from '../assets/mentor/hello1.jpg'
import mentor2 from '../assets/mentor/hello2.jpg'
import mentor3 from '../assets/mentor/banner2.avif'

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 md:px-12 ">
      <div className="max-w-6xl mx-auto text-center border border-l-2 border-l-blue-500  p-4 rounded">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About SwiftShip</h1>
        <p className="text-lg text-gray-600 mb-8">
          SwiftShip is revolutionizing the parcel management system by offering a seamless, fast,
          and secure delivery experience. Our mission is to simplify logistics for businesses and
          individuals with a user-friendly interface and real-time tracking.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
        <img
          src={mentor3}
          alt="SwiftShip Mission"
          className="rounded  w-full"
        />
        <div className="border border-r-blue-500 p-4 rounded">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our goal is to make parcel delivery hassle-free with cutting-edge technology. We
            ensure efficient logistics, real-time tracking, and secure handling to provide the
            best experience for our customers and delivery personnel.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16 text-center lg:py-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded border">
            <img
              src={mentor2}
              alt="Team Member"
              className="w-20 h-20 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">Imran Ahmed</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>

          <div className="bg-white p-6 rounded border">
            <img
              src={mentor1}
              alt="Team Member"
              className="w-20 h-20 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">Masud Rana</h3>
            <p className="text-gray-600">Backend Engineer</p>
          </div>

          <div className="bg-white p-6 rounded border">
            <img
              src={mentor1}
              alt="Team Member"
              className="w-20 h-20 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">Kamran Ahmed</h3>
            <p className="text-gray-600">UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;