import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jsonData from "../../../mocks/OfficeRequestServices.json"; // Import the JSON data
import { useParams } from 'react-router-dom';

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
  // DeedListData: null | any; // If there is data type for this, replace `any`
  UrbanBoundary: string;
  RequestId: number;
}

interface ServicesProps {
  KrookiNumber: number;
  officeId:string;requestId:string;

}

const Services: React.FC<ServicesProps> = ({ KrookiNumber,officeId,requestId}) => {

  
const [accessToken, setAccessToken] = useState<string >(""); 
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<FormDataobj>();
  const { id, requestid } = useParams();
  interface FormValues {
    description: string;
    ComplianceType: string;
  }

  const validationSchema = Yup.object({
    description: Yup.string().required("وصف المبني مطلوب"),
    ComplianceType: Yup.string().required("نوع التحقق مطلوب"),
  });

  const [selectedOption, setSelectedOption] = useState<string>("1"); // Default to "1"

  const formik = useFormik({
    initialValues: {
      description: "",
      ComplianceType: "1", // Default to "1"
    },
    validationSchema,

    onSubmit: (values) => {
      // setIsModalOpen(true);
//alert(officeId);
      navigate(`/conditions/${filteredData?.KrookiNumber}`, {
        state: {
officeId:officeId,
requestId:requestId,
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
          complianceType: selectedOption || "1" // Ensure this line is included
        },
      });
    },
  });
  // const handleStartService = (e) => {
  //   e.preventDefault();
  //   setIsModalOpen(true);
  // };

  const [loading, setLoading] = useState<boolean>(false);
  // Handle change event for radio buttons
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value); // Set the selected radio button value
    formik.setFieldValue("ComplianceType", event.target.value); // Update formik value
    // Store the report type in local storage
    const reportType = event.target.value === "1" ? "arc" : "str";
    localStorage.setItem("reportType", reportType);
  };

  // useEffect(() => {
  //   alert(selectedOption); // Alert will show the updated selectedOption value
  // }, [selectedOption]);
  useEffect(() => {

    const fetchData = async () => {
      
   
    // Filter JSON data based on criteria
   
    const filtered = jsonData.filter((item: FormDataobj) => {
      return item.KrookiNumber === KrookiNumber; // Example filter condition (MainUsedName === "سكني")
    });
    if (filtered.length === 0) {
      setLoading(true);
      // Assuming 'mockData' is an array of mock items
     await getToken();

   
    } else {
      // Set the filtered data to state
      setFilteredData(filtered[0]);
    }
    }
    fetchData();
  }, []);



  const getToken = async () => {
    try {
      // URL to get the token
      const url = 'https://apiservicesstg.balady.gov.sa/oauth/v1/token';

      // Headers
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic cWVNU0l1UkNhSk9ma0FFZEdoMWhVb1BoSHZGQTVBQ0c6aVNuTmVESnhEdmdKa0tPOQ==',
        };

      // Request body (URL-encoded form data)
      const body = new URLSearchParams();
      body.append('grant_type', 'client_credentials');

      // Make the POST request using axios
      const response = await axios.post(url, body.toString(), { headers });

      console.log("token:");
      console.log( response.data.access_token);
     await fetchOfficeData(response.data.access_token);
    
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchOfficeData = async (access_token:string) => {
    const url = 'https://apiservicesstg.balady.gov.sa/v1/cad-engine/benaa-office/'+requestid+'/'+id;
   
    const headers = {
      'loginIdentityType': '1',
      'loginIdentityId': '1000115574',
      'Authorization': 'Bearer '+access_token,
      
    };

    // Call the API using fetch
    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        
         
        getdatabykrooki(access_token,data.data.result.krokiNo);// Handle the response data here
       
      })
      .catch((error) => {
        console.error('Error:', error); // Handle any errors
      });
  };



  const getdatabykrooki =  (access_token:string,krokiData:string) => {
    const url = 'https://apiservicesstg.balady.gov.sa/v1/BuildingLicenseInfo/construction-survey-report';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+access_token,
     
    };

    const body = {
      krokiNumber: krokiData,
      queryMode: 'BY_LICENSE_NUMBER',
    };

    // Make the POST request using axios
    axios
      .post(url, body, { headers })
      .then((response) => {
        setFilteredData(response.data.data.result[0]); // Store response data in state
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-green-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        رقم القرار : {filteredData?.KrookiNumber} , تاريخ القرار:
        {filteredData?.KrookiIssueDate}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                رقم القطعه: 
              </label>
              <input
                type="text"
                name="PlanNumber"
                value={filteredData?.LocationData.PlanNumber}
                className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled
              ></input>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                نوع الاستخدام:{" "}
              </label>
              <input
                type="text"
                id="MainUsedName"
                name="MainUsedName"
                value={filteredData?.MainUsedName}
                className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled
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
                name="receivedPieces"
                value={1}
                // onChange={handleInputChange}
                className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                رقم النموذج:{" "}
              </label>
              <input
                type="text"
                name="remainingPieces"
                value={1}
                //onChange={handleInputChange}
                className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled
              />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                نوع النموذج:{" "}
              </label>
              <input
                id="SubUsedName"
                name="SubUsedName"
                value={filteredData?.SubUsedName}
                //onChange={handleInputChange}
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
                id="description"
                name="description"
                value={formik.values.description}
                placeholder="أدخل وصف المبني"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full py-3 pr-2 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
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
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <label htmlFor="test1">التحقق من المخططات المعمارية</label>
              <input
                type="radio"
                id="test1"
                name="ComplianceType"
                value="1"
                checked={selectedOption === "1"}
                onChange={(e) => {
                  handleRadioChange(e);
                  formik.setFieldValue("ComplianceType", e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="test2">التحقق من المخططات الإنشائية</label>
              <input
                type="radio"
                id="test2"
                name="ComplianceType"
                value="2"
                checked={selectedOption === "2"}
                onChange={(e) => {
                  handleRadioChange(e);
                  formik.setFieldValue("ComplianceType", e.target.value);
                }}
              />
            </div>
          </div>
          {formik.touched.ComplianceType && formik.errors.ComplianceType && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.ComplianceType}
            </p>
          )}
        </div>
        <div className="bg-gray-100 p-4 justify-center flex rounded-lg mb-6">
          <div className="">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center min-w-[100px]"
            >
              بدء الخدمة
            </button>
          </div>
        </div>
      </form>

      {/* <Conditions
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        Amana={filteredData?.LocationData.AmanahName || ""}
        Baladia={filteredData?.LocationData.BaladiyaName || ""}
        Hai={filteredData?.LocationData.DistrictName || ""}
        Land={filteredData?.LocationData.PlanNumber || ""}
        buildingType={ filteredData?.SubUsedCode === 26 || filteredData?.SubUsedCode === 699
          ? 1
          : filteredData?.SubUsedCode === 24
          ? 2
          : filteredData?.SubUsedCode === 698
          ? 8
          : 1}
        instructure={selectedOption||"1"}
      /> */}
    </div>
  );
};

export default Services;
