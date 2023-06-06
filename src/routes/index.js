import Login from "../pages/Login";
import Register from "../pages/Register";
import Articles from "../pages/Articles";
import UpdateMe from "../pages/UpdateMe";

export const authRoute = [
    {
        path: "/",
        component: Articles,
    },
    {
        path: "/update-me",
        component: UpdateMe,
    },
];

export const noAuthRoute = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
];
