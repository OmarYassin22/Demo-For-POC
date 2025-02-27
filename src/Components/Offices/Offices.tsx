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
import BackButton from "../common/BackButton";

export default function Offices() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
      // Function to clear local storage


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

  // const offices = Object.entries(data)
  //   .map(([id, office]) => ({
  //     id,
  //     name: office.name,
  //     requestCount: office.requests.length,
  //     activeRequests: office.requests.filter((r) => !r.waitingApproval).length,
  //   }))
  //   .filter((office) =>
  //     office.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const offices = Object.entries(data)
    .map(([id, office]) => {
      // First, filter the requests by excluding the ones that contain "dlg" in their number
      const filteredRequests = office.requests.filter(
        (r) => !r.number.toLowerCase().includes("dlg")
      );
      // alert(office.requests.length);
      // alert(filteredRequests.length);
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
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">العودة</span>
        </button>
      </div>


      {/* <div className="flex absolute left-10 top-24 justify-end mb-4">
        <button
          onClick={() => { navigate(-1) }}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">العودة</span>
        </button>
      </div> */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl font-bold text-primary text-center">
            المكاتب
          </h1>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={
                  "ابحث عن مكتب..."
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedOffices.map((office) => (
            <Link to={`/offices/${office.id}/requests`} key={office.id}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 border border-gray-100" style={{ minHeight: "9rem" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {office.name}
                  </h3>
                </div>

                {/* <div className="flex justify-between text-sm text-gray-600 mt-4">
                  <div>
                    <span className="font-medium">{office.requestCount}</span>{" "}
                    طلب
                  </div>
                  <div>
                    <span className="font-medium">{office.activeRequests}</span>{" "}
                    نشط
                  </div>
                </div> */}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg border ${currentPage === page
                ? "bg-primary text-white"
                : "hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
