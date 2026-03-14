import {createBrowserRouter} from "react-router";
import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";
import Protected from "./features/auth/components/protected";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    }, {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: <Protected><Home /></Protected>
    }
])