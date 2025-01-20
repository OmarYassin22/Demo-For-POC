import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Phone,
  Search,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useApp } from "../../Context/AppContext";
import data from "../../mocks/OfficeMock.json";

export default function Offices() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  });
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const offices = Object.entries(data)
    .map(([id, office]) => ({
      id,
      name: office.name,
      requestCount: office.requests.length,
      activeRequests: office.requests.filter((r) => !r.waitingApproval).length,
    }))
    .filter((office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(offices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOffices = offices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl font-bold text-primary text-center">
            {language === "ar" ? "المكاتب" : "Offices"}
          </h1>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === "ar" ? "ابحث عن مكتب..." : "Search offices..."
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
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {office.name}
                  </h3>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-4">
                  <div>
                    <span className="font-medium">{office.requestCount}</span>{" "}
                    طلب
                  </div>
                  <div>
                    <span className="font-medium">{office.activeRequests}</span>{" "}
                    نشط
                  </div>
                </div>
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
              className={`w-10 h-10 rounded-lg border ${
                currentPage === page
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
