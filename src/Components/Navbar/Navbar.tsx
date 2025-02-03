import {
  Building2,
  LogOut,

  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <>
      <nav
        className="relative z-10 flex items-center justify-between px-6 py-4 bg-primary"
        dir={"rtl"}
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <Building2 className="h-8 w-8 text-white" />
          <Link
            to={isLoggedIn ? "/offices" : "/"}
            className="text-white text-2xl font-bold"
          >
            البناء برو
          </Link>
        </div>
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
    </>
  );
}
