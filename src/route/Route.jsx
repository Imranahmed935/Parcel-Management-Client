import AllDeliveryMan from "@/AdminDashboard/AllDeliveryMan";
import AllParcel from "@/AdminDashboard/AllParcel";
import AllUsers from "@/AdminDashboard/AllUsers";
import Statistics from "@/AdminDashboard/Statistics";
import UpdateParcel from "@/AllComponents/UpdateParcel/UpdateParcel";
import UpdateProfile from "@/AllComponents/UpdateProfile/UpdateProfile";
import MainLayout from "@/Layout/MainLayout";
import BookParcel from "@/Page/Dashboard/BookParcel";
import Dashboard from "@/Page/Dashboard/Dashboard";
import MyParcel from "@/Page/Dashboard/MyParcel";
import MyProfile from "@/Page/Dashboard/MyProfile";
import ErrorPage from "@/Page/ErrorPage/ErrorPage";
import Home from "@/Page/Home/Home";
import LogIn from "@/Page/LogIn/LogIn";
import SignUp from "@/Page/SignUp/SignUp";

import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import MyDeliveryList from "@/DeliveryManDashboard/MyDeliveryList";
import MyReviews from "@/DeliveryManDashboard/MyReviews";
import Payment from "@/Page/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "@/Page/AboutUs";
import ContactUs from "@/Page/ContactUs";

 const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/about',
                element:<AboutUs/>
            },
            {
                path:'/contact',
                element:<ContactUs/>
            },
            {
                path:'/login',
                element:<LogIn/>
            },
            {
                path:'/signup',
                element:<SignUp/>
            },
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children:[
            {
                path:'profile',
                element:<MyProfile/>
            },
            {
                path:'bookParcel',
                element:<BookParcel/>
            },
            {
                path:'myParcel',
                element:<MyParcel/>
            },
            {
                path:'update',
                element:<UpdateProfile/>
            },
            {
                path:'updateParcel/:id',
                element:<UpdateParcel/>
            },
            {
                path:'statistics',
                element:<AdminRoute><Statistics/></AdminRoute>
            },
            {
                path:'AllUsers',
                element:<AdminRoute><AllUsers/></AdminRoute>     
            },
            {
                path:'AllParcels',
                element:<AdminRoute><AllParcel/></AdminRoute>
            },
            {
                path:'DeliverMan',
                element:<AdminRoute><AllDeliveryMan/></AdminRoute>
            },
            {
                path:'myDeliveryList',
                element:<MyDeliveryList/>,
    
            },
            {
                path:'reviews',
                element:<MyReviews/>
            },
            {
                path:'payment/:id',
                element:<Payment/>
            }
        ]
    }
])

export default router;