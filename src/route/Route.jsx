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
                path:'/login',
                element:<LogIn/>
            },
            {
                path:'/signup',
                element:<SignUp/>
            },
            {
                path:'/dashboard',
                element:<Dashboard/>,
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
                    }
                ]
            }
        ]
    }
])

export default router;