import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Hash,
  Building2,
  Check,
  X,
  ArrowLeft,
} from "lucide-react";
import data from "../../../../mocks/OfficeMock.json";

export default function RequestDetails() {
  const { id, requestid } = useParams();
  const navigate = useNavigate();
  const office = data[id];
  const request = office.requests.find(
    (request) => request.number === requestid
  );
  console.log(request);

  const formattedDate = new Date(request.creationTime).toLocaleDateString(
    "ar-SA",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleAccept = () => {
    request.waitingApproval = true;
    request.result = {
      status: "تم قبول الطلب",
      date: new Date().toISOString(),
    };
    console.log(request);

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ direction: "rtl" }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleTabChange("details")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "details"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              تفاصيل الطلب
            </button>
            <button
              onClick={() => handleTabChange("form")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "form"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              خدمات{" "}
            </button>
          </div>
        </div>

        <div className="w-3/4 ml-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة
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
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-5 h-5" />
                      قبول الطلب
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                      رفض الطلب
                    </button>
                  </div>
                </div>
              )}

              {/* Result Section */}
              {request.result && (
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
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                رقم القرار : {request.number} , تاريخ القرار: {formattedDate}
              </h2>
              <form>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        رقم القطع:
                      </label>
                      <select
                        id="landslist"
                        className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        {request?.result?.LandsListData?.map((land, index) => (
                          <option key={index} value={land.LandNumber}>
                            {land.LandNumber}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        نوع الاستخدام:{" "}
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        disabled
                        value={request?.result?.MainUsedName || "لا يوجد"}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        عدد النماذج بالقطعه:{" "}
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        disabled
                        value="1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        رقم النموذج:{" "}
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        disabled
                        value="1"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        نوع المبنى:{" "}
                      </label>
                      <input
                        type="text"
                        disabled
                        id="first_name"
                        value={request?.result?.SubUsedName || "لا يوجد"}
                        className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        وصف المبنى:{" "}
                      </label>
                      <textarea
                        id="first_name"
                        className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-2">
                      <label htmlFor="test1">
                        التحقق من المخططات المعمارىة
                      </label>
                      <input type="checkbox" id="test1" name="test1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <label htmlFor="test1">
                        التحقق من المخططات الانشائية
                      </label>
                      <input type="checkbox" id="test1" name="test1" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4  rounded-lg mb-6 pr-20">
                  <div className="grid grid-cols-2 gap-6">
                    <p>بدء الخدمة</p>
                    <button
                      type="submit"
                      className="px-4 py-2 max-w-52 bg-blue-600 text-white rounded-lg"
                    >
                      بدء الخدمة
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
