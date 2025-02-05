import React, { useState, useEffect } from "react"; 
import "../../styles/RequestServices.css"; // Correct import of the CSS

import jsonData from '../../mocks/OfficeRequestServices.json';  // Import the JSON data

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
  
  const RequestServices: React.FC = () => {
    

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<string>("");
  const [formData, setFormData] = useState<FormDataobj[]>([]); // Initialize state as null
  
    const [filteredData, setFilteredData] = useState<FormDataobj>();
  
    useEffect(() => {
      // Filter JSON data based on criteria
      console.log(jsonData);
      const filtered = jsonData.filter((item: FormDataobj) => {
        return item.RequestId=== 4517312082;  // Example filter condition (MainUsedName === "سكني")
      });
  
      // Set the filtered data to state
      setFilteredData(filtered[0]);
    }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection and convert to Base64
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      convertToBase64(file);
    }
  };

  // Convert file to Base64 string
  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setBase64Image(base64String);
    };
    reader.readAsDataURL(file);
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // Call API with Base64 image after upload
  const handleFileUpload = async () => {
    if (!base64Image) {
      alert("لايوجد ملف.");
      return;
    }

    setIsUploading(true);
    // try {
    //   // Prepare the request body as in the curl command
    //   const requestBody = {
    //     sProfileURI: "esprf:///DMS/BENAA/",
    //     sJsonAttributes: {
    //       Attributes: {
    //         ID: "45105468395",
    //       },
    //     },
    //     sNodeId: "1042",
    //     attachments: [
    //       {
    //         sDocName: "",
    //         sBase64Content: base64Image.split(",")[1], // Remove the 'data:image/jpeg;base64,' part
    //       },
    //     ],
    //   };
    //   const accessToken =
    //     "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhFRDBCN0UzRjNDOTFBOEQwMUU3MEMxRUM4MTNGQTJBRjgxOEQ5MUZSUzI1NiIsIng1dCI6Imp0QzM0X1BKR28wQjV3d2V5QlA2S3ZnWTJSOCIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3Nzb2FwcGRldi5tb21yYS5nb3Yuc2EiLCJuYmYiOjE3MzczOTkyNjYsImlhdCI6MTczNzM5OTI2NiwiZXhwIjoxNzM3NDAxMDY2LCJhdWQiOlsiRW5naW5lZXJpbmdPZmZpY2UuU2NvcGUiLCJHaXNBcGkiLCJCYWxhZHkuR2lzQ2xpZW50IiwiYmFsYWR5QnVzaW5lc3MuYmUuY29tbXVuaWNhdGlvbiIsIkdpcy5Qb3J0YWwuVW1hcHMuQVBJIiwiaHR0cHM6Ly9zc29hcHBkZXYubW9tcmEuZ292LnNhL3Jlc291cmNlcyJdLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJFbmdpbmVlcmluZ09mZmljZS5TY29wZSIsIkdpc0FwaSIsImdpcy5sb2NhdG9yLnJlYWQiLCJnaXMubG9jYXRvci53cml0ZSIsIkJhbGFkeS5HaXNDbGllbnQiLCJiYWxhZHlCdXNpbmVzcy5iZS5jb21tdW5pY2F0aW9uIiwiR2lzLlBvcnRhbC5VbWFwcy5BUEkiXSwiYW1yIjpbInB3ZCJdLCJjbGllbnRfaWQiOiJPdXRCYWxhZHkuQ0FELkVuZ2luIiwic3ViIjoiOGM5OWUxMzgtODAxMS00MTFlLWE4Y2QtYjRmYzRhZTczYzkzIiwiYXV0aF90aW1lIjoxNzM3Mzk5MjI5LCJpZHAiOiJsb2NhbCIsImVtYWlsIjoieWFzcjE0MjhAZ21haWwuY29teHgiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IlhYU0pXTUNSNUNMV1lOU0FZQlQ3WURXWTNDVExBNkxIIiwiTGFzdEFjdGl2YXRlIjoiMjMvMTIvMjAyNCIsInByZWZlcnJlZF91c2VybmFtZSI6IjEwMDAxMTU1NzQiLCJnaXZlbl9uYW1lIjoi2YrYp9iz2LEiLCJmYW1pbHlfbmFtZSI6Itin2YTYt9ix2YrZgtmKIiwicGhvbmVfbnVtYmVyIjoiNTMzMzg4NDgzIiwibmFtZSI6IjEwMDAxMTU1NzQiLCJtYWlsIjoieWFzcjE0MjhAZ21haWwuY29teHgiLCJzZXgiOiIxIiwiZG9iIjoiMTcvMDYvMTk3NyIsInBob25lIjoiMDUzMzM4ODQ4MyIsImFyX25hbWUiOiLZitin2LPYsSDYqNmGINi52KjYr9in2YTZhNmHINio2YYg2YXYrdmF2K8g2KfZhNi32LHZitmC2YoiLCJlbl9uYW1lIjoi2YrYp9iz2LEg2KjZhiDYudio2K_Yp9mE2YTZhyDYqNmGINmF2K3ZhdivINin2YTYt9ix2YrZgtmKIiwiaWRfbm8iOiIxMDAwMTE1NTc0IiwibmlkIjoiMTEzIiwibmF0aW9uYWxpdHkiOiLYs9i52YjYr9mKIiwiaWRfdHlwZSI6IjEiLCJzbmFtZSI6ItmK2KfYs9ixLNio2YYg2LnYqNiv2KfZhNmE2Ycs2KjZhiDZhdit2YXYryzYp9mE2LfYsdmK2YLZiiIsInNpZCI6Ijc5ODFFNDNEM0MyOUVFQjcxMTUzQUIyMTUzMjAxQzk4IiwianRpIjoiQzgxN0QxMUY0N0RBREMwMDNGNUNDNjI4MURGMDUyMEYifQ.H2YPtOV4gnlaZP3SXSMMCWRYymaYaRv9u16w44xuqtnfCdRlGPIHdhgorBGBcsIWhvPNp0sP9zkQDUBsEVzcVm4ndkIK52HuWq6FsSLNIWg_3YqcVyazKuPHuHkGkWnRI4GUsk37ABe3-HRTjnUo6mCgbTLQXmK9MN8UQ0b1uh90vM-f7aCQd_hDZrxkzSMOR3hSGQuDlB2dYnz237EoW5vWK36G9G7PujU943KcZcF0shk1nOwmJOas4BxIovRHd7ddVReHfm4XYhDXV7a029EsFxJgjbKuiFje1Lob0yNRDz8KGhloz6ujgj-JJym5aC_Vmo8hXMfMJ0C5wdJOGA";
      // Make the API request (replace with the actual API endpoint and proper headers)
      // const response = await fetch(
      //   "https://apiservicesstg.balady.gov.sa/v1/dms-services/stream/upload",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + accessToken,
      //     },
      //     body: JSON.stringify(requestBody),
      //   }
      // );

    //   const data = await response.json();

    //   if (response.ok) {
    //     setUploadResponse(
    //       `File uploaded successfully! Response: ${JSON.stringify(data)}`
    //     );
    //   } else {
    //     setUploadResponse(`Error uploading file. Status: ${response.status}`);
    //   }
    // } catch (error) {
    //   setUploadResponse("Error uploading file.");
    //   console.error("Error uploading file:", error);
    // } finally {
    //   setIsUploading(false);
    // }
  };

  return (
    <div className="container">
      <h2 className="header">تفاصيل الطلب والخدمات</h2>
      <div className="subHeader">
        <p>رقم القرار: {filteredData?.KrookiNumber}</p>
        <p>تاريخ القرار: {filteredData?.KrookiIssueDate}</p>
      </div>

      <div className="formContainer">
        {/* Tabs */}
        <div className="tabContainer">
          <button className="tab activeTab">الخدمات</button>
        </div>

        {/* Form Section */}
        <form>
          {/* Row 1 */}
          <div className="row">
            <div className="inputGroup">
              <label>رقم القطعة:</label>
              <input
                type="text"
                name="PlanNumber"
                 value={filteredData?.LocationData.PlanNumber}
                onChange={handleInputChange}
                className="input"
              />
            </div>
            <div className="inputGroup">
              <label>نوع الاستخدام:</label>
              <input
                type="text"
                id="MainUsedName"
                name="MainUsedName"
                value={filteredData?.MainUsedName}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="inputGroup">
              <label>عدد النماذج بالقطعه:</label>
              <input
                type="text"
                name="receivedPieces"
                value={1}
                onChange={handleInputChange}
                className="input"
              />
            </div>
            <div className="inputGroup">
              <label>رقم النموذج:</label>
              <input
                type="text"
                name="remainingPieces"
                value={1}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="row">
            <div className="inputGroup">
              <label>نوع النموذج:</label>

              <input
                type="text"
                id="SubUsedName"
                name="SubUsedName"
                value={filteredData?.SubUsedName}
                onChange={handleInputChange}
                className="input"
              />
            </div>
            <div className="inputGroup">
              <label>نوع المبني:</label>
              <input
                type="text"
                id="SubUsedCode"
                name="SubUsedCode"
                 value={filteredData?.SubUsedCode}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
          <div className="row">
            <div className="inputGroup">
              <label>وصف المبنى:</label>
              <input
                type="text"
                id="description"
                name="description"
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
         
          <div className="row">
            <div className="inputGroup">
              <label>
                <input
                  type="checkbox"
                  name="architecturalCompliance"
                  onChange={handleCheckboxChange}
                />
                التحقق من المخططات المعمارية
              </label>
            </div>
            <div className="inputGroup">
              <label>
                <input
                  type="checkbox"
                  name="structuralCompliance"
                  onChange={handleCheckboxChange}
                />
                التحقق من المخططات الإنشائية
              </label>
            </div>
          </div>

          {/* File Upload Field */}
          <div className="row">
            <div className="inputGroup">
              <label>تحميل الملف:</label>
              <input
                type="file"
                className="input"
                onChange={handleFileChange}
              />
              {selectedFile && <p>تم اختيار الملف: {selectedFile.name}</p>}
            </div>
          </div>

          {/* Button to trigger file upload */}
          <div className="row">
            <button
              type="button"
              className="submitButton"
              onClick={handleFileUpload}
              disabled={isUploading}
            >
              {isUploading ? "جاري التحميل..." : "رفع الملف"}
            </button>
          </div>

          {/* Response Message */}
          {uploadResponse && <p>{uploadResponse}</p>}


          
        </form>
      </div>
    </div>
  );
};

export default RequestServices;
