import React from "react";
import { useApp } from "../../context/AppContext";
import { translations } from "../../translations";
import bg from "../../Assets/image/Screenshot_18-1-2025_133036_ssoapp.balady.gov.sa.jpeg";

export default function Login() {
  const { theme, language, toggleTheme, toggleLanguage } = useApp();
  const t = translations[language];

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className={`login-page  ${
        theme === "dark" ? "dark:bg-gray-900 dark:text-white" : "bg-white"
      }`}
    >
      {/* Background Image Section */}
      <div className="login-page-left">
        <img
          src={bg} 
          alt="balady background"
          className="background-image"
        />
      </div>

      {/* Login Form Section */}
      <div className="login-page-right my-5">
        <h2 className="login-title">{t.login.title}</h2>
        <p className="login-subtitle">{t.login.subtitle}</p>
        <form className="login-form">
          <input type="text" placeholder={t.login.id} className="login-input" />
          <input
            type="password"
            placeholder={t.login.password}
            className="login-input"
          />
          <button type="submit" className="login-button">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
