import bg from "../../Assets/image/Screenshot_18-1-2025_133036_ssoapp.balady.gov.sa.jpeg";
import header from "../../Assets/image/Snipaste_2025-03-02_10-34-41.png";
import React, { useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Lock, UserCircle2, AlertCircle } from 'lucide-react'; // Added AlertCircle icon

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


  useEffect(() => {
    // Check if 'isLoggedIn' is true in localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      // Navigate to the office page if logged in
      navigate('/offices');
    }
  }, [navigate]);

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission: check username and password
      if (values.username === correctUsername && values.password === correctPassword) {


        await fetchToken();
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


  const fetchToken = async () => {
    const url = "https://apiservicesstg.balady.gov.sa/oauth/v1/token";
    const username = "7WVXK2rO9fGn16uIGM7ixGhswAu2uGHd";
    const password = "TCz3GQGRssBq7maT";
    const basicAuth = btoa(`${username}:${password}`);
    try {
      const response = await axios.post(
        url,
        new URLSearchParams({ grant_type: "client_credentials" }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basicAuth}`,
          },
        }
      );
      localStorage.setItem("Token", response.data.access_token);

      const expiresInSeconds = parseInt(response.data.expires_in, 10); // Convert "17999" to number
      const expirationTime = Date.now() + expiresInSeconds * 1000;
      localStorage.setItem("tokenExpiration", expirationTime.toString());




    } catch (err: any) {

    }
  };


  return (
    <div className="min-h-screen relative font-['Tajawal'], sans-serif" style={{ direction: 'rtl' }}>
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt="balady background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Darker overlay for better contrast */}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-8">
        {/* Ministry Logo/Branding */}
        <div className="mb-6 bg-white p-4 rounded-full shadow-lg">
          <img src={header} className="h-16" alt="" />
        </div>

        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 space-y-8 border border-gray-100 transform transition-all hover:scale-[1.01]">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              تسجيل الدخول
            </h2>
            <p className="text-gray-600">
              الدخول الموحد وزارة البلديات والإسكان
            </p>
            <div className="mt-4 border-b-2 border-green-500 w-16 mx-auto"></div> {/* Decorative line */}
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهوية / الاقامة
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-600">
                    <UserCircle2 className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full pr-10 py-3.5 text-gray-900 border rounded-lg 
                      transition-all duration-200 ease-in-out
                      group-hover:border-green-400
                      focus:ring-2 focus:ring-green-500 focus:border-transparent ${formik.touched.username && formik.errors.username
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 bg-gray-50'
                      }`}
                    placeholder="أدخل رقم الهوية"
                  />
                </div>
                {formik.touched.username && formik.errors.username && (
                  <p className="mt-2 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {formik.errors.username}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-600">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`block w-full pr-10 py-3.5 text-gray-900 border rounded-lg 
                      transition-all duration-200 ease-in-out
                      group-hover:border-green-400
                      focus:ring-2 focus:ring-green-500 focus:border-transparent ${formik.touched.password && formik.errors.password
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 bg-gray-50'
                      }`}
                    placeholder="أدخل كلمة المرور"
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-2 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg 
                shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 
                focus:outline-none focus:ring-4 focus:ring-green-500/30
                transition duration-200 transform hover:-translate-y-0.5"
            >
              تسجيل الدخول
            </button>

            {/* Additional help text */}
            <p className="text-center text-xs text-gray-500 mt-4">
              تواجه مشاكل في تسجيل الدخول؟ يرجى التواصل مع الدعم الفني
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-white text-sm text-center">
          © {new Date().getFullYear()} جميع الحقوق محفوظة - وزارة البلديات والإسكان
        </div>
      </div>
    </div>
  );
}
