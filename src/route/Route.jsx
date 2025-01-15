import MainLayout from "@/Layout/MainLayout";
import ErrorPage from "@/Page/ErrorPage/ErrorPage";
import Home from "@/Page/Home/Home";

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
            }
        ]
    }
])

export default router;