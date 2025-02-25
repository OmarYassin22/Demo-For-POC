import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import data from "../../mocks/OfficeMock.json";
import axios from "axios";
import Component from "./Request/Request";
import { Building2, ChevronRight, ChevronLeft, Search, ArrowLeft } from "lucide-react";

export default function Requests() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  });
  const { id } = useParams();
  const [office, setOffice] = useState<any | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;

  //Filter and transform requests


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
      //console.log(response.data.access_token);
   

      localStorage.setItem("Token", response.data.access_token);
      const expiresInSeconds = parseInt(response.data.expires_in, 10); // Convert "17999" to number
      const expirationTime = Date.now() + expiresInSeconds * 1000;
      localStorage.setItem("tokenExpiration", expirationTime.toString());
    } catch (err: any) {
      
    }
  };

  useEffect(() => {
    debugger;
    const expiration = localStorage.getItem("tokenExpiration");
    if (localStorage.getItem('Token')) {

      const expired = expiration ? Date.now() > Number(expiration) : true;
      if (expired) {
        fetchToken();
      }

    }
    if(!localStorage.getItem('Token')){
      fetchToken();
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const url = 'https://apiservicesstg.balady.gov.sa/v1/baladybusiness-services/delegate-requests/search';
    const params = {
      providerId: id,
      serviceId: '62f38b0a96686c87e1dd2850',
      orderBy: 'Descending',
      pageNo: 1,
      pageSize: 10000
    };
    const token=localStorage.getItem('Token');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'loginIdentityType': '1',
      'loginIdentityId': '1000115574',
      'Authorization': 'Bearer '+ token,
       };

    axios.get(url, { params, headers })
      .then(response => {
        console.log(response.data.data.result.items);
        setOffice(response.data.data.result.items);
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });
  }, []);
  const filteredRequests = (office || [])
    .filter(request =>
      !request.number.toLowerCase().includes("dlg") &&
      (
        request.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    console.log(filteredRequests);

  // Pagination logic
  const totalPages = Math.ceil((filteredRequests?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests?.slice(startIndex, startIndex + itemsPerPage);
console.log(paginatedRequests);
  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ direction: "rtl" }}>
      <div className="flex absolute left-10 top-24 justify-end mb-4">
        <button
          onClick={() => { navigate(-1) }}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">العودة</span>
        </button>
      </div>
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
              providerId={id || ''}

              officeId={request.officeId || ''}
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
                className={`w-10 h-10 rounded-lg border ${currentPage === page
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