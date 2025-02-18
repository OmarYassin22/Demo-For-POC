import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/conditionModal.css'
import { log } from "console";
import { ArrowLeft } from "lucide-react";
//import MockStrConditions from "../../mocks/MockStrConditions.json";





interface ApiResponse {
  Value: {
    WorkItemId: string;
    apiRes: {
      StatusCode: number;
      Headers: {
        [key: string]: string;
      };
      Data: {
        Data: {
          status: string;
          url: string;
          params: {
            [key: string]: string;
          };
          size: number;
          sha1: string;
        };
        TranslatedUrn: string;
      };
    };
  };
  StatusCode: number;
}



interface FormDataFields {
  RvtFileUpload: File | null;
  InputJsonFile: File | null;
  Data: string;
}
interface ServicesProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  Amana: string;
  Baladia: string;
  Hai: string;
  Land: string;
  buildingType: number,
  instructure: string,
  complianceType: string; // Add this line
}

interface Condition {
  code: string;
  description: string;
  place: string;
  visualCategory?: string;
}

interface ConditionsResponse {
  conditions: Condition[];

}

const Conditions: React.FC<ServicesProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { complianceType } = location.state || {}; // Get complianceType from location state
  const { krookiNumber } = useParams();  // Get krookiNumber from URL parameter
  console.log(complianceType);



  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [bundleResponse, setBundleResponse] = useState<ApiResponse | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [complianceResult, setComplianceResult] = useState<ApiResponse | null>(null);
  const [canStartService, setCanStartService] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Handles file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Submit the form and upload the files
  const handleSubmit = async (): Promise<void> => {
//alert("o"+officeId+"r"+requestId);
    // navigate(`/InspectionReport/${krookiNumber}`, {
    //   state: {
    //     officeId:officeId,
    //     requestId:requestId
    //   }
    // });
    if (!file) return; // Ensure a file is selected

    setIsUploading(true);
    setUploadSuccess(false);

    // Prepare the FormData
    const formData = new FormData();

    // Append the selected file for 'RvtFileUpload' (user's file)
    formData.append('RvtFileUpload', file);

    const responseObject = {
      success: true,
      errors: [],
      codeNumber: "1",
      payload: conditionsData,
      message: "Successfully",
      code: "ok",
      requestId: null
    };

    const jsonString = JSON.stringify(responseObject);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });


    // Append the Blob to FormData with a filename
    formData.append('InputJsonFile', blob, 'MockStrConditions.json');

    // Prepare and append the 'Data' field (as JSON string)
    const data = JSON.stringify({
      activityName: "BenaaDA4R.BenaRevitPlugin_bundle_zipActivity+$LATEST",
      browserConnectionId: "dKXiIePC_lcgHxe97GPBHw",
    });
    formData.append('Data', data);

    try {
      // Send the POST request to your API
      // const response = await fetch('http://localhost:8080/api/Handle/Bundle', {
      const response = await fetch('https://poc-backend.runasp.net/api/Handle/Bundle', {

        method: 'POST',  // No CORS check for the request
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        const jsonResponse: ApiResponse = await response.json();
        setBundleResponse(jsonResponse);
        await handleApiCall(jsonResponse, false);
      } else {
        console.error('File upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleApiCall = async (jsonResponse: any, shouldNavigate: boolean = false) => {
    if (shouldNavigate) {
      navigate(`/InspectionReport/${krookiNumber}`, {
        state: {
          officeId:officeId,
          requestId:requestId,
          instructure:instructure
        }
      });
    } else {
      if (!jsonResponse?.Value.apiRes.Data.Data.url) {
        return;
      }
      const requestBody = {
        url: jsonResponse?.Value.apiRes.Data.Data.url,
      };
      localStorage.setItem("urn", jsonResponse?.Value.apiRes.Data.TranslatedUrn);

      try {
        // const response = await fetch('http://localhost:8080/api/Handle/getResponse', {
        const response = await fetch('https://poc-backend.runasp.net/api/Handle/getResponse', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setComplianceResult(jsonData);
        localStorage.setItem("ComplianceResultData", JSON.stringify(jsonData));
        console.log(complianceResult);


      } catch (error) {
        console.error('Error making API call:', error);
      }
    }

  };

  const handleStartService = async () => {
    if (bundleResponse) {
      await handleApiCall(bundleResponse, true);
    }
  };

  // Open modal
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = (): void => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    console.log("Location state:", location.state);

   
  }, [location]);

  const { Amana = "", Baladia = "", Hai = "", Land = "", buildingType = "", instructure = "",officeId="",requestId="" } = location.state || {};

  const [conditionsData, setConditionsData] = useState<ConditionsResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Remove pagination states and calculations
  // Add scroll handler
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);

    if (progress > 95) {
      setCanStartService(true);
    }
  };

  // Fetch Token
  const fetchToken = async () => {
    const url = "https://apiservicesstg.balady.gov.sa/oauth/v1/token";
    const username = "7WVXK2rO9fGn16uIGM7ixGhswAu2uGHd";
    const password = "TCz3GQGRssBq7maT";
    const basicAuth = btoa(`${username}:${password}`);
    console.log(Amana + " " + Baladia + " " + Hai + " " + Land);
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
      setToken(response.data.access_token);
    } catch (err: any) {
      setError("Unable to fetch token. Please try again.");
      setLoading(false);
    }
  };

  // Fetch Conditions
  const fetchConditions = async () => {
    if (!token) return;

    const url =
      "https://apiservicesstg.balady.gov.sa/v1/benaa-services/internal/api/conditions/by-areaName";

    try {
      const response = await axios.get<ConditionsResponse>(url, {
        params: {
          AmanaName: Amana,
          areaParentOfParentName: Baladia,
          areaParentName: Hai,
          areaName: Land,
          building_type: buildingType,

        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });
      setConditionsData(response.data.data.result);

      setError(null);



      let filteredConditions = response.data.data.result;
      filteredConditions?.conditions.filter(
        (condition) => condition.active ==true
      );
      if (filteredConditions?.conditions) {
        if (instructure === "1") {
          // If instructure is 1, filter where code < 500
          filteredConditions = filteredConditions?.conditions.filter(
            (condition) => parseInt(condition.code, 10) < 500
          );
        } else {
          // Otherwise, filter where code >= 500
          filteredConditions = filteredConditions?.conditions.filter(
            (condition) => parseInt(condition.code, 10) >= 500
          );
        }
        console.log("filteredConditions");
        console.log(filteredConditions);
        setConditionsData(filteredConditions);
        console.log(conditionsData);
      } else {
        // This block will run if either conditionsData or conditionsData?.conditions is null or undefined
        // alert("Conditions Data or conditions is null or undefined");
      }



    } catch (err: any) {
      setError("Unable to fetch conditions. Please try again.");
    } finally {
      setLoading(false);
    }




  };

  useEffect(() => {
    if (!location.state) {
      console.error("No state data received");
      return;
    }
    setLoading(true);
    fetchToken();
  }, [location.state]);

  useEffect(() => {
    if (token) fetchConditions();
  }, [token]);

  const handleClose = () => {
    navigate(-1);
  };









  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600" style={{direction:"rtl"}}>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-100 p-4" style={{ direction: "rtl" }}>
      <div className="flex absolute left-10 top-24 justify-end mb-4">
        <button
          onClick={() => { navigate(-1) }}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">العودة</span>
        </button>
      </div>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Display the compliance type at the top */}
        <div className="mb-4 text-lg font-semibold text-gray-700">
          نوع التحقق: {complianceType === "1" ? "معمارى" : "انشائى"}
        </div>
        {/* Upload Section */}
        <div className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${uploadSuccess ? 'ring-2 ring-green-500 ring-offset-2' : ''
          }`}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">رفع ملف التصميم ال{complianceType === "1" ? "معمارى" : "انشائى"}</h2>
            <p className="text-gray-600">يرجى رفع ملف Revit (.rvt)</p>
          </div>

          <div className={`border-2 border-dashed rounded-lg p-8 transition-colors
          ${uploadSuccess
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-green-400'}`}>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".rvt"
              disabled={isUploading}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {uploadSuccess ? (
                <>
                  <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-600 font-medium">تم الفحص بنجاح!</p>
                </>
              ) : (
                <div>
                  
                  <p className="text-gray-600 text-lg">اضغط هنا لرفع الملف</p>
                  <p className="text-gray-500 text-sm mt-1">أو اسحب وأفلت الملف هنا</p>

                  {file  && (
        <div className="mt-4 text-gray-600">
          <p className="text-lg">الملف المختار: <strong>{file.name}</strong></p>
        </div>
      )}
                </div>
              )}
            </label>
          </div>

          {/* File Requirements */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                يجب أن يكون الملف بصيغة Revit (.rvt)
              </p>
            </div>
            {file && !uploadSuccess && (
              <button
                onClick={handleSubmit}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg
                  hover:bg-green-700 transition-colors disabled:bg-gray-300"
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    جاري الفحص...
                  </>
                ) : (
                  <>
                    {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg> */}
                   بدء الفحص
                  </>
                )}
              </button>
            )}
            {/* {uploadSuccess && (
              <span className="text-green-600 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                تم الفحص بنجاح
              </span>
            )} */}


             {/* File Name Display */}
   
          </div>
        </div>

        {/* Conditions Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with progress bar */}
          <div className="relative px-6 py-4 bg-white border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">الإشتراطات</h2>
              {/* <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <span className="text-xl">×</span>
              </button> */}
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
              <div
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="p-4"> {/* reduced padding */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {conditionsData ? (
              <>
                {/* Updated Conditions container */}
                <div
                  className="overflow-y-auto max-h-[75vh] px-2"
                  onScroll={handleScroll}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollBehavior: 'smooth',
                  }}
                >
                  <div className="grid grid-cols-2 gap-6"> {/* increased gap */}
                    {conditionsData.map((condition, index) => (
                      <div
                        key={index}
                        className="group bg-white rounded-xl p-6 transition-all duration-300
                          border-2 border-gray-100 hover:border-green-200
                          shadow-md hover:shadow-xl
                          transform hover:-translate-y-1"
                      >
                        {/* Header Section */}
                        <div className="flex items-center gap-4 mb-4 pb-3 border-b border-gray-100">
                          <div className="flex-shrink-0 w-12 h-12
                            bg-gradient-to-br from-green-500 to-green-600 
                            rounded-xl flex items-center justify-center shadow-md"
                          >
                            <span className="text-white text-xl font-bold">
                              {index + 1}
                            </span>
                          </div>

                          <div className="">
                            {/* <h3 className="text-xl font-bold text-gray-800 mb-1">
                              شرط {index + 1}
                            </h3> */}
                            <div className="flex items-center text-gray-500 text-sm">
                              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                              {condition.place}
                            </div>
                          </div>
                        </div>

                        {/* Description Section */}
                        <div className="mb-4 pb-4 border-b border-gray-100">
                          <div className="relative">
                            <p className="text-gray-700 text-base leading-relaxed
                              max-h-32 overflow-y-auto pr-1
                              [&::-webkit-scrollbar]:w-1
                              [&::-webkit-scrollbar-thumb]:bg-gray-200
                              [&::-webkit-scrollbar-thumb]:rounded-full"
                            >
                              {condition.description}
                            </p>
                          </div>
                        </div>

                        {/* Footer Section */}
                        <div className="flex items-center justify-between">
                          {condition.visualCategory && (
                            <div className="flex items-center">
                              <span className="inline-flex items-center gap-1.5 px-4 py-1.5
                                bg-green-50 text-green-700 rounded-lg text-sm font-medium
                                group-hover:bg-green-100 transition-colors"
                              >
                                <svg className="w-4 h-4 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span>{condition.visualCategory}</span>
                              </span>
                            </div>
                          )}
                          <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">
                            كود: {condition.code}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Scroll indicator */}
                  {!canStartService && (
                    <div className="sticky bottom-0 text-center py-3 bg-gradient-to-t from-white via-white">
                      <div className="text-gray-500 text-xs mb-1">
                        اسحب لأسفل لقراءة جميع الشروط
                      </div>
                      <div className="animate-bounce inline-block">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer - Updated */}
                <div className="mt-6 flex justify-center pt-4 border-t">
                  <button
                    onClick={handleStartService}
                    disabled={!canStartService || !uploadSuccess}
                    className={`px-8 py-3 rounded-lg transition-all duration-300 
                      ${(canStartService && uploadSuccess)
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-green-100'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                   عرض التقرير
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                لا توجد بيانات متاحة
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conditions;
