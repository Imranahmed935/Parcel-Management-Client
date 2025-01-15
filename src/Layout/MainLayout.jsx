import Footer from "@/AllComponents/Footer/Footer";
import Navbar from "@/AllComponents/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
           <div className="min-h-screen">
           <Outlet/>
           </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;