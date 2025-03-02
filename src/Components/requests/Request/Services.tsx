import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jsonData from "../../../mocks/OfficeRequestServices.json";
import { useParams } from 'react-router-dom';
import { Building2, ClipboardList, Map, User, FileText, Loader2, MapPin } from "lucide-react";
// Import our new map component
import PropertyMap from "../../common/PropertyMap";

interface LocationData {
  AmanahCode: string;
  AmanahName: string;
  BaladiyaCode: string;
  BaladiyaName: string;
  IssuerCode: string;
  IssuerName: string;
  DistrictCode: number;
  DistrictName: string;
  PlanNumber: string;
  BlockNumber: string;
  RegionNumber: number | null;
  RegionName: string | null;
  CityNumber: number;
  CityName: string;
}

interface OwnershipData {
  OwnershipDocCode: number;
  OwnershipDocName: string;
  OwnershipDocNumber: string;
  OwnershipDocDate: string;
}

interface EngOfficeData {
  OfficeLicense: string;
  OfficeName: string;
}

interface Attachment {
  KrookiFile: string;
  KrookiCoordFile: string | null;
}

interface LocationBorderLengthDetailWithType {
  length: number;
  typeId: number;
  typeName: string;
}

interface LocationBorder {
  Side: number;
  Boundary: string;
  DeedBoundary: string | null;
  BorderLength: number;
  DeedBorderLength: string | null;
  Truncate: string | null;
  LessReflections: string | null;
  MaxOutcropping: string | null;
  BorderType: number;
  BorderTypeName: string;
  DimensionsType: number;
  DimensionsTypeName: string;
  BorderLengthDetail: string | null;
  BorderLengthDetailWithType: LocationBorderLengthDetailWithType[];
}

interface Coordinate {
  CoordinateNumber: number;
  Longitude: string;
  Latitude: string;
}

interface Land {
  LandNumber: string;
  LandArea: number;
  RealestateID: string | null;
  LandAreaAccordingToScheme: number;
  partNumber: string | null;
}

interface Owner {
  OwnerIdentifierType: number;
  OwnerIdentifierTypeName: string;
  OwnerIdentifier: string;
  OwnerName: string;
}

interface BuildCond {
  BuildingPercentage: number | null;
  MaxBuildingHeight: number | null;
  FloorsNumber: number | null;
  ConstructionFactor: number | null;
}

interface FormDataobj {
  OldLicense: string;
  KrookiNumber: number;
  KrookiHijriIssueDate: string;
  KrookiIssueDate: string;
  PurposeID: number;
  Area: number;
  PurposeName: string;
  Note: string | null;
  MainUsedCode: number;
  MainUsedName: string;
  SubUsedCode: number;
  SubUsedName: string;
  LandType: number;
  LandTypeName: string;
  LandUsed: string | null;
  LandUsedName: string | null;
  HasNeighborhood: boolean;
  IsLandMobtra: boolean;
  IsFawry: boolean;
  SiteType: number;
  SiteTypeName: string;
  LocationData: LocationData;
  OwnershipData: OwnershipData;
  EngOfficeData: EngOfficeData;
  Attachments: Attachment[];
  LocationBordersListData: LocationBorder[];
  CoordinatesListData: Coordinate[];
  LandsListData: Land[];
  OwnersListData: Owner[];
  BuildCondListData: BuildCond;
  UrbanBoundary: string;
  RequestId: number;
}

interface ServicesProps {
  KrookiNumber: number;
  officeId: string;
  requestId: string;
  amanaName?: string;
  baladiaName?: string;
  requestData?: FormDataobj; // Add this prop to receive request data
}

const Services: React.FC<ServicesProps> = ({
  KrookiNumber,
  officeId,
  requestId,
  amanaName,
  baladiaName,
  requestData // Receive request data from parent component
}) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<FormDataobj | undefined>(requestData); // Initialize with requestData prop
  const { id, requestid } = useParams();
  const [loading, setLoading] = useState<boolean>(requestData ? false : true); // Only set loading to true if no requestData
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("1");

  // Form validation schema
  const validationSchema = Yup.object({
    description: Yup.string().required("وصف المبني مطلوب"),
    ComplianceType: Yup.string().required("نوع التحقق مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      ComplianceType: "1",
    },
    validationSchema,
    onSubmit: (values) => {
      navigate(`/conditions/${filteredData?.KrookiNumber}`, {
        state: {
          officeId: officeId,
          requestId: requestId,
          Amana: filteredData?.LocationData.AmanahName || "",
          Baladia: filteredData?.LocationData.BaladiyaName || "",
          Hai: filteredData?.LocationData.DistrictName || "",
          Land: filteredData?.LocationData.PlanNumber || "",
          buildingType:
            filteredData?.SubUsedCode === 26 ||
              filteredData?.SubUsedCode === 699
              ? 1
              : filteredData?.SubUsedCode === 24
                ? 2
                : filteredData?.SubUsedCode === 698
                  ? 8
                  : 1,
          instructure: selectedOption || "1",
          complianceType: selectedOption || "1"
        },
      });
    },
  });

  // Handle change event for radio buttons
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    formik.setFieldValue("ComplianceType", event.target.value);
    // Store the report type in local storage
    const reportType = event.target.value === "1" ? "arc" : "str";
    localStorage.setItem("reportType", reportType);
  };

  // API Functions
  const getToken = async () => {
    try {
      const url = 'https://apiservicesstg.balady.gov.sa/oauth/v1/token';
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic cWVNU0l1UkNhSk9ma0FFZEdoMWhVb1BoSHZGQTVBQ0c6aVNuTmVESnhEdmdKa0tPOQ==',
      };
      const body = new URLSearchParams();
      body.append('grant_type', 'client_credentials');

      const response = await axios.post(url, body.toString(), { headers });
      const token = response.data.access_token;
      setAccessToken(token);
      await fetchOfficeData(token);
    } catch (err) {
      console.error('Error:', err);
      setError("حدث خطأ أثناء جلب رمز الوصول");
      setLoading(false);
    }
  };

  const fetchOfficeData = async (access_token: string) => {
    try {
      const url = `https://apiservicesstg.balady.gov.sa/v1/cad-engine/benaa-office/${requestid}/${id}`;
      const headers = {
        'loginIdentityType': '1',
        'loginIdentityId': '1000115574',
        'Authorization': `Bearer ${access_token}`,
      };

      const response = await fetch(url, { method: 'GET', headers });
      const data = await response.json();
      await getdatabykrooki(access_token, data.data.result.krokiNo);
    } catch (error) {
      console.error('Error:', error);
      setError("حدث خطأ أثناء جلب بيانات المكتب");
      setLoading(false);
    }
  };

  const getdatabykrooki = async (access_token: string, krokiData: string) => {
    try {
      const url = 'https://apiservicesstg.balady.gov.sa/v1/BuildingLicenseInfo/construction-survey-report';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      };
      const body = {
        krokiNumber: krokiData,
        queryMode: 'BY_LICENSE_NUMBER',
      };

      const response = await axios.post(url, body, { headers });
      setFilteredData(response.data.data.result[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError("حدث خطأ أثناء جلب بيانات الكروكي");
      setLoading(false);
    }
  };

  // Use effect to load data only if requestData wasn't passed
  useEffect(() => {
    // If requestData is provided, use it directly
    if (requestData) {
      setFilteredData(requestData);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      // First try to get from mock data
      const filtered = jsonData.filter((item: FormDataobj) => {
        return item.KrookiNumber === KrookiNumber;
      });

      if (filtered.length === 0) {
        setLoading(true);
        await getToken();
      } else {
        setFilteredData(filtered[0]);
        setLoading(false);
      }
    };

    fetchData();
  }, [KrookiNumber, requestData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-4 text-lg font-medium text-gray-700">جاري تحميل البيانات...</p>
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
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
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
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-t-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white">تفاصيل الطلب</h1>
        <p className="text-emerald-50 mt-1">رقم القرار: {filteredData?.KrookiNumber}</p>
      </div>

      {/* Municipality Information Section - Enhanced with more location data */}
      <div className="bg-white rounded-b-lg shadow-lg p-6 mb-6 border-t-4 border-emerald-500">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <Building2 className="w-5 h-5 text-emerald-600 mr-2" />
          معلومات البلدية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
              <Map className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">الأمانة</p>
              <p className="font-medium text-gray-900">{amanaName || filteredData?.LocationData?.AmanahName || "غير متوفر"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">البلدية</p>
              <p className="font-medium text-gray-900">{baladiaName || filteredData?.LocationData?.BaladiyaName || "غير متوفر"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">الحي</p>
              <p className="font-medium text-gray-900">{filteredData?.LocationData?.DistrictName || "غير متوفر"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
              <Map className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">رقم المخطط</p>
              <p className="font-medium text-gray-900">{filteredData?.LocationData?.PlanNumber || "غير متوفر"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section - Updated to use PropertyMap */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <Map className="w-5 h-5 text-emerald-600 mr-2" />
          خريطة الموقع
        </h2>

        <div className="h-96 rounded-lg overflow-hidden border border-gray-300 mb-4 z-0">
          {/* React Leaflet Map with building type information */}
          <PropertyMap
            coordinates={filteredData?.CoordinatesListData || []}
            height="100%"
            buildingType={
              filteredData?.SubUsedCode === 26 ? "residential" :
                filteredData?.SubUsedCode === 24 ? "commercial" :
                  filteredData?.SubUsedCode === 698 ? "industrial" :
                    filteredData?.SubUsedCode === 699 ? "school" :
                      "residential"
            }
          />
        </div>

        {/* Coordinates Table */}
        {filteredData?.CoordinatesListData && filteredData.CoordinatesListData.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">إحداثيات الموقع</h3>
            <table className="w-full text-sm text-right text-gray-700">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">رقم النقطة</th>
                  <th scope="col" className="px-6 py-3">خط الطول</th>
                  <th scope="col" className="px-6 py-3">خط العرض</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.CoordinatesListData.map((coord, index) => (
                  <tr key={`coord-${index}`} className="bg-white border-b">
                    <td className="px-6 py-3">{coord.CoordinateNumber}</td>
                    <td className="px-6 py-3">{coord.Longitude}</td>
                    <td className="px-6 py-3">{coord.Latitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
           
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            لا توجد بيانات إحداثيات متاحة
          </div>
        )}
      </div>

      {/* Request Details and Form */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Request Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <ClipboardList className="w-5 h-5 text-emerald-600 mr-2" />
            تفاصيل الطلب
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              رقم القرار: {filteredData?.KrookiNumber}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              تاريخ القرار: {filteredData?.KrookiIssueDate}
            </span>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6">
          {/* Property Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 border-r-4 border-emerald-500 pr-3">معلومات العقار</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم القطعة
                </label>
                <input
                  type="text"
                  name="PlanNumber"
                  value={filteredData?.LocationData.PlanNumber}
                  className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نوع الاستخدام
                </label>
                <input
                  type="text"
                  id="MainUsedName"
                  name="MainUsedName"
                  value={filteredData?.MainUsedName}
                  className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عدد النماذج بالقطعة
                </label>
                <input
                  type="text"
                  name="receivedPieces"
                  value={1}
                  className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم النموذج
                </label>
                <input
                  type="text"
                  name="remainingPieces"
                  value={1}
                  className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                  disabled
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع النموذج
              </label>
              <input
                id="SubUsedName"
                name="SubUsedName"
                value={filteredData?.SubUsedName}
                className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                disabled
              />
            </div>
          </div>

          {/* Building Description Section */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 border-r-4 border-emerald-500 pr-3">وصف المبنى</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وصف المبنى
              </label>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                placeholder="أدخل وصف المبني هنا..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                className={`block w-full py-3 px-4 text-gray-900 border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Compliance Type Section */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 border-r-4 border-emerald-500 pr-3">نوع التحقق</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer">
                <input
                  type="radio"
                  id="test1"
                  name="ComplianceType"
                  value="1"
                  required
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="test1" className="text-gray-700 cursor-pointer flex-1">
                  التحقق من المخططات المعمارية
                </label>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer">
                <input
                  type="radio"
                  id="test2"
                  name="ComplianceType"
                  value="2"
                  required
                  checked={selectedOption === "2"}
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="test2" className="text-gray-700 cursor-pointer flex-1">
                  التحقق من المخططات الإنشائية
                </label>
              </div>
            </div>
            {formik.touched.ComplianceType && formik.errors.ComplianceType && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.ComplianceType}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center min-w-[150px] gap-2"
            >
              <FileText className="w-5 h-5" />
              بدء الخدمة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Services;
