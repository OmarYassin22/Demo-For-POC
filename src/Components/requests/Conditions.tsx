import React, { useState, useEffect } from "react";
import axios from "axios";

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

const Conditions: React.FC<ServicesProps> = ({
  isModalOpen,
  setIsModalOpen,
  Amana,
  Baladia,
  Hai,
  Land,
}) => {
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
    setLoading(true);
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) fetchConditions();
  }, [token]);

  if (!isModalOpen) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">الشروط والأحكام</h2>
          <button
            onClick={() => setIsModalOpen(false)}
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

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end gap-4 border-t pt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            إغلاق
          </button>
          <button
            onClick={() => {
              alert("تم بدء الخدمة بنجاح");
              setIsModalOpen(false);
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
