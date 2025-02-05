import Layout from "./Layout";
import Login from "./Components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Requests from "./Components/requests/Requests";
import RequestDetails from './Components/requests/Request/RequestDetails/RequestDetails';
import Offices from "./Components/Offices/Offices";
import Conditions from "./Components/requests/Conditions";
import InspectionReport from './Components/requests/Request/InspectionReport'
import AutodeskResultViewer from './Components/Autodesk/AutodeskResultViewer'
import ViewCompliance from './Components/Autodesk/ViewCompliance'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // {
        //   index: true,
        //   element: <Home />,
        // },
        {
          index: true, element: <Login />,
        },
        {
          path: "/offices",
          element: <Offices />,
        },

        {
          path: "/login",
          element: <Login />,
        },
        { path: "/offices/:id/requests", element: <Requests /> },
        { path: "/offices/:id/request/:requestid", element: <RequestDetails /> },
        {
          path: "conditions/:krookiNumber",
          element: <Conditions />,
        },
        {
          path: "InspectionReport/:krookiNumber",
          element: <InspectionReport />,
        },
        {
          path: "AutodeskResultViewer",
          element: <AutodeskResultViewer />,
        },
        {
          path: "ViewCompliance",
          element: <ViewCompliance />,
        },
        {
          path: "*",
          element: <h1>Page Not Found</h1>, // Replace with your custom 404 page
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
