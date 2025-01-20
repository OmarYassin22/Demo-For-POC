import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../mocks/OfficeMock.json";
import Component from "./Request/Request";
import { Building2, ChevronRight, ChevronLeft, Search } from "lucide-react";

export default function Requests() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  });
  const { id } = useParams();
  const office = data[id];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;

  // Filter and transform requests
  const filteredRequests = office?.requests
    .filter(request => 
      request.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination logic
  const totalPages = Math.ceil((filteredRequests?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {office?.name}
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">عدد الطلبات:</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {filteredRequests?.length || 0}
              </span>
            </div>
            <div className="relative w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن طلب..."
                className="w-full pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedRequests?.map((request) => (
            <Component 
              key={request.platformRequestId} 
              data={request} 
              officeId={id} 
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}