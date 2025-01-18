import Layout from "./layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  // const { theme, language, toggleTheme, toggleLanguage } = useApp();
  // const t = translations[language];
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index:true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
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
