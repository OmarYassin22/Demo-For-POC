import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, UserCircle, Menu, X } from "lucide-react";
import { getConfigValue } from "../../config/clientConfigUtils";

// Get client configuration
const logoSrc = getConfigValue('logo', '../../Assets/image/favicon.ico');

// Using static styles instead of dynamic config values
const BuildingVerificationLogo = ({ isScrolled }: { isScrolled: boolean }) => {
  const appName = getConfigValue('shortName', 'BuildPro');
  const arabicName = getConfigValue('arabicName', 'البناء برو');
  const appTagline = getConfigValue('navbar.tagline', 'تصاميم البناء');

  return (
    <div className="flex items-center gap-4">
      <div className="relative overflow-hidden rounded-full bg-gradient-to-br from-green-100 to-green-50 p-1 shadow-lg transition-all duration-300 hover:shadow-green-200">
        <img
          src={logoSrc}
          alt={`${appName} Logo`}
          className={`h-11 w-11 transform transition-all duration-300 hover:scale-110
            ${isScrolled ? 'bg-gray-200' : ' '}`}
        />
      </div>
      <div className="flex flex-col">
        <span className={`text-xl font-bold leading-tight transition-colors
          ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
          {arabicName}
        </span>
        <span className={`text-sm font-medium transition-all
          ${isScrolled ? 'text-green-600' : 'text-green-300'}`}>
          {appTagline}
        </span>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("visualCategory");
    localStorage.removeItem("visualCategoryStatus");
    localStorage.removeItem("reportType");
    localStorage.removeItem("ComplianceResultData");
    localStorage.removeItem("urn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 transition-all duration-300
          ${isScrolled 
            ? 'bg-white text-green-800 shadow-lg' 
            : 'bg-gradient-to-r from-green-700 to-green-500 text-white'}`}
        dir="rtl"
        style={{ zIndex: 10000 }}
      >
        <Link to={isLoggedIn ? "/offices" : "/"} className="flex items-center group transition-transform duration-300 hover:scale-105">
          <BuildingVerificationLogo isScrolled={isScrolled} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 space-x-reverse">
          {isLoggedIn && (
            <Link
              to="/offices"
              className={`relative text-lg font-medium mx-4 transition-colors after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full
                ${isScrolled ? 'text-gray-900 hover:text-green-700' : 'text-white hover:text-green-100'}`}
            >
              {getConfigValue('navbar.offices', 'المكاتب')}
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 rounded-full bg-opacity-0 px-4 py-2 font-medium transition-all duration-300
                ${isScrolled 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}
            >
              <LogOut className="h-5 w-5" />
              <span>{getConfigValue('navbar.logout', 'تسجيل خروج')}</span>
            </button>
          ) : (
            <Link
              to="/"
              className={`flex items-center gap-2 rounded-full bg-opacity-0 px-4 py-2 font-medium transition-all duration-300
                ${isScrolled 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}
            >
              <UserCircle className="h-5 w-5" />
              <span>{getConfigValue('navbar.login', 'تسجيل دخول')}</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-full transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`fixed top-[72px] left-0 right-0 bg-gray-100 z-[9999] shadow-lg transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        dir="rtl"
      >
        <div className="flex flex-col p-4 space-y-4">
          {isLoggedIn && (
            <Link
              to="/offices"
              className="text-gray-900 text-lg font-medium py-2 px-4 rounded-md hover:bg-green-100 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {getConfigValue('navbar.offices', 'المكاتب')}
            </Link>
          )}
          
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-red-700 py-2 px-4 rounded-md hover:bg-red-100"
            >
              <LogOut className="h-5 w-5" />
              <span>{getConfigValue('navbar.logout', 'تسجيل خروج')}</span>
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2 text-green-700 py-2 px-4 rounded-md hover:bg-green-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserCircle className="h-5 w-5" />
              <span>{getConfigValue('navbar.login', 'تسجيل دخول')}</span>
            </Link>
          )}
        </div>
      </div>
      
      {/* Semi-transparent overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
