import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/signin',
        Component: SignIn
      },
    ]
  },

]);

export default router