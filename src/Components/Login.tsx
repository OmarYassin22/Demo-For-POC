import React from "react";

export default function Login() {
  return (
    <div className="login-page">
      {/* Background Image Section */}
      <div className="login-page-left">
        <img
          src="/path/to/your/image.png" // Replace with your image path
          alt="City Background"
          className="background-image"
        />
      </div>

      {/* Login Form Section */}
      <div className="login-page-right">
        <h2 className="login-title">تسجيل الدخول</h2>
        <p className="login-subtitle">الدخول الموحد، وزارة البلديات والإسكان</p>
        <form className="login-form">
          <input
            type="text"
            placeholder="رقم الهوية / الاقامة"
            className="login-input"
          />
          <input
            type="password"
            placeholder="أدخل كلمة المرور هنا"
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
