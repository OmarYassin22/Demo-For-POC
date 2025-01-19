import { Building2, Languages, Moon,Sun, UserCircle } from 'lucide-react'
import React from 'react'
import { useApp } from '../../Context/AppContext';
import { translations } from '../../translations';
import { Link } from 'react-router-dom';

export default function Navbar({theme, language, toggleTheme, toggleLanguage,t}) {

  return (  
    <>
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-primary"  dir={language === "ar" ? "rtl" : "ltr"}>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Building2 className="h-8 w-8 text-white" />
            <Link to="/" className="text-white text-2xl font-bold">
              {language === "ar" ? "البناء برو" : "BuildPro"}
            </Link> 
          </div>
          <div className="flex items-center space-x-8 space-x-reverse">
            <div className="hidden md:flex space-x-8 space-x-reverse">
              <a
                href="#services"
                className="text-white text-3xl mx-4 hover:text-gray-200"
              >
                {t.nav.services}
              </a>
              <a
                href="#projects"
                className="text-white text-3xl ml-4 hover:text-gray-200"
              >
                {t.nav.projects}
              </a>
              <a
                href="#contact"
                className="text-white text-3xl ml-4 hover:text-gray-200"
              >
                {t.nav.contact}
              </a>
            </div>
            <button
              onClick={toggleTheme}
              className="text-white hover:text-gray-200"
            >
              {theme === "light" ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-gray-200"
            >
              <Languages className="h-6 w-6" />
            </button>
            <Link to="/login" className="text-white hover:text-gray-200">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </nav>
    </>
  )
}
