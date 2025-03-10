import Layout from "./Layout";
import Login from "./Components/Login/Login";
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Requests from "./Components/requests/Requests";
import RequestDetails from './Components/requests/Request/RequestDetails/RequestDetails';
import Offices from "./Components/Offices/Offices";
import Conditions from "./Components/requests/Conditions";
import InspectionReport from './Components/requests/Request/InspectionReport'
import AutodeskResultViewer from './Components/Autodesk/AutodeskResultViewer'
import ViewCompliance from './Components/Autodesk/ViewCompliance'
import ArcReport from "./Components/ArcReport/ArcReport";
import StrReport from "./Components/ArcReport/StrReport";
import Footer from "./Components/Footer/Footer";
import { useEffect } from "react";
import LandingPage from "./Components/LandingPage";

function App() {
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.removeItem("isLoggedIn");
  //     localStorage.removeItem("visualCategory");
  //     localStorage.removeItem("visualCategoryStatus");
  //     localStorage.removeItem("reportType");
  //     localStorage.removeItem("ComplianceResultData");
  //     localStorage.removeItem("urn");
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 ">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/offices" element={<Offices />} />
            <Route path="/login" element={<Login />} />
            <Route path="/offices/:id/requests" element={<Requests />} />
            <Route path="/offices/:id/request/:requestid" element={<RequestDetails />} />
            <Route path="/conditions/:krookiNumber" element={<Conditions />} />
            <Route path="/InspectionReport/:krookiNumber" element={<InspectionReport />} />
            <Route path="/AutodeskResultViewer" element={<AutodeskResultViewer />} />
            <Route path="/ViewCompliance" element={<ViewCompliance />} />
            <Route path="/arc" element={<ArcReport />} />
            <Route path="/str" element={<StrReport />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
