import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";
import logo from "../../Assets/image/favicon.ico"; // Import the logo

const BuildingVerificationLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div className="flex items-center gap-3">
    <img
      src={logo}
      alt="Building Verification Logo"
      className={`h-10 w-10 transition-all duration-300
        ${isScrolled ? 'filter brightness-0' : 'filter brightness-0 invert'}`}
    />
    <div className="flex flex-col">
      <span className={`text-xl font-bold leading-tight transition-colors
        ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
        محرك مراجعة      </span>
      <span className={`text-sm transition-colors
        ${isScrolled ? 'text-green-600' : 'text-green-300'}`}>
        تصاميم البناء
      </span>
    </div>
  </div>
);

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300
        ${isScrolled
          ? 'bg-white text-green-800 shadow-md'
          : 'bg-primary text-white'}`}
      dir="rtl"
    >
      <Link to={isLoggedIn ? "/offices" : "/"} className="flex items-center">
        <BuildingVerificationLogo isScrolled={isScrolled} />
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
            className={`text-xl mx-4 transition-colors
              ${isScrolled ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-gray-200'}`}
          >
            المكاتب
          </Link>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 transition-colors
              ${isScrolled ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-gray-200'}`}
          >
            <LogOut className="h-6 w-6" />
            <span className="text-sm">تسجيل خروج</span>
          </button>
        ) : (
          <Link
            to="/"
            className={`flex items-center gap-2 transition-colors
              ${isScrolled ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-gray-200'}`}
          >
            <UserCircle className="h-6 w-6" />
            <span className="text-sm">تسجيل دخول</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
