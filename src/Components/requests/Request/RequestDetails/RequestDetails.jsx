import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, Calendar, Hash, Building2, Check, X } from "lucide-react";
import data from "../../../../mocks/OfficeMock.json";

export default function RequestDetails() {
    const { id, requestid } = useParams();
    const navigate = useNavigate();
    const office = data[id];
    const request = office.requests.find(
        (request) => request.number === requestid
    );
    console.log(request);

  const formattedDate = new Date(request.creationTime).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleAccept = () => {
    request.waitingApproval = true;
    request.result = {
      status: "تم قبول الطلب",
      date: new Date().toISOString()
    };
    console.log(request)

    alert("تم قبول الطلب بنجاح");
  };

  const handleReject = () => {
    const index = office.requests.findIndex(r => r.number === requestid);
    if (index > -1) {
      office.requests.splice(index, 1);
    }
    alert("تم رفض الطلب");
    console.log(request)
    navigate(`/offices/${id}/requests`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ direction: "rtl" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Hash className="w-6 h-6 text-gray-500" />
              <h1 className="text-2xl font-bold text-gray-900">
                طلب رقم: {request.number}
              </h1>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm ${
              request.waitingApproval 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {request.waitingApproval ? 'قيد الانتظار' : 'مكتمل'}
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
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
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
                  <p>{new Date(request.result.date).toLocaleDateString('ar-SA')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}