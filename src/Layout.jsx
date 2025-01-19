import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { useApp } from "./Context/AppContext";
import { translations } from './translations';
export default function Layout() {
    const { theme, language, toggleTheme, toggleLanguage } = useApp();
    const t = translations[language];


  return (
    <>
      <Navbar theme={theme} language={language} toggleTheme={toggleTheme} toggleLanguage={toggleLanguage} t={t} />
      <Outlet />
      <Footer   language={language} />
    </>
  );
}
