import React, { useEffect, useState } from "react";
import Services from "../Services";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Hash,
  Building2,
  Check,
  X,
  ArrowLeft,
  Menu,
  X as CloseIcon,
} from "lucide-react";
import data from "../../../../mocks/OfficeMock.json";
import Conditions from "../../Conditions";
export default function RequestDetails() {
  const { id, requestid } = useParams();
  const navigate = useNavigate();
  const office = data[id];
  const [request, setRequest] = useState(
    office.requests.find((request) => request.number === requestid)
  );

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const formattedDate = new Date(request.creationTime).toLocaleDateString(
    "ar-SA",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const [isFormTabVisible, setIsFormTabVisible] = useState(!request.waitingApproval);

  const handleAccept = () => {
    const updatedRequest = {
      ...request,
      waitingApproval: false,
      result: {
        status: "تم قبول الطلب",
        date: new Date().toISOString(),
      },
    };
    setRequest(updatedRequest);
    setIsFormTabVisible(true);
    console.log(updatedRequest);
    alert("تم قبول الطلب بنجاح");
  };

  const handleReject = () => {
    const index = office.requests.findIndex((r) => r.number === requestid);
    if (index > -1) {
      office.requests.splice(index, 1);
    }
    alert("تم رفض الطلب");
    console.log(request);
    navigate(`/offices/${id}/requests`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const [activeTab, setActiveTab] = useState("details");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === "form" && request.waitingApproval) {
      alert("يجب قبول الطلب أولاً");
      return;
    }
    setActiveTab(tab);
    setIsSidebarOpen(false); // Collapse the sidebar after choosing a tab
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ direction: "rtl" }}>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 right-0   z-10 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 w-full md:w-1/4 bg-white rounded-lg shadow-lg p-6 mb-4 md:mb-0`}
        >
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleTabChange("details")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "details"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              تفاصيل الطلب
            </button>
            {isFormTabVisible && (
              <button
                onClick={() => handleTabChange("form")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "form"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                خدمات{" "}
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-3/4 md:ml-6 right-0">
          <div className="flex absolute left-10 top-24  justify-end mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">العودة</span>
            </button>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isSidebarOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
            {isSidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
          </button>
          {activeTab === "details" && (
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Hash className="w-6 h-6 text-gray-500" />
                    <h1 className="text-2xl font-bold text-gray-900">
                      طلب رقم: {request.number}
                    </h1>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm ${
                      request.waitingApproval
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {request.waitingApproval ? "قيد الانتظار" : "مكتمل"}
                  </span>
                </div>

                {/* Request Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">صاحب الطلب</p>
                        <p className="font-medium">{request.ownerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">تاريخ الطلب</p>
                        <p className="font-medium">{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">المنصة</p>
                        <p className="font-medium">{request.platformName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">رقم الهوية</p>
                        <p className="font-medium">{request.ownerId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {request.waitingApproval && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">إجراءات الطلب</h2>
                  <div className="flex gap-4">
                    <button
                      onClick={handleAccept}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Check className="w-5 h-5" />
                      قبول الطلب
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                      رفض الطلب
                    </button>
                  </div>
                </div>
              )}

              {/* Result Section */}
              {!request.waitingApproval && request.result && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">نتيجة الطلب</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">الحالة</h3>
                      <p>{request.result.status}</p>
                    </div>
                    {request.result.notes && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">ملاحظات</h3>
                        <p>{request.result.notes}</p>
                      </div>
                    )}
                    {request.result.date && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">تاريخ النتيجة</h3>
                        <p>
                          {new Date(request.result.date).toLocaleDateString(
                            "ar-SA"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "form" && (
            <Services KrookiNumber={request.result?.krokiNo}></Services>
          )}
        </div>
      </div>
      {/* <ConditionsModal /> */}
    </div>
  );
}
