import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Search,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";
import data from "../../mocks/OfficeMock.json";

export default function Offices() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  });
  
  const clearLocalStorage = () => {
    localStorage.removeItem("reportType");
    localStorage.removeItem("ComplianceResultData");
    localStorage.removeItem("visualCategory");
    localStorage.removeItem("visualCategoryStatus");
    localStorage.removeItem("CondintionsCodeBenaa");
  };
  
  useEffect(() => { clearLocalStorage(); }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const offices = Object.entries(data)
    .map(([id, office]) => {
      // First, filter the requests by excluding the ones that contain "dlg" in their number
      const filteredRequests = office.requests.filter(
        (r) => !r.number.toLowerCase().includes("dlg")
      );
      // Now calculate the counts based on the filtered requests
      const requestCount = filteredRequests.length;
      const activeRequests = filteredRequests.filter(
        (r) => !r.waitingApproval // Filter out requests that are waiting for approval
      ).length;

      return {
        id,
        name: office.name,
        requestCount,
        activeRequests,
        filteredRequests, // Include the filtered requests (after filtering out "dlg" requests)
      };
    })
    .filter((office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter offices based on searchTerm
      && office.filteredRequests.length > 0
    );

  const totalPages = Math.ceil(offices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOffices = offices.slice(startIndex, startIndex + itemsPerPage);
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8" 
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-emerald-600 bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 border border-gray-200 transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">العودة</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-14 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-l from-emerald-600 to-teal-500">
              المكاتب
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              استعرض قائمة المكاتب المتاحة واضغط على أي مكتب للاطلاع على الطلبات الخاصة به
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-200" />
              <input
                type="text"
                placeholder="ابحث عن مكتب..."
                className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:shadow transition-all duration-300 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {paginatedOffices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedOffices.map((office) => (
              <Link to={`/offices/${office.id}/requests`} key={office.id} className="group">
                <div 
                  className="bg-white rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 transform group-hover:-translate-y-1" 
                  style={{ minHeight: "9rem" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-emerald-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                      {office.name}
                    </h3>
                  </div>
                  
                 
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700">لا توجد مكاتب متطابقة</h3>
            <p className="text-gray-500 mt-2">حاول تغيير معايير البحث</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg border transition-all duration-200 ${
                    currentPage === page
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
