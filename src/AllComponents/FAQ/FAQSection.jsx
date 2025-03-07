import React, { useState } from "react";
import track from '../../assets/banner/deliver.png'

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is this website about?",
      answer:
        "This website provides users with a platform to track and manage their parcels effectively, ensuring smooth and secure deliveries.",
    },
    {
      question: "How can I track my parcel?",
      answer:
        "You can track your parcel by entering the tracking number in the tracking section of the website.",
    },
    {
      question: "How do I register an account?",
      answer:
        "To register, click on the 'Sign Up' button at the top of the page and fill in the required details.",
    },
    {
      question: "Can I change my delivery address?",
      answer:
        "Yes, you can update your delivery address in your account settings before the parcel is dispatched.",
    },
    {
      question: "What if my parcel is delayed?",
      answer:
        "If your parcel is delayed, please contact customer support with the tracking number for assistance.",
    },
  ];

  return (
    <div className="bg-[#ebf1f7] py-16">
        <h2 className="text-3xl py-6 text-center font-bold  text-gray-700 ">
          Frequently Asked Questions
        </h2>
       <div className="lg:flex items-center gap-10 lg:w-8/12 mx-auto">
       <div className="py-10 lg:w-3/4 px-2">
        <div className="max-w-3xl mx-auto bg-white rounded p-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b group hover:bg-gray-50 transition-colors duration-200"
            >
              <div
                className="flex justify-between items-center py-4 cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-all duration-200">
                  {item.question}
                </h3>
                <span className="text-lg text-gray-600 group-hover:text-blue-600 transition-all duration-200">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <p className="text-gray-600 pb-4">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
          <img className="w-full" src={track} alt="" />
      </div>
       </div>
    </div>
  );
};

export default FAQSection;
