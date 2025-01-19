import React from "react";
import { ReactSVG } from 'react-svg';
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import { useFormik } from "formik";
import * as Yup from "yup";

// Define Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .required("رقم الهوية مطلوب")
    // .min(9, "رقم الهوية لايقل عن 9 حروف")
    ,
  password: Yup.string()
    .required("كلمة المرور مطلوبة"),
});

interface FormValues {
  username: string;
  password: string;
}

export default function Login() {
  const correctUsername = "admin"; // Replace with your correct username
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

  return (
    <div className="login-page">
      {/* Left Section with Background Image */}
      <div className="login-page-left">

        <img
          src="../../dist/assets/almltqy-alhndsy-min_0.jpg" // Replace with your image path
          alt="City Background"
          className="background-image"
        />


      </div>

      {/* Right Section with Login Form */}
      <div className="login-page-right">
        <h2 className="login-title">تسجيل الدخول</h2>
        <p className="login-subtitle">الدخول الموحد وزارة البلديات والإسكان</p>

        <div className="form-container">
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
    </div>
  );
}
