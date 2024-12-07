import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import GuestLayout from "../components/GuestLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
