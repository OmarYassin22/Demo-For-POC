import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import DataTable from "../../DataTable";
import BackButton from '../../common/BackButton';
import {
  ArrowLeft,
  FileText,
  Grid,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ClipboardList,
  BuildingIcon,
  Calendar,
  Map,
  MapPin,
  FileBarChart2,
  Printer,
  Filter,
  Layers,
  Loader2,
  AlertCircle,
  User
} from "lucide-react";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { id, requestid } = useParams();
  const { officeId, requestId, instructure } = location.state || {};
  const [filteredData, setFilteredData] = useState(null);
  const [visualStatus, setVisualStatus] = useState({});
  const [categoryStatuses, setCategoryStatuses] = useState<CategoryStatus>({});
  const [activeTab, setActiveTab] = useState<'inspection' | 'report'>('inspection');
  const [reportType, setReportType] = useState<'arc' | 'str'>('arc');
  const [reportLoaded, setReportLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requetData, setRequestData] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load report type from localStorage if available
        const savedReportType = localStorage.getItem("reportType");
        if (savedReportType && (savedReportType === 'arc' || savedReportType === 'str')) {
          setReportType(savedReportType as 'arc' | 'str');
        }

        // Simulate data loading - in a real app, you would fetch this from an API
        await new Promise(resolve => setTimeout(resolve, 800));

        // Load any other data needed for the report
        const ComplianceResultData = JSON.parse(localStorage.getItem("ComplianceResultData") || "{}");
        const visualCategoryDict = JSON.parse(localStorage.getItem("visualCategory") || "{}");

        const key = Object.keys(ComplianceResultData)[0];
        if (!key) {
          throw new Error("No compliance data found");
        }

        // Process the data
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
        setVisualStatus(visualCategoryStatus);

        // Process categories and conditions
        const CondintionsCodeBenaa = JSON.parse(localStorage.getItem("CondintionsCodeBenaa") || "{}");
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
        setLoading(false);
      } catch (error) {
        console.error("Error loading report data:", error);
        setError("حدث خطأ في تحميل بيانات التقرير");
        setLoading(false);
      }
    };

    loadData();
    setRequestData(JSON.parse(localStorage.getItem("inspectionReportData")));

  }, []);

  const handleTabChange = (tab: 'inspection' | 'report') => {
    setActiveTab(tab);
  };

  useEffect(() => {

    // console.log(requetData.OwnersListData[0].OwnerName);
  }, [requetData]);
  // Get data from localStorage - if this were a real app, you'd fetch from an API
  const storedData = localStorage.getItem('ComplianceResultData');
  const parsedData = storedData ? JSON.parse(storedData) : { Results: [] };
  const dynamicKey = Object.keys(parsedData)[0];
  const data = dynamicKey ? parsedData[dynamicKey]?.Results : [];

  const handleBackAction = () => {
    navigate(`/offices/${id || officeId}/request/${requestid || requestId}`);
  };

  const reportRef = useRef(null);

  const handleDownloadReport = async () => {
    if (!reportRef.current) {
      console.error("Report is not ready yet!");
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

        const imgData = canvas.toDataURL("image/jpeg", 0.7);

        const imgWidth = contentWidth;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > contentHeight) {
          imgHeight = contentHeight;
        }

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "JPEG", marginLeft, marginTop, imgWidth, imgHeight, "", "MEDIUM");
      }

      if (!reportLoaded) {
        pdf.addPage();
        setReportLoaded(true);
      }

      if (reportType === 'str')
        pdf.save("نتائج الفحص الإنشائى.pdf");
      else
        pdf.save("نتائج الفحص المعمارى.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Filter handling functions
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

  // Table columns configuration with status indicators
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
          <MapPin className="w-4 h-4 text-gray-400" />
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
            <span className={`w-2 h-2 mr-2 rounded-full 
              ${status
                ? 'bg-green-400'
                : result === 'اخري'
                  ? 'bg-yellow-400'
                  : 'bg-red-400'
              }`}></span>
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
  const handleBack = () => {
    navigate(-1);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-4 text-lg font-medium text-gray-700">جاري تحميل التقرير...</p>
          <p className="text-sm text-gray-500 mt-2">يرجى الانتظار قليلاً</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="inline-flex h-14 w-14 rounded-full bg-red-100 p-4 mx-auto">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-800">حدث خطأ</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50" style={{ direction: "rtl" }}>
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md rounded-lg mt-4 ml-4 mb-4 sticky top-4 h-fit">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 border-r-4 border-emerald-500 pr-3">التقارير</h2>
        </div>

        <nav className="p-2">
          <div
            className={`flex items-center p-3 mb-2 cursor-pointer rounded-lg transition-colors ${activeTab === 'inspection'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => handleTabChange('inspection')}
          >
            <ClipboardList size={18} className="ml-2" />
            <span>نتائج الفحص</span>
          </div>

          <div
            className={`flex items-center p-3 mb-2 cursor-pointer rounded-lg transition-colors ${activeTab === 'report'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => handleTabChange('report')}
          >
            <FileBarChart2 size={18} className="ml-2" />
            <span></span>
            {reportType === 'arc' ? 'التقرير المعماري' : 'التقرير الإنشائي'}

          </div>
        </nav>

        {activeTab === 'report' && (
          <div className="p-4 border-t border-gray-100">
            <button
              className="w-full flex items-center justify-center py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              onClick={handleDownloadReport}
            >
              <Printer size={18} className="ml-2" />
              طباعة التقرير
            </button>
          </div>
        )}

        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">العودة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {activeTab === 'inspection' ? (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-t-lg p-6 shadow-lg">
              <h1 className="text-2xl font-bold text-white">تقرير الفحص</h1>
              <p className="text-emerald-50 mt-1">نتائج التحقق من المخططات</p>
            </div>

            {/* Report Summary Card */}
            <div className="bg-white rounded-b-lg shadow-lg p-6 border-t-4 border-emerald-500">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم القرار المساحي</p>
                    <p className="font-semibold text-gray-900">450815034595</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تاريخ الطلب</p>
                    <p className="font-semibold text-gray-900">15/08/2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicant Information */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative px-6 py-4 bg-white border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-emerald-500 pr-3">بيانات مقدم الطلب</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {requetData && [
                    {
                      label: "اسم المالك",
                      value: requetData.OwnersListData?.[0]?.OwnerName || "غير متوفر",
                      icon: <User className="w-5 h-5 text-emerald-600" />
                    },
                    {
                      label: "اسم مقدم الطلب",
                      value: requetData.EngOfficeData.OfficeName || "غير متوفر",
                      icon: <User className="w-5 h-5 text-emerald-600" />
                    },
                    {
                      label: "رقم الهوية",
                      value: requetData.KrookiNumber || requetData.OwnersListData?.[0]?.IdentityNumber || "غير متوفر",
                      icon: <FileText className="w-5 h-5 text-emerald-600" />
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                      <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="font-semibold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Plot Information */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative px-6 py-4 bg-white border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-emerald-500 pr-3">بيانات القطعة</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {requetData && [
                  { 
                    label: "رقم القطعة", 
                      value: requetData.LocationData.PlanNumber || "غير متوفر", 
                    icon: <Map className="w-5 h-5 text-emerald-600" /> 
                  },
                  { 
                    label: "رقم النموذج", 
                    value: requetData.LocationData.DistrictCode || requetData.ModelNumber || "1", 
                    icon: <Grid className="w-5 h-5 text-emerald-600" /> 
                  },
                  { 
                    label: "نوع المبنى", 
                    value: requetData.SubUsedName || "سكني", 
                    icon: <BuildingIcon className="w-5 h-5 text-emerald-600" /> 
                  },
                  { 
                    label: "المساحة", 
                    value: (requetData.Area ? `${requetData.Area} متر مربع` : "غير متوفر"), 
                    icon: <Layers className="w-5 h-5 text-emerald-600" /> 
                  },
                  ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
                    {item.icon}
                    </div>
                    <div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative px-6 py-4 bg-white border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-emerald-500 pr-3">إحصائيات الفحص</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    {
                      label: "إجمالي الاشتراطات",
                      value: data?.length || 0,
                      bgColor: "bg-gray-50",
                      textColor: "text-gray-800",
                      icon: <ClipboardList className="w-6 h-6 text-gray-600" />
                    },
                    {
                      label: "الاشتراطات المطابقة",
                      value: data?.filter(item => item.Status === true).length || 0,
                      bgColor: "bg-green-50",
                      textColor: "text-green-800",
                      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />
                    },
                    {
                      label: "الاشتراطات غير المطابقة",
                      value: data?.filter(item => item.Status === false && item.Result !== "اخري").length || 0,
                      bgColor: "bg-red-50",
                      textColor: "text-red-800",
                      icon: <XCircle className="w-6 h-6 text-red-600" />
                    },
                    {
                      label: "أخرى",
                      value: data?.filter(item => item.Status !== true && item.Result === "اخري").length || 0,
                      bgColor: "bg-yellow-50",
                      textColor: "text-yellow-800",
                      icon: <HelpCircle className="w-6 h-6 text-yellow-600" />
                    }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`${stat.bgColor} rounded-lg p-4 shadow-sm border border-gray-100`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        {stat.icon}
                      </div>
                      <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements Results */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative px-6 py-4 bg-white border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-emerald-500 pr-3">نتائج فحص الاشتراطات</h2>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-500">فلترة:</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`text-sm px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-2
                      ${filteredData && filteredData === data?.filter(item => item.Status === true)
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-green-200 hover:bg-green-50 hover:text-green-600'}`}
                    onClick={() => handleFilter('matched')}
                  >
                    <span>مطابق</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-200 text-green-800">
                      {data?.filter(item => item.Status === true).length || 0}
                    </span>
                  </span>

                  <span
                    className={`text-sm px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-2
                      ${filteredData && filteredData === data?.filter(item => item.Status === false && item.Result !== "اخري")
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600'}`}
                    onClick={() => handleFilter('unmatched')}
                  >
                    <span>غير مطابق</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-200 text-red-800">
                      {data?.filter(item => item.Status !== true && item.Result !== "اخري").length || 0}
                    </span>
                  </span>

                  <span
                    className={`text-sm px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-2
                      ${filteredData && filteredData === data?.filter(item => item.Status === false && item.Result === "اخري")
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600'}`}
                    onClick={() => handleFilter('other')}
                  >
                    <span>أخرى</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-200 text-yellow-800">
                      {data?.filter(item => item.Status !== true && item.Result === "اخري").length || 0}
                    </span>
                  </span>

                  <button
                    onClick={() => setFilteredData(null)}
                    className="text-sm px-3 py-1 rounded-full text-gray-700 bg-white border border-gray-200
                      hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <span>إظهار الكل</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-800">
                      {data?.length || 0}
                    </span>
                  </button>
                </div>
              </div>

              {/* Requirements Table */}
              <div className="p-6">
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="max-h-[500px] overflow-auto">
                    <DataTable
                      data={filteredData || data || []}
                      columns={columns}
                      onAction={() => { }}
                      className="[&_thead_th]:bg-gray-50 [&_thead_th]:text-gray-600 
                        [&_thead_th]:font-semibold [&_thead_th]:px-4 [&_thead_th]:py-3
                        [&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-10
                        [&_tbody_td]:px-4 [&_tbody_td]:py-3
                        [&_tbody_tr:hover]:bg-green-50
                        [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-100"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* 3D Viewer */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden"></div>
            <div className="relative px-6 py-4 bg-white border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-emerald-500 pr-3">نموذج المبنى</h2>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                  عرض 3D
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="relative h-[50vh] rounded-lg overflow-hidden shadow-inner bg-white border border-gray-200">
                <iframe
                  id="viewer-iframe"
                  src="/model.html"
                  title="Autodesk Viewer"
                  className="w-full h-full rounded-lg"
                  style={{
                    border: 'none',
                    filter: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))',
                    marginTop: '-69px',
                    height: 'calc(100% + 50px)',
                  }}
                  frameBorder="0"
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
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