import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

interface ServicesProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  Amana: string;
  Baladia: string;
  Hai: string;
  Land: string;
}

interface Condition {
  code: string;
  description: string;
  place: string;
  visualCategory?: string;
}

interface ConditionsResponse {
  conditions: Condition[];
}

const Conditions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Location state:", location.state);
  }, [location]);

  const { Amana = "", Baladia = "", Hai = "", Land = "" } = location.state || {};
  
  const [conditionsData, setConditionsData] = useState<ConditionsResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch Token
  const fetchToken = async () => {
    const url = "https://apiservicesstg.balady.gov.sa/oauth/v1/token";
    const username = "7WVXK2rO9fGn16uIGM7ixGhswAu2uGHd";
    const password = "TCz3GQGRssBq7maT";
    const basicAuth = btoa(`${username}:${password}`);
console.log(Amana +" "+Baladia +" "+Hai+" "+Land);
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
      console.log(response.data.access_token);
      setToken(response.data.access_token);
    } catch (err: any) {
      setError("Unable to fetch token. Please try again.");
      setLoading(false);
    }
  };

  // Fetch Conditions
  const fetchConditions = async () => {
    if (!token) return;

    const url =
      "https://apiservicesstg.balady.gov.sa/v1/benaa-services/internal/api/conditions/by-areaName";

    try {
      const response = await axios.get<ConditionsResponse>(url, {
        params: {
          AmanaName: Amana,
          areaParentOfParentName: Baladia,
          areaParentName: Hai,
          areaName: Land,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });
      setConditionsData(response.data.data.result);
      setError(null);
    } catch (err: any) {
      setError("Unable to fetch conditions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location.state) {
      console.error("No state data received");
      return;
    }
    setLoading(true);
    fetchToken();
  }, [location.state]);

  useEffect(() => {
    if (token) fetchConditions();
  }, [token]);

  const handleClose = () => {
    navigate(-1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = conditionsData?.conditions?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log("currentItems");
  console.log(conditionsData);
  console.log(currentItems);
  const totalPages = Math.ceil(
    (conditionsData?.conditions?.length || 0) / itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-4" style={{direction:"rtl"}}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">الشروط </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Conditions List */}
        <div className="space-y-4">
          {currentItems?.map((condition, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">كود {condition.code}</h3>
                <span className="text-sm text-gray-500">{condition.place}</span>
              </div>
              <p className="text-gray-700 mb-2">{condition.description}</p>
              {condition.visualCategory && (
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {condition.visualCategory}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-2 border-t pt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            السابق
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            التالي
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-4 border-t pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            إغلاق
          </button>
          <button
            onClick={() => {
              alert("تم بدء الخدمة بنجاح");
              handleClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            بدء الخدمة
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conditions;
