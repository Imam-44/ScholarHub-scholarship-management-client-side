import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts/>,
    children: [
      {
        index: true,
      }
    ]
  },
]);

export default router