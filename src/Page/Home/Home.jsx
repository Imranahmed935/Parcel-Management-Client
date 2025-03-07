import AllComment from "@/AllComponents/AllComment/AllComment";
import Banner from "@/AllComponents/Banner/Banner";
import FAQSection from "@/AllComponents/FAQ/FAQSection";
import Features from "@/AllComponents/Features/Features";
import PricingPlans from "@/AllComponents/PricingPlans/PricingPlans";
import TopDeliveryMan from "@/AllComponents/TopDeliveryMan/TopDeliveryMan ";

const Home = () => {
  
  return (
    <div>
     <Banner/>
     <Features/>
     <TopDeliveryMan/>
     <PricingPlans/>
     <AllComment/>
     <FAQSection/>
    </div>
  );
};

export default Home;
