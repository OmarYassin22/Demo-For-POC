import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";

// Add new logo component
const BuildingVerificationLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <svg 
        className="h-10 w-10 text-white" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Building base */}
        <path 
          d="M3 21h18v-2H3v2zm3-16h3v3H6V5zm0 5h3v3H6v-3zm0 5h3v3H6v-3zm5-10h3v3h-3V5zm0 5h3v3h-3v-3zm0 5h3v3h-3v-3z" 
          fill="currentColor"
        />
        {/* Checkmark overlay */}
        <path 
          d="M20 6L9 17l-5-5 1.41-1.42L9 14.17l9.59-9.58L20 6z" 
          fill="#4ADE80"
          className="animate-pulse"
        />
      </svg>
      {/* Decorative elements */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-300 rounded-full"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-white text-xl font-bold leading-tight">محرك التحقق</span>
      <span className="text-green-300 text-sm">من تصاميم البناء</span>
    </div>
  </div>
);

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  },);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-primary" dir="rtl">
      <Link to={isLoggedIn ? "/offices" : "/"} className="flex items-center">
        <BuildingVerificationLogo />
      </Link>
      
      {/* Rest of navbar */}
      <div className="flex items-center space-x-8 space-x-reverse">
        {/* Show navigation links only when not logged in */}
        {!isLoggedIn && (
          <div className="hidden md:flex space-x-8 space-x-reverse">
            {/* <a
              href="#services"
              className="text-white text-xl mx-4 hover:text-gray-200"
            >
              خدماتنا
            </a>
            <a
              href="#projects"
              className="text-white text-xl ml-4 hover:text-gray-200"
            >
              مشاريعنا
            </a>
            <a
              href="#contact"
              className="text-white text-xl ml-4 hover:text-gray-200"
            >
              اتصل بنا
            </a> */}
          </div>
        )}
        {isLoggedIn && (
          <Link
            to="/offices"
            className="text-white text-xl mx-4 hover:text-gray-200"
          >
            المكاتب
          </Link>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white hover:text-gray-200"
          >
            <LogOut className="h-6 w-6" />
            <span className="text-sm">تسجيل خروج</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 text-white hover:text-gray-200"
          >
            <UserCircle className="h-6 w-6" />
            <span className="text-sm">تسجيل دخول</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
