import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Component from "./Request/Request";
import { Building2, ChevronRight, ChevronLeft, Search, ArrowLeft, Loader2, FileText } from "lucide-react";
import data from "../../mocks/OfficeMock.json";

export default function Requests() {
  const navigate = useNavigate();
  const location = useLocation();
  const { officeName } = location.state as any;
  const { id } = useParams();
  const [office, setOffice] = useState<any | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [officeDetailsLoaded, setOfficeDetailsLoaded] = useState(false);
  const itemsPerPage = 9;

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
      console.error(err);
    }
  };

  useEffect(() => {
    const expiration = localStorage.getItem("tokenExpiration");
    if (localStorage.getItem("Token")) {
      const expired = expiration ? Date.now() > Number(expiration) : true;
      if (expired) {
        fetchToken();
      }
    }
    if (!localStorage.getItem("Token")) {
      fetchToken();
    }
  }, []);

  const fetchOfficeDetails = async () => {
    if (!id) {
      setOfficeDetailsLoaded(true);
      return Promise.reject("No office ID provided");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        await fetchToken();
      }

      const response = await axios.get(
        `https://apiservicesstg.balady.gov.sa/v1/baladybusiness-services/engineering-offices/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            loginIdentityType: "1",
            loginIdentityId: "1000115574",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      if (response.data && response.data.data) {
        console.log("Office details loaded successfully:", response.data.data);
      }

      setOfficeDetailsLoaded(true);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch office details:", error);
      setOfficeDetailsLoaded(true);
      return Promise.reject(error);
    }
  };

  const fetchOfficeRequests = async () => {
    if (!id) return;

    const url =
      "https://apiservicesstg.balady.gov.sa/v1/baladybusiness-services/delegate-requests/search";
    const params = {
      providerId: id,
      serviceId: "62f38b0a96686c87e1dd2850",
      orderBy: "Descending",
      pageNo: 1,
      pageSize: 10000,
    };
    const token = localStorage.getItem("Token");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      loginIdentityType: "1",
      loginIdentityId: "1000115574",
      Authorization: "Bearer " + token,
    };

    try {
      const response = await axios.get(url, { params, headers });
      const items = response.data.data.result.items;
      console.log(items);
      setOffice(items);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchOfficeDetails();
        await fetchOfficeRequests();
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const filteredRequests = (office || []).filter(
    (request) =>
      !request.number.toLowerCase().includes("dlg") &&
      (request.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(
    (filteredRequests?.length || 0) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full transition-all duration-300 animate-fadeIn">
          <div className="relative mx-auto w-16 h-16 mb-4">
            <Loader2 className="h-16 w-16 animate-spin text-emerald-600" />
            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-pulse opacity-30"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            جاري تحميل البيانات
          </h3>
          <p className="text-gray-500">
            يرجى الانتظار بينما نقوم بتحضير طلباتك
          </p>
          <div className="mt-6 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full animate-loadingBar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8"
      style={{ direction: "rtl" }}
    >
      <div className="max-w-7xl mx-auto mb-6 animate-fadeDown">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-emerald-600 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 group"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">العودة</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <Building2 className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl mb-2 p-2 md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {officeName}
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                  إدارة ومتابعة طلبات المكتب الهندسي
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-64 group">
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="البحث عن طلب..."
                className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">عدد الطلبات:</span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium text-sm">
                {filteredRequests?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 border border-gray-100 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              لا توجد طلبات
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              لم يتم العثور على أي طلبات مطابقة لمعايير البحث، يرجى تغيير
              معايير البحث أو المحاولة لاحقاً
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                إعادة ضبط البحث
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fadeIn">
            {paginatedRequests?.map((request, index) => (
              <div
                key={request.platformRequestId}
                className="transform transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Component
                  data={request}
                  providerId={id || ""}
                  officeId={request.officeId || ""}
                />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 pb-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              aria-label="الصفحة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex space-x-1 rtl:space-x-reverse">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageToShow;
                if (totalPages <= 5) {
                  pageToShow = i + 1;
                } else if (currentPage <= 3) {
                  pageToShow = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageToShow = totalPages - 4 + i;
                } else {
                  pageToShow = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageToShow)}
                    className={`w-10 h-10 rounded-lg border ${
                      currentPage === pageToShow
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "hover:bg-gray-50 border-gray-200"
                    } transition-all duration-200`}
                  >
                    {pageToShow}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              aria-label="الصفحة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}