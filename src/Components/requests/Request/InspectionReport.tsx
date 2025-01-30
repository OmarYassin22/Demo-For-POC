import React from "react";
import { useNavigate } from "react-router-dom"; 
import DataTable from "../../DataTable";

 import jsonData from "../../../mocks/complianceResult.json"; // Import the JSON data




const InspectionReport = () => {


  const navigate = useNavigate();

  const handleViewerClick = () => {
    navigate('/AutodeskResultViewer'); // Replace with the desired route
  };


localStorage.setItem("ComplianceResultData", JSON.stringify(jsonData));
    const data = jsonData.ABDALRAHMA_AL_GHAMDI_rev02.Results;

  const columns = [
    { accessorKey: "Description", header: "الاشتراط" },
    { accessorKey: "Place", header: "مكان الاختبار" },
    { accessorKey: "Result", header: "النتيجة" },
    
    { accessorKey: "Message", header: "السبب" }
  ];

  const handleAction = (id: string) => {
    console.log("Action triggered for ID:", id);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg" dir="rtl">
      {/* Main Title */}
      <div className="bg-blue-900 text-white text-center py-4 rounded-md mb-8 shadow-lg">
        <h2 className="text-2xl font-semibold">تقرير الفحص والمعلومات</h2>
      </div>

      {/* Report Details */}
      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
      <div className="flex flex-wrap gap-6 mt-6">
          
            <p className="font-semibold text-lg text-gray-700">رقم القرار المساحي: 450815034595</p>
          
            <p className="font-semibold text-lg text-gray-700">تاريخ الطلب: 15/08/2024</p>
         
         
        </div>
      </div>

      {/* Main Section: بيانات الطلب */}
      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
        <h3 className="bg-blue-900 text-white text-center py-4 rounded-md w-4/4 mx-auto text-lg font-medium">بيانات الطلب</h3>
      </div>

      {/* Subtitle: بيانات مقدم الطلب */}
      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
        <h3 className="bg-blue-900 text-white text-center py-4 rounded-md w-2/4 mx-auto text-lg font-medium">بيانات مقدم الطلب</h3>
        <div className="flex flex-wrap gap-6 mt-6">
          <p className="font-semibold text-gray-700 text-lg">اسم المالك: زياد محمد صالح المصعبي</p>
          <p className="font-semibold text-gray-700 text-lg">اسم مقدم الطلب: زياد محمد صالح المصعبي</p>
          <p className="font-semibold text-gray-700 text-lg">رقم الهوية: 4535652448</p>
        </div>
      </div>

      {/* Plot Data Section */}
      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
        <h3 className="bg-blue-900 text-white text-center py-4 rounded-md w-2/4 mx-auto text-lg font-medium">بيانات القطعة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <p className="font-semibold text-gray-700 text-lg">رقم القطعة: 11</p>
          <p className="font-semibold text-gray-700 text-lg">رقم النموذج: 1</p>
          <p className="font-semibold text-gray-700 text-lg">نوع المبنى: سكني</p>
          <p className="font-semibold text-gray-700 text-lg">المساحة: 150 متر</p>
        </div>
      </div>

      {/* Plot Location Section */}
      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
        <h3 className="bg-blue-900 text-white text-center py-4 rounded-md w-2/4 mx-auto text-lg font-medium">موقع القطعة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <p className="font-semibold text-gray-700 text-lg">أمانة: 11</p>
          <p className="font-semibold text-gray-700 text-lg">بلدية: 1</p>
          <p className="font-semibold text-gray-700 text-lg">حي: سكني</p>
        </div>
      </div>

      {/* Engineering Office Section */}
      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
        <h3 className="bg-blue-900 text-white text-center py-4 rounded-md w-2/4 mx-auto text-lg font-medium">المكتب الهندسي</h3>
        <div className="mt-6 text-center">
          <p className="font-semibold text-gray-700 text-lg">إسم المكتب: البنيان المعمار للاستشارات الهندسية</p>
        </div>
      </div>

      {/* Requirements List */}
      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
        <h3 className="bg-blue-900 text-white text-center py-4 rounded-md w-4/4 mx-auto text-lg font-medium">قائمة الاشتراطات</h3>
        <div className="overflow-x-auto mt-6">
          <DataTable data={data} columns={columns} onAction={handleAction} />



        </div>
      </div>


      <div className="bg-white p-6 rounded-md shadow-lg mb-8">
        <h3 className="bg-blue-900 text-white text-center py-4 rounded-md w-4/4 mx-auto text-lg font-medium">إحصائيات الفحص</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <p className="font-semibold text-gray-700 text-lg">إجمالي الاشتراطات: {data.length}</p>
          <p className="font-semibold text-gray-700 text-lg">الاشتراطات المطابقة: {data.filter(item => item.Status === true).length}</p>
          <p className="font-semibold text-gray-700 text-lg">الاشتراطات غير المطابقة: {data.filter(item => item.Status === false && item.Result!="أخري").length}</p>
          <p className="font-semibold text-gray-700 text-lg">أخري: {data.filter(item => item.Status === false && item.Result=="أخري").length}</p>
        </div>
      </div>


      <div className="flex items-center justify-center ">
      
      <button  onClick={handleViewerClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700  bg-center">
              عرض الفحص
       </button>
       </div>   </div>
  );
};

export default InspectionReport;
