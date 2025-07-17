import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import AllScholarships from "../Pages/AllSholerships";
import MyApplications from "../Dashboard/UserDashboard/MyApplication";
import MyReviews from "../Dashboard/UserDashboard/MyReviews";

import Dashboard from "../Dashboard/Dashboard";
import CheckoutPage from "../Pages/CheckoutPage";
import ApplicationDetails from "../Dashboard/UserDashboard/ApplicationDetails ";
import EditApplication from "../Dashboard/UserDashboard/EditApplication";
import ReviewForm from "../Dashboard/UserDashboard/ReviewForm";
import MyProfile from "../Dashboard/Common/MyProfile";

import AllReviews from "../Dashboard/Common/AllReviews";
import AllAppliedScholarships from "../Dashboard/Common/AllAppliedScholarships";
import AddScholarship from "../Dashboard/Common/AddScholarship";
import ManageUsers from "../Dashboard/AdminDashboard.jsx/ManageUsers ";
import ManageScholarships from "../Dashboard/Common/ManageScholarships ";


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
            <ScholarshipDetails />
          </PrivateRoute>

      },
      {
        path: '/checkout/:id',
        element: <CheckoutPage />
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
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'my-applications',
        element: <MyApplications />
      },
      {
        path: 'applications/:id',
        element: <ApplicationDetails />
      },
      {
        path: 'applications/:id',
        element: <EditApplication />
      },
      {
        path: 'applications/review/:id',
        element: <ReviewForm />
      },
      {
        path: 'my-reviews',
        element: <MyReviews />
       
      },
      {
        path: 'my-profile',
        element: <MyProfile />
      },
      {
        path: 'manage-scholarships',
        element: <ManageScholarships />
      },
      {
        path: 'all-reviews',
        element: <AllReviews />
      },
      {
        path: 'all-applied-scholarships',
        element: <AllAppliedScholarships/>
      },
      {
        path: 'add-scholarship',
        element: <AddScholarship/>
      },
      {
        path: 'manage-users',
        element: <ManageUsers/>
      },
  
    ]
  },

]);

export default router