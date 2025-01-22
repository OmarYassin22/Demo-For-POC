import React, { useState, useEffect } from "react";

import jsonData from "../../../mocks/OfficeRequestServices.json"; // Import the JSON data
import Conditions from "../Conditions";


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
}

const Services: React.FC<ServicesProps> = ({ KrookiNumber }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<FormDataobj>();
  const handleStartService = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Filter JSON data based on criteria
  
    const filtered = jsonData.filter((item: FormDataobj) => {
      return item.KrookiNumber === KrookiNumber; // Example filter condition (MainUsedName === "سكني")
    });
    if (filtered.length === 0) {
      // Assuming 'mockData' is an array of mock items
      const randomItem = jsonData[Math.floor(Math.random() * jsonData.length)];
      setFilteredData(randomItem);
    } else {
      // Set the filtered data to state
      setFilteredData(filtered[0]);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        رقم القرار : {filteredData?.KrookiNumber} , تاريخ القرار:{" "}
        {filteredData?.KrookiIssueDate}
      </h2>
      <form>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                رقم القطع:
              </label>
              <input
                type="text"
                name="PlanNumber"
                value={filteredData?.LocationData.PlanNumber}
                //onChange={handleInputChange}
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
                //onChange={handleInputChange}
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
                نوع المبنى:{" "}
              </label>
              <input
                id="SubUsedCode"
                name="SubUsedCode"
                value={filteredData?.SubUsedCode}
                // onChange={handleInputChange}
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
                id="first_name"
                className="mt-1  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <label htmlFor="test1">التحقق من المخططات المعمارىة</label>
              <input type="checkbox" id="test1" name="test1" />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="test2">التحقق من المخططات الانشائية</label>
              <input type="checkbox" id="test2" name="test2" />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4  rounded-lg mb-6 pr-20">
          <div className="grid grid-cols-2 gap-6">
            <p>بدء الخدمة</p>
            <button
              type="submit"
              onClick={handleStartService}
              className="px-4 py-2 max-w-52 bg-blue-600 text-white rounded-lg"
            >
              بدء الخدمة
            </button>
          </div>
        </div>
      </form>

      <Conditions
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        Amana={filteredData?.LocationData.AmanahName || ""}
        Baladia={filteredData?.LocationData.BaladiyaName || ""}
        Hai={filteredData?.LocationData.DistrictName || ""}
        Land={filteredData?.LocationData.PlanNumber || ""}
      />
    </div>
  );
};

export default Services;
