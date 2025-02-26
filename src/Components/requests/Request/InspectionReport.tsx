import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import DataTable from "../../DataTable";
import BackButton from '../../common/BackButton';
import { ArrowLeft, Download, FileText, Grid, CheckCircle2, XCircle, HelpCircle, ClipboardList, BuildingIcon } from "lucide-react";
import ArcReport from "../../ArcReport/ArcReport";
import StrReport from "../../ArcReport/StrReport";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Add this interface for type safety
interface CategoryStatus {
  [key: string]: {
    total: number;
    passed: number;
    conditions: {
      code: string;
      status: boolean;
    }[];
  };
}

const InspectionReport = () => {
  // Access the location state using useLocation
  const location = useLocation();
  const navigate = useNavigate();
  const { officeId, requestId, instructure } = location.state || {};
  const [filteredData, setFilteredData] = useState(null);
  const [visualStatus, setVisualStatus] = useState({});
  const [categoryStatuses, setCategoryStatuses] = useState<CategoryStatus>({});
  const [activeTab, setActiveTab] = useState<'inspection' | 'report'>('inspection');
  const [reportType, setReportType] = useState<'arc' | 'str'>('arc');

  const [reportLoaded, setReportLoaded] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => reportType === 'arc' ? arcReportRef.current : strReportRef.current,
    documentTitle: `${reportType === 'arc' ? 'Architectural' : 'Structural'} Report`,
    onAfterPrint: () => console.log('Printed report successfully!'),
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5cm;
      }
      @media print {
        body {
          padding: 0;
          margin: 0;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
    `,
  });

  useEffect(() => {
    // Load report type from localStorage if available
    const savedReportType = localStorage.getItem("reportType");
    if (savedReportType && (savedReportType === 'arc' || savedReportType === 'str')) {
      setReportType(savedReportType as 'arc' | 'str');
    }

    // Load any other data needed for the report
    const ComplianceResultData = JSON.parse(localStorage.getItem("ComplianceResultData") || "{}");
    const visualCategoryDict = JSON.parse(localStorage.getItem("visualCategory") || "{}");
    const key = Object.keys(ComplianceResultData)[0];
    console.log(visualCategoryDict);
    console.log(ComplianceResultData[key].Results);

    const checkConditions = (category: string) => {
      let passedCount = 0;

      const conditionIds = visualCategoryDict[category] || [];


      ComplianceResultData[key].Results.forEach(condition => {
        if (conditionIds.includes(condition.Code) && condition.Status) {
          passedCount++;
        }
      });

      return passedCount === conditionIds.length;

    };

    // Example usage: Check if conditions for each visual category are passed
    const visualCategories = Object.keys(visualCategoryDict);
    const visualCategoryStatus: { [key: string]: boolean } = {};

    visualCategories.forEach((category) => {
      visualCategoryStatus[category] = checkConditions(category);
    });

    // Store the visual category status in local storage
    localStorage.setItem("visualCategoryStatus", JSON.stringify(visualCategoryStatus));

    console.log("Visual Category Status:", visualCategoryStatus);

    // Add this to existing useEffect:
    const storedVisualStatus = localStorage.getItem("visualCategoryStatus");
    if (storedVisualStatus) {
      setVisualStatus(JSON.parse(storedVisualStatus));
    }

    const CondintionsCodeBenaa = JSON.parse(localStorage.getItem("CondintionsCodeBenaa") || "{}");

    // Group conditions by category and check their status
    const statuses: CategoryStatus = {};

    Object.entries(CondintionsCodeBenaa).forEach(([category, codes]) => {
      const conditionStatuses = (codes as string[]).map(code => ({
        code,
        status: ComplianceResultData[key].Results.find(r => r.Code === code)?.Status || false
      }));

      statuses[category] = {
        total: conditionStatuses.length,
        passed: conditionStatuses.filter(c => c.status).length,
        conditions: conditionStatuses
      };
    });

    setCategoryStatuses(statuses);
  }, []);

  const renderReport = () => {
    if (reportType === 'arc') {
      return <ArcReport ref={arcReportRef} />;
    } else {
      return <StrReport ref={strReportRef} />;
    }
  };

  const handleTabChange = (tab: 'inspection' | 'report') => {
    setActiveTab(tab);
  };

  const storedData = localStorage.getItem('ComplianceResultData');
  const parsedData = JSON.parse(storedData);
  const dynamicKey = Object.keys(parsedData)[0];
  const data = parsedData[dynamicKey]?.Results;

  const handleAction = (id: string) => {
    console.log("Action triggered for ID:", id);
  };


  const handleBackAction = () => {
    navigate(`/offices/${officeId}/request/${requestId}`);
  };
  const reportRef = useRef(null);

  const handleDownloadReport = async () => {
    if (!reportRef.current) {
      console.error("ArcReport is not ready yet!");
      return;
    }


    try {
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const marginLeft = 10;
      const marginTop = 15;
      const contentWidth = pdfWidth - 2 * marginLeft;
      const contentHeight = pdfHeight - 2 * marginTop;

      const sections = reportRef.current.querySelectorAll(".page-section");

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        const canvas = await html2canvas(section, {
          scale: 1.5,
          backgroundColor: "#ffffff",
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.7); // ✅ Use JPEG for smaller file size

        const imgWidth = contentWidth; // ✅ Fit exactly inside margins
        let imgHeight = (canvas.height * imgWidth) / canvas.width; // ✅ Maintain aspect ratio

        if (imgHeight > contentHeight) {
          imgHeight = contentHeight;
        }

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData , "JPEG", marginLeft, marginTop, imgWidth, imgHeight, "", "MEDIUM");
      }
      if (!reportLoaded) {
        pdf.addPage();
        setReportLoaded(true);
        // pdf.addImage(imgData, "JPEG", marginLeft, marginTop, imgWidth, imgHeight, "", "MEDIUM");
      }

      if (localStorage.getItem("reportType") == 'str')
        pdf.save("نتائج الفحص الإنشائى.pdf");
      else
        pdf.save("نتائج الفحص المعمارى.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Add filter handling functions
  const handleFilter = (filterType) => {
    let filtered;
    switch (filterType) {
      case 'matched':
        filtered = data.filter(item => item.Status === true);
        break;
      case 'unmatched':
        filtered = data.filter(item => item.Status === false && item.Result !== "اخري");
        break;
      case 'other':
        filtered = data.filter(item => item.Status !== true && item.Result === "اخري");
        break;
      default:
        filtered = null;
    }
    setFilteredData(filtered);
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
              : result === "اخري"
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}>
            <span className="w-2 h-2 mr-2 rounded-full 
              ${status 
                ? 'bg-green-400' 
                : result === 'اخري'
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


    <div className="flex min-h-screen bg-gray-100" style={{ direction: "rtl" }}>
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">التقارير</h2>
        </div>

        <nav className="mt-5">
          <div
            className={`flex items-center p-3 cursor-pointer transition-colors ${activeTab === 'inspection' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => handleTabChange('inspection')}
          >
            <ClipboardList size={18} className="mr-2" />
            <span className="mr-2">تقرير الفحص</span>
          </div>

          <div
            className={`flex items-center p-3 cursor-pointer transition-colors ${activeTab === 'report' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => handleTabChange('report')}
          >
            <BuildingIcon size={18} className="mr-2" />
            <span className="mr-2">{reportType === 'arc' ? 'التقرير المعماري' : 'التقرير الإنشائي'}</span>
          </div>
        </nav>

        {activeTab === 'report' && (
          <div className="p-4 border-t">
            <button
              className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleDownloadReport}
            >
              <Download size={18} className="ml-2" />
              طباعة التقرير
            </button>
          </div>
        )}

        <div className="p-4 border-t mt-auto">
          <BackButton
            onClick={() => navigate(-1)}
            label="العودة"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'inspection' ? 'نتائج الفحص' : reportType === 'arc' ? 'التقرير المعماري' : 'التقرير الإنشائي'}
          </h1>
        </div>

        {/* Tab Content */}
        {activeTab === 'inspection' ? (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Your existing inspection content */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <h3 className="text-xl font-semibold mb-4">نتائج الفحص</h3>
              {/* Your inspection content here */}
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
                      { label: "الاشتراطات غير المطابقة", value: data.filter(item => item.Status === false && item.Result != "اخري").length },
                      { label: "أخرى", value: data.filter(item => item.Status !== true && item.Result == "اخري").length }
                    ].map((stat, index) => (
                      <div key={index} className={`rounded-lg p-4 ${stat.label === 'الاشتراطات المطابقة' ? 'bg-green-50' :
                        stat.label === 'الاشتراطات غير المطابقة' ? 'bg-red-50' :
                          stat.label === 'أخرى' ? 'bg-yellow-50' : 'bg-gray-100'
                        }`}>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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
                        {/* <span className="w-3 h-3 rounded-full bg-green-400"></span> */}
                        <span
                          className={`text-sm px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-2
                    ${filteredData && filteredData === data.filter(item => item.Status === true)
                              ? 'bg-green-100 text-green-700'
                              : 'hover:bg-green-50 text-gray-600 hover:text-green-600'}`}
                          onClick={() => handleFilter('matched')}
                        >
                          <span>مطابق</span>
                          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-200 text-green-800">
                            {data.filter(item => item.Status === true).length}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <span className="w-3 h-3 rounded-full bg-red-400"></span> */}
                        <span
                          className={`text-sm px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-2
                    ${filteredData && filteredData === data.filter(item => item.Status === false && item.Result !== "اخري")
                              ? 'bg-red-100 text-red-700'
                              : 'hover:bg-red-50 text-gray-600 hover:text-red-600'}`}
                          onClick={() => handleFilter('unmatched')}
                        >
                          <span>غير مطابق</span>
                          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-200 text-red-800">
                            {data.filter(item => item.Status !== true && item.Result !== "اخري").length}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <span className="w-3 h-3 rounded-full bg-yellow-400"></span> */}
                        <span
                          className={`text-sm px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-2
                    ${filteredData && filteredData === data.filter(item => item.Status === false && item.Result === "اخري")
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'hover:bg-yellow-50 text-gray-600 hover:text-yellow-600'}`}
                          onClick={() => handleFilter('other')}
                        >
                          <span>أخرى</span>
                          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-200 text-yellow-800">
                            {data.filter(item => item.Status !== true && item.Result === "اخري").length}
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={() => setFilteredData(null)}
                        className="text-sm px-3 py-1 rounded-full text-gray-500 hover:text-gray-700 
                             hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <span>إظهار الكل</span>
                        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-800">
                          {data.length}
                        </span>
                      </button>

                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
                </div>

                {/* Requirements Table - Full Width */}
                <div className="relative">
                  <div className="max-h-[50vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <DataTable
                          data={filteredData || data}
                          columns={columns}
                          onAction={handleAction}
                          className="[&_thead_th]:bg-gray-50 [&_thead_th]:text-gray-600 
                      [&_thead_th]:font-semibold [&_thead_th]:px-4 [&_thead_th]:py-3
                      [&_tbody_td]:px-4 [&_tbody_td]:py-3
                      [&_tbody_tr:hover]:bg-green-50
                      [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-100 "
                        />
                      </div>
                    </div>
                  </div>

                  {/* Scroll Indicators */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* 3D Viewer - New Row */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative px-6 py-4 bg-white border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">نموذج المبنى</h2>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      3D عرض
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
                </div>

                <div className="p-6">
                  <div className="relative h-[50vh] rounded-lg overflow-hidden shadow-inner bg-white">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 to-white/5 pointer-events-none"></div>
                    <iframe
                      id="viewer-iframe"
                      src="/model.html"
                      // src={url}
                      title="Autodesk Viewer"
                      className="w-full h-full rounded-lg"
                      style={{
                        border: 'none',
                        filter: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))',
                        marginTop: '-69px', // Add this to hide the header
                        height: 'calc(100% + 50px)', // Compensate for the negative margin
                      }}
                      frameBorder="0"
                      scrolling="no"
                    />
                  </div>
                </div>
              </div>

              {/* Category Statuses */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">نتائج التحقق حسب الفئة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(categoryStatuses).map(([category, status]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{category}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${status.passed === status.total
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}>
                          {status.passed === status.total ? 'تحقق' : 'لم يتحقق'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {status.passed} من {status.total} اشتراطات مطابقة
                      </div>
                      <div className="mt-2 space-y-1">
                        {status.conditions.map((condition) => (
                          <div key={condition.code} className="flex items-center gap-2 text-sm">
                            <span className={`w-2 h-2 rounded-full ${condition.status ? 'bg-green-400' : 'bg-red-400'
                              }`}></span>
                            <span>{condition.code}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-1">
            {reportType === 'arc' ? (
              <ArcReport ref={reportRef} />
            ) : (
              <StrReport ref={reportRef} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionReport;