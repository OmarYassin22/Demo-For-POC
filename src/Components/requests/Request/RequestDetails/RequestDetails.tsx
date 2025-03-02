import React, { useEffect, useState } from "react";
import axios from "axios";
import Services from "../Services";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  Map,
  Loader2,
  AlertCircle,
  FileText
} from "lucide-react";


interface StatusDetail {
  code: number;
  message: string;
}

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
  RegionNumber?: number | null;
  RegionName?: string | null;
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
  KrookiCoordFile?: string | null;
}

interface LocationBorder {
  Side: number;
  Boundary: string;
  BorderLength: number;
  DimensionsType: number;
  DimensionsTypeName: string;
  BorderLengthDetailWithType: { length: number; typeId: number; typeName: string }[];
}

interface Coordinate {
  CoordinateNumber: number;
  Longitude: string;
  Latitude: string;
}

interface Land {
  LandNumber: string;
  LandArea: number;
  RealestateID?: string | null;
  LandAreaAccordingToScheme: number;
  partNumber?: string | null;
}

interface Owner {
  OwnerIdentifierType: number;
  OwnerIdentifierTypeName: string;
  OwnerIdentifier: string;
  OwnerName: string;
}

interface BuildConditions {
  BuildingPercentage?: number | null;
  MaxBuildingHeight?: number | null;
  FloorsNumber?: number | null;
  ConstructionFactor?: number | null;
}

interface ResultData {
  OldLicense: string;
  KrookiNumber: number;
  KrookiHijriIssueDate: string;
  KrookiIssueDate: string;
  PurposeID: number;
  Note: string;
  Area: number;
  PurposeName: string;
  MainUsedCode: number;
  MainUsedName: string;
  SubUsedCode: number;
  SubUsedName: string;
  LandType: number;
  LandTypeName: string;
  LandUsed: number;
  LandUsedName: string;
  HasNeighborhood: boolean;
  IsLandMobtra: boolean;
  IsFawry: boolean;
  LocationData: LocationData;
  OwnershipData: OwnershipData;
  EngOfficeData: EngOfficeData;
  Attachments: Attachment[];
  LocationBordersListData: LocationBorder[];
  CoordinatesListData: Coordinate[];
  LandsListData: Land[];
  OwnersListData: Owner[];
  BuildCondListData: BuildConditions;
  RequestId: number;
}

interface SurveyReportResponse {
  statusDetails: StatusDetail[];
  data: {
    responseCode: number;
    responseMessage: string;
    result: ResultData[];
  };
}
interface Result {
  requestNumber: number;
  requestDate: string;
  requesterId: string | null;
  requesterName: string;
  amanaId: number;
  amanaName: string;
  baladiaId: number;
  baladiaName: string;
  krokiNo: number;
}

interface Data {
  responseCode: string;
  responseMessage: string;
  responseId: string;
  result: Result;
}

export interface RequestData {
  statusDetails: StatusDetail;
  data: Data;
}


//import data from "../../../../mocks/OfficeMock.json";
//import Conditions from "../../Conditions";
export default function RequestDetails() {
  const location = useLocation();
  const { waitingApproval, ownerId, platformName, officeId } = location.state || {}; // Fallback if state is missing

  const { id, requestid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [request, setRequest] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestBasic, setRequestBasic] = useState<Result | null>(null);

  // Fetch Token
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
      localStorage.setItem("Token", response.data.access_token);
      const expiresInSeconds = parseInt(response.data.expires_in, 10); // Convert "17999" to number
      const expirationTime = Date.now() + expiresInSeconds * 1000;
      localStorage.setItem("tokenExpiration", expirationTime.toString());
    } catch (err: any) {
      console.log("Unable to fetch token. Please try again.");
      setError("فشل في الحصول على رمز الوصول");
    }
  };

  // Fetch Office Data
  const fetchOfficeData = async (officeId: string, providerId: string): Promise<RequestData> => {
    const url = `https://apiservicesstg.balady.gov.sa/v1/cad-engine/benaa-office/${providerId}/${officeId}`;

    const token = localStorage.getItem("Token") || ""; // Prevent "Bearer null" issue

    const headers = {
      loginIdentityType: "1",
      loginIdentityId: "1000115574",
      Authorization: `Bearer ${token}`,
    };
     try {
      
      const response = await axios.get<{ result: RequestData }>(url, { headers });
      
      console.log(response.data); // Ensure it correctly extracts `result`
      setRequestBasic(response.data.data.result);

      ;

      await fetchSurveyReport(response.data.data.result.krokiNo);


    } catch (error: any) {
      console.error("Error fetching office data:", error.response?.data || error.message);
      setError("فشل في الحصول على بيانات المكتب");
      throw new Error("Failed to fetch office data"); // Throw a new error with a user-friendly message
    }
  };


  // Get Office Details
  const getOfficeDetails = async () => {
    try {
      ;
      if (!id || !requestid) throw new Error("Missing ID parameters");
      await fetchOfficeData(id, requestid);

    } catch (error) {
      console.error("Failed to retrieve office data.");
      setError("فشل في استرجاع بيانات المكتب");
    }
  };


  
  const fetchSurveyReport = async (krokiNumber: number): Promise<SurveyReportResponse> => {
    const url = "https://apiservicesstg.balady.gov.sa/v1/BuildingLicenseInfo/construction-survey-report";

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('Token')}`,
    };

    const requestData = {
      krokiNumber,
      queryMode: "BY_LICENSE_NUMBER",
    };

    try {
      const response = await axios.post<SurveyReportResponse>(url, requestData, { headers });
      ;
      console.log("ob");
      console.log(response.data.data.result[0]);

      setRequest(response.data.data.result[0]);


    } catch (error: any) {
      console.error("Error fetching survey report:", error.response?.data || error.message);
      setError("فشل في الحصول على تقرير المسح");
      throw error;
    }
  };

  useEffect(() => {
    ;

    const fetchData = async () => {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate("/login");
        return;
      }
      ;
      try {
        const expiration = localStorage.getItem("tokenExpiration");
        if (localStorage.getItem('Token')) {
  
          const expired = expiration ? Date.now() > Number(expiration) : true;
          if (expired) {
            await fetchToken();
          }
  
        }
        if (!localStorage.getItem('Token')) {
          await fetchToken();
        }
        await getOfficeDetails();
      } catch (err) {
        setError("حدث خطأ أثناء تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, requestid, navigate]);



  const [waitingApprovalStatus, setWaitingApprovalStatus] = useState(waitingApproval);
  const [isFormTabVisible, setIsFormTabVisible] = useState(!waitingApproval);

  const approveRequest = async (type: "approve" | "reject") => {
    //console.log(officeId +" re  "+requestid+"  فخنث :"+localStorage.getItem('Token'));
    try {
      const response = await axios.post(
        "https://apiservicesstg.balady.gov.sa/v1/cad-engine/benaa/action",
        {
          type, // Dynamic type ("approve" or "reject")
          channel: "balady-services",
          reqNo: requestid, // Dynamic requestId
          notes: "notes",
        },
        {
          headers: {
            officeId: officeId,
            loginIdentityType: "2",
            loginIdentityId: "1000100873",
            "x-platform-id": "baladybusiness",
            "x-provider-id": "64ed91f79d5cf006de8e3471",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Token')}` // Replace with actual token
          },
        }
      );

      if (response.data.statusDetails.code == 200) {
        setWaitingApprovalStatus(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(type === "approve" ? "فشل في قبول الطلب" : "فشل في رفض الطلب");
    }
  };
  const handleAccept = async () => {
    await approveRequest("approve");
    setIsFormTabVisible(true);
    alert("تم قبول الطلب بنجاح");
  };

  const handleReject = async () => {
    await approveRequest("reject");
    alert("تم رفض الطلب");
    navigate(`/offices/${id}/requests`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const [activeTab, setActiveTab] = useState("details");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === "form" && waitingApprovalStatus) {
      alert("يجب قبول الطلب أولاً");
      return;
    }
    setActiveTab(tab);
    setIsSidebarOpen(false); // Collapse the sidebar after choosing a tab
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

    <div className="min-h-screen bg-gray-50 p-6" style={{ direction: "rtl" }}>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">العودة</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar / Tabs */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-5 sticky top-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-r-4 border-emerald-500 pr-3">القائمة</h2>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleTabChange("details")}
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                    activeTab === "details"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  تفاصيل الطلب
                </button>
                {isFormTabVisible && (
                  <button
                    onClick={() => handleTabChange("form")}
                    className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                      activeTab === "form"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    <Map className="w-5 h-5" />
                    خدمات
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {activeTab === "details" && (
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Hash className="w-6 h-6 text-gray-500" />
                      <h1 className="text-2xl font-bold text-gray-900">
                        طلب رقم: {requestBasic?.requestNumber}
                      </h1>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${waitingApprovalStatus
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                        }`}
                    >
                      {waitingApprovalStatus ? "قيد الانتظار" : "مكتمل"}
                    </span>
                  </div>

                  {/* Request Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">صاحب الطلب</p>
                          <p className="font-medium">
                            {request?.OwnersListData?.length > 0 ? request.OwnersListData[0]?.OwnerName : ""}
                          </p>

                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">تاريخ الطلب</p>
                          <p className="font-medium">
                            {request?.KrookiIssueDate
                              ? new Date(request.KrookiIssueDate).toLocaleDateString("ar-SA", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                              : ""} {/* Fallback message in Arabic for "Date not available" */}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">المنصة</p>
                          <p className="font-medium">{platformName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">رقم الهوية</p>
                          <p className="font-medium">{ownerId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

             

                {/* Action Buttons */}
                {waitingApprovalStatus && (
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
                {!waitingApprovalStatus && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">حالة الطلب</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">تم اعتماده</h3>
                      
                      </div>
                      {request?.Note && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium mb-2">ملاحظات</h3>
                          <p>{request?.Note}</p>
                        </div>
                      )}
                      {/* {request.result.date && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium mb-2">تاريخ النتيجة</h3>
                          <p>
                            {new Date(request.result.date).toLocaleDateString(
                              "ar-SA"
                            )}
                          </p>
                        </div>
                      )} */}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "form" && (
              <Services 
                KrookiNumber={requestBasic?.krokiNo}
                officeId={id ? id : ""}
                requestId={requestid ? requestid : ""}
                amanaName={requestBasic?.amanaName}
                baladiaName={requestBasic?.baladiaName}
                requestData={request} // Pass the survey report data
              />
            )}
          </div>
        </div>
        {/* <ConditionsModal /> */}
      </div>
    </div>
  );
}
