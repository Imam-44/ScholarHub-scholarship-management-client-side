import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import AllScholarships from "../Pages/AllSholerships";
import MyApplications from "../Dashboard/MyApplication";
import MyReviews from "../Dashboard/MyReviews";
import MyProfile from "../Dashboard/MyProfile";
import Dashboard from "../Dashboard/Dashboard";
import CheckoutPage from "../Pages/CheckoutPage";

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
        path: '/all-scholarships',
        Component: AllScholarships
      },
      {
        path: '/scholarship/:id',
        element: 
          <PrivateRoute>
             <ScholarshipDetails/>
          </PrivateRoute>
        
      },
      {
        path: '/checkout/:id',
        element: <CheckoutPage/>
      } 
    ]
  },
  {
    path: '/signin',
    Component: SignIn
  },
  {
    path: '/signup',
    Component: SignUp
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
         <DashboardLayout/>
      </PrivateRoute>
    ),
    children:[
    {
      index: true,
      element: <Dashboard/>
    },
    { path: 'my-applications',
      element: <MyApplications/>
    },
     { path: 'my-reviews',
      element: <MyReviews/>
    },
     { path: 'my-profile',
      element: <MyProfile/>
    },

    ]
  },
  
]);

export default router