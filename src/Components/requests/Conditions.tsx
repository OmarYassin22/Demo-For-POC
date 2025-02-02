import React, { useState, useEffect,ChangeEvent } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/conditionModal.css'
import MockStrConditions from "../../mocks/MockStrConditions.json";





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
  buildingType:number,
  instructure:string
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

const Conditions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();



  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [bundleResponse, setBundleResponse] = useState<ApiResponse | null>(null);

  
  const [complianceResult, setComplianceResult] = useState<ApiResponse | null>(null);
  // Handles file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Submit the form and upload the files
  const handleSubmit = async (): Promise<void> => {
    if (!file) return; // Ensure a file is selected

    setIsUploading(true);

    // Prepare the FormData
    const formData = new FormData();
    
    // Append the selected file for 'RvtFileUpload' (user's file)
    formData.append('RvtFileUpload', file);
    
    // Create and append the Input JSON file
    const jsonString = JSON.stringify(MockStrConditions);
    const blob = new Blob([jsonString], { type: 'application/json' });

    //formData.append('InputJsonFile', inputJsonFile);
    formData.append('InputJsonFile', blob, 'MockStrConditions.json'); // 'file' is the field name expected by the API

    
    // Prepare and append the 'Data' field (as JSON string)
    const data = JSON.stringify({
      activityName: "BenaaDA4R.BenaRevitPlugin_bundle_zipActivity+$LATEST",
      browserConnectionId: "dKXiIePC_lcgHxe97GPBHw",
    });
    formData.append('Data', data);

    try {
      // Send the POST request to your API
      const response = await fetch('http://localhost:8080/api/Handle/Bundle', {
        method: 'POST',  // No CORS check for the request
        body: formData,
      });
    
      if (response.ok) {
        console.log('File uploaded successfully!');
        console.log(response);
        alert('File uploaded successfully!');


        const jsonResponse: ApiResponse = await response.json();

        console.log(jsonResponse);
        setBundleResponse(jsonResponse);

        await handleApiCall(jsonResponse);
        //localStorage.setItem("ConditionsData", "true");

      } else {
        console.log(response);
        console.error('File upload failed:', response.statusText);
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      alert('Error during file upload');
    } finally {
      setIsUploading(false);
      setIsModalOpen(false); // Close modal after upload attempt
    }
  };
  const handleApiCall = async (jsonResponse: any) => {

    if (!jsonResponse?.Value.apiRes.Data.Data.url) {
      console.log('No URL found!');
      return;
    }
    const requestBody = {
      url: jsonResponse?.Value.apiRes.Data.Data.url,
    };
    localStorage.setItem("urn", jsonResponse?.Value.apiRes.Data.TranslatedUrn);
   
    try {
      const response = await fetch('http://localhost:8080/api/Handle/getResponse', {
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
      localStorage.setItem("ComplianceResultData",  JSON.stringify(jsonData));
      console.log(complianceResult);

      navigate("/InspectionReport");
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  // const downloadAndReadJson = async () => {
  //   if (!bundleResponse?.Value.apiRes.Data.Data.url) {
  //     console.log('No URL found!');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // Fetch the JSON from the URL
  //     const jsonResponse = await fetch(bundleResponse.Value.apiRes.Data.Data.url);

  //     if (jsonResponse.ok) {
  //       // Parse the response as JSON
  //       const jsonData = await jsonResponse.json();
  //       setComplianceResult(jsonData);

  //       console.log(complianceResult);
  //     } else {
  //       console.error('Failed to fetch JSON from the URL.');
  //     }
  //   } catch (error) {
  //     console.error('Error downloading the JSON file:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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

  const { Amana = "", Baladia = "", Hai = "", Land = "",buildingType="",instructure="" } = location.state || {};
  
  const [conditionsData, setConditionsData] = useState<ConditionsResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch Token
  const fetchToken = async () => {
    const url = "https://apiservicesstg.balady.gov.sa/oauth/v1/token";
    const username = "7WVXK2rO9fGn16uIGM7ixGhswAu2uGHd";
    const password = "TCz3GQGRssBq7maT";
    const basicAuth = btoa(`${username}:${password}`);
console.log(Amana +" "+Baladia +" "+Hai+" "+Land);
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
      console.log(response.data.access_token);
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
          building_type:buildingType,
        
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });
      setConditionsData(response.data.data.result);
      setError(null);
      
    } catch (err: any) {
      setError("Unable to fetch conditions. Please try again.");
    } finally {
      setLoading(false);
    }



    let filteredConditions;
    if (conditionsData?.conditions) {
      if (instructure === "1") {
        // If instructure is 1, filter where code < 500
        filteredConditions = conditionsData?.conditions.filter(
          (condition) => parseInt(condition.code, 10) < 500
        );
      } else {
        // Otherwise, filter where code >= 500
        filteredConditions = conditionsData?.conditions.filter(
          (condition) => parseInt(condition.code, 10)  >= 500
        );
      }
    
      setConditionsData({ conditions: filteredConditions });
    } else {
        // This block will run if either conditionsData or conditionsData?.conditions is null or undefined
        // alert("Conditions Data or conditions is null or undefined");
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;




   
 
 


  const currentItems = conditionsData?.conditions?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  // console.log("currentItems");
  // console.log(conditionsData);
  // console.log(currentItems);
  const totalPages = Math.ceil(
    (conditionsData?.conditions?.length || 0) / itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4" style={{direction:"rtl"}}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {conditionsData?.conditions ? (
          <>
            {/* Existing content */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">الشروط </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Conditions List */}
            <div className="space-y-4">
              {currentItems?.map((condition, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">شرط {index+1}</h3>
                    <span className="text-sm text-gray-500">{condition.place}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{condition.description}</p>
                  {condition.visualCategory && (
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {condition.visualCategory}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {conditionsData?.conditions && conditionsData.conditions.length > 0 && (
              <div className="mt-6 flex justify-center items-center gap-2 border-t pt-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  السابق
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => paginate(idx + 1)}
                    className={`w-8 h-8 rounded-full ${
                      currentPage === idx + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  التالي
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-4 border-t pt-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إغلاق
              </button>
              <button
               
               onClick={openModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                بدء الخدمة
              </button>


              
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">لا توجد بيانات متاحة</div>
        )}
      </div>






      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="close-btn">X</button>
            <h2>Upload a File</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
              disabled={isUploading}
            />
            <button
              onClick={handleSubmit}
              className="submit-btn"
              disabled={!file || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conditions;
