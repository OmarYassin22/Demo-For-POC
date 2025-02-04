import bg from "../../Assets/image/Screenshot_18-1-2025_133036_ssoapp.balady.gov.sa.jpeg"; // Import background image
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import { useFormik } from "formik";
import * as Yup from "yup";
import { Lock, UserCircle2 } from 'lucide-react'; // Add Lucide icons

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

  return (
    <div className="min-h-screen relative" style={{direction: 'rtl'}}>
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt="balady background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  " />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              تسجيل الدخول
            </h2>
            <p className="text-gray-600">
              الدخول الموحد وزارة البلديات والإسكان
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهوية / الاقامة
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <UserCircle2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full pr-10 py-3 text-gray-900 border rounded-lg 
                      focus:ring-2 focus:ring-green-500 ${
                      formik.touched.username && formik.errors.username
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="أدخل رقم الهوية"
                  />
                </div>
                {formik.touched.username && formik.errors.username && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.username}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full pr-10 py-3 text-gray-900 border rounded-lg 
                      focus:ring-2 focus:ring-green-500 ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="أدخل كلمة المرور"
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                )}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
                shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                transition duration-150"
            >
              تسجيل الدخول
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
