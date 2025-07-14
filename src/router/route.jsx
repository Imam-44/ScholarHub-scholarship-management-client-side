import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageApplications from "../Pages/Dashboard/Admin/ManageApplications";
import ManageReviews from "../Pages/Dashboard/Admin/ManageReviews";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AllApplication from "../Pages/Dashboard/ModeratorDashboard/AllApplication";
import AllReviews from "../Pages/Dashboard/ModeratorDashboard/AllReviews";
import MyApplication from "../Pages/Dashboard/UserDashboard/MyApplication";
import MyReviews from "../Pages/Dashboard/UserDashboard/MyReviews";
import AddScholarship from "../Pages/Dashboard/Common/AddScholarship";
import ManageScholarships from "../Pages/Dashboard/Common/ManageScholarships";
import MyProfile from "../Pages/Dashboard/Common/MyProfile";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import AllScholarships from "../Pages/AllSholerships";

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
  },
  {
    path: '/manage-application',
    element: <PrivateRoute>
      <ManageApplications/>
    </PrivateRoute>
  },
  {
    path: '/manage-reviews',
    element: <PrivateRoute>
      <ManageReviews/>
    </PrivateRoute>
  },
  {
    path: '/manage-users',
    element: <PrivateRoute>
      <ManageUsers/>
    </PrivateRoute>
  },
  {
    path: '/all-application',
    element: <PrivateRoute>
      <AllApplication/>
    </PrivateRoute>
  },
  {
    path: '/all-reviews',
    element: <PrivateRoute>
      <AllReviews/>
    </PrivateRoute>
  },
  {
    path: '/my-application',
    element: <PrivateRoute>
      <MyApplication/>
    </PrivateRoute>
  },
  {
    path: '/my-reviews',
    element: <PrivateRoute>
      <MyReviews/>
    </PrivateRoute>
  },
  //common dash
  {
    path: '/add-scholarship',
    element: <PrivateRoute>
      <AddScholarship/>
    </PrivateRoute>
  },
  {
    path: '/mansage-scholarship',
    element: <PrivateRoute>
       <ManageScholarships/>
    </PrivateRoute>
  },
  {
    path: '/my-profile',
    element:<PrivateRoute>
      <MyProfile/>
    </PrivateRoute>
  }

]);

export default router