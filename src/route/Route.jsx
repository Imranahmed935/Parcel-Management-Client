import MainLayout from "@/Layout/MainLayout";
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
            }
        ]
    }
])

export default router;