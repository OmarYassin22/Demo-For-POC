
import { useApp } from "../../context/AppContext";
import { translations } from "../../translations";
import bg from "../../Assets/image/Screenshot_18-1-2025_133036_ssoapp.balady.gov.sa.jpeg";
import React from "react";
import { ReactSVG } from 'react-svg';
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import { useFormik } from "formik";
import * as Yup from "yup";

// Define Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .required("رقم الهوية مطلوب")
     .min(9, "رقم الهوية لايقل عن 9 حروف")
    ,
  password: Yup.string()
    .required("كلمة المرور مطلوبة"),
});

interface FormValues {
  username: string;
  password: string;
}

export default function Login() {
  const correctUsername = "123123123"; // Replace with your correct username
  const correctPassword = "password123"; // Replace with your correct password

  // State to manage custom error message
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission: check username and password
      if (values.username === correctUsername && values.password === correctPassword) {
        // Save login status in localStorage
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to the offices page
        navigate("/offices");
      } else {
        // Show error message if credentials are incorrect


        setErrorMessage("رقم الهوية أو كلمة المرور غير صحيحه.");

      }
    },
  });


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
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="رقم الهوية / الاقامة"
                className="login-input"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {/* Display validation error for username */}
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">{formik.errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="أدخل كلمة المرور هنا"
                className="login-input"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {/* Display validation error for password */}
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>

            {/* Show custom error message if username or password is incorrect */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button type="submit" className="login-button">
              تسجيل الدخول
            </button>
          </form>
      
      </div>
    </div>
  );
}
