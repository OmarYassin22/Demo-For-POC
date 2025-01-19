import Layout from "./layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Offices from "./Components/Offices/Offices";
import Requests from "./Components/requests/Requests";
import RequestDetails from './Components/requests/Request/RequestDetails/RequestDetails';
function App() {
  // const { theme, language, toggleTheme, toggleLanguage } = useApp();
  // const t = translations[language];
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/offices",
          element: <Offices />,
        },
        {path: "/offices/:id/request/:requestid", element:<RequestDetails/>},
        { path: "/offices/:id/requests", element: <Requests /> },
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
