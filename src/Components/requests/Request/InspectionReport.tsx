import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import DataTable from "../../DataTable";

//  import jsonData from "../../../mocks/complianceResult.json"; // Import the JSON data

const InspectionReport = () => {
  const navigate = useNavigate();

  const storedData = localStorage.getItem('ComplianceResultData');
  console.log(storedData);
  const parsedData = JSON.parse(storedData);
  console.log('Parsed Data:', parsedData);
  const dynamicKey = Object.keys(parsedData)[0];
  const data = parsedData[dynamicKey]?.Results;
  console.log(data);

  const handleAction = (id: string) => {
    console.log("Action triggered for ID:", id);
  };

  // Add new columns configuration with status indicators
  const columns = [
    { 
      accessorKey: "Description", 
      header: "الاشتراط",
      cell: (props: any) => (
        <div className="py-2">
          <p className="text-gray-900 font-medium">{props.getValue()}</p>
        </div>
      )
    },
    { 
      accessorKey: "Place", 
      header: "مكان الاختبار",
      cell: (props: any) => (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{props.getValue()}</span>
        </div>
      )
    },
    { 
      accessorKey: "Result", 
      header: "النتيجة",
      cell: (props: any) => {
        const status = props.row.original.Status;
        const result = props.getValue();
        return (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm
            ${status 
              ? 'bg-green-100 text-green-700' 
              : result === "أخري"
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}>
            <span className="w-2 h-2 mr-2 rounded-full 
              ${status 
                ? 'bg-green-400' 
                : result === 'أخري'
                  ? 'bg-yellow-400'
                  : 'bg-red-400'
              }"></span>
            {result}
          </div>
        );
      }
    },
    { 
      accessorKey: "Message", 
      header: "السبب",
      cell: (props: any) => (
        <div className="max-w-md">
          <p className="text-gray-600 text-sm line-clamp-2">{props.getValue()}</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto space-y-6"> {/* Increased max-width for better split view */}
        {/* Main Title */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative px-6 py-4 bg-white border-b">
            <h1 className="text-2xl font-bold text-gray-800">تقرير الفحص والمعلومات</h1>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
          </div>
        </div>

        {/* Report Summary Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">رقم القرار المساحي</p>
                <p className="font-semibold text-gray-900">450815034595</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">تاريخ الطلب</p>
                <p className="font-semibold text-gray-900">15/08/2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applicant Information */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative px-6 py-4 bg-white border-b">
            <h2 className="text-xl font-semibold text-gray-800">بيانات مقدم الطلب</h2>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">اسم المالك</span>
                <span className="mt-1 font-semibold text-gray-900">زياد محمد صالح المصعبي</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">اسم مقدم الطلب</span>
                <span className="mt-1 font-semibold text-gray-900">زياد محمد صالح المصعبي</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">رقم الهوية</span>
                <span className="mt-1 font-semibold text-gray-900">4535652448</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plot Information */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative px-6 py-4 bg-white border-b">
            <h2 className="text-xl font-semibold text-gray-800">بيانات القطعة</h2>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "رقم القطعة", value: "11" },
                { label: "رقم النموذج", value: "1" },
                { label: "نوع المبنى", value: "سكني" },
                { label: "المساحة", value: "150 متر" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="mt-1 font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requirements Results - Updated Design */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative px-6 py-4 bg-white border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">نتائج فحص الاشتراطات</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  <span className="text-sm text-gray-600">مطابق</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="text-sm text-gray-600">غير مطابق</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="text-sm text-gray-600">أخرى</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-gray-200">
            {/* Autodesk Viewer - Enhanced Design */}
            <div className="relative bg-gray-50 h-[70vh] p-3">
              {/* Viewer Header */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white to-transparent p-3 z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">نموذج المبنى</h3>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    3D عرض
                  </span>
                </div>
              </div>

              {/* Viewer Container */}
              <div className="relative h-full rounded-lg overflow-hidden shadow-inner bg-white">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 to-white/5 pointer-events-none"></div>
                <iframe 
                  id="viewer-iframe"
                  src=".././src/index.html" 
                  title="Autodesk Viewer" 
                  className="w-full h-full rounded-lg"
                  style={{ 
                    border: 'none',
                    filter: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))',
                  }}
                />
              </div>

              {/* Removed bottom controls since fullscreen is now in header */}
            </div>

            {/* Requirements Table */}
            <div className="relative">
              <div className="max-h-[70vh] overflow-y-auto">
                <div className="p-6">
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <DataTable 
                      data={data} 
                      columns={columns} 
                      onAction={handleAction}
                      className="[&_thead_th]:bg-gray-50 [&_thead_th]:text-gray-600 
                        [&_thead_th]:font-semibold [&_thead_th]:px-4 [&_thead_th]:py-3
                        [&_tbody_td]:px-4 [&_tbody_td]:py-3
                        [&_tbody_tr:hover]:bg-green-50
                        [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-100"
                    />
                  </div>
                </div>
              </div>
              
              {/* Scroll Indicators */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative px-6 py-4 bg-white border-b">
            <h2 className="text-xl font-semibold text-gray-800">إحصائيات الفحص</h2>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "إجمالي الاشتراطات", value: data.length },
                { label: "الاشتراطات المطابقة", value: data.filter(item => item.Status === true).length },
                { label: "الاشتراطات غير المطابقة", value: data.filter(item => item.Status === false && item.Result!="أخري").length },
                { label: "أخرى", value: data.filter(item => item.Status === false && item.Result=="أخري").length }
              ].map((stat, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionReport;
