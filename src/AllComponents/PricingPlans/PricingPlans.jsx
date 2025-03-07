import { Button } from "@/components/ui/button";

const PricingPlans = () => {
  const plans = [
    {
      name: "Basic",
      price: "$5",
      duration: "3-5 Days Delivery",
      features: ["Up to 5kg", "Standard Support", "Tracking Included"],
    },
    {
      name: "Standard",
      price: "$10",
      duration: "1-3 Days Delivery",
      features: ["Up to 10kg", "Priority Support", "Real-time Tracking"],
    },
    {
      name: "Express",
      price: "$20",
      duration: "Same-Day Delivery",
      features: ["Up to 20kg", "24/7 Support", "Live GPS Tracking"],
    },
  ];

  return (
    <div className="bg-[#ebf1f7] py-16 mt-10">
      <div className=" lg:px-32 w-8/12 mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Pricing Plans
        </h2>
        <p className="text-gray-500 mt-2 text-center">
          Choose a plan that fits your delivery needs.
        </p>

        <div className="lg:flex justify-evenly gap-8 space-y-4 lg:space-y-0 mt-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white flex flex-col h-full shadow-lg p-6 rounded-2xl lg:w-80 border border-blue-300 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-gray-700">{plan.price}</p>
              <p className="text-gray-500">{plan.duration}</p>

              <ul className="text-gray-600 space-y-2 mb-4 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
              </ul>

              <Button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-700 mt-auto">
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
