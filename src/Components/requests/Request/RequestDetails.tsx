import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Tabs,
  TabList,
  TabPanel,
  Tab,
  TabPanels,
} from "../../../@/components/ui/tabs";

import RequestInfo from "./RequestInfo";
import Services from "./Services";
import RequestDocuments from "./RequestDocuments";
import InspectionReport from "./InspectionReport";

import "../../common/linesAnimation.css";

// Add interfaces if not already defined
interface FormDataobj {
  // Include all the properties needed for Services component
  // This should match the interface in Services.tsx
  OldLicense: string;
  KrookiNumber: number;
  // ...other properties
}

export default function RequestDetails() {
  const { id, requestid } = useParams();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState<any>({});
  const [requestData, setRequestData] = useState<FormDataobj | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    // Fetch request details
    const fetchData = async () => {
      try {
        // Fetch request details
        // ... existing fetch code ...
        
        // In the same request or in a separate request, fetch the data needed for Services component
        // Example:
        const response = await fetch(`/api/requests/${requestid}/data`);
        const data = await response.json();
        setRequestData(data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    
    // For demo purposes, you might want to use mock data
    // This simulates getting data that would normally come from an API
    const mockData = {
      // Add mock data properties here
      OldLicense: "123456",
      KrookiNumber: 12345,
      // ... other needed fields
    };
    setRequestData(mockData as FormDataobj);
  }, [id, requestid]);

  // ...existing code...

  return (
    <div>
      <div className="lines-animation">
        <div className="lines-container">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>

      {/* ...existing code... */}

      <Tabs
        defaultValue="tab1"
        className="px-10 py-5 w-full"
        onChange={(value) => {
          setCurrentTab(Number(value.replace("tab", "")));
        }}
      >
        <TabList className="flex justify-start p-1 text-right bg-white w-fit rounded-md gap-2">
          <Tab value="tab1" className="py-2 px-4">
            طلب
          </Tab>
          <Tab value="tab2" className="py-2 px-4">
            الخدمات
          </Tab>
          <Tab value="tab3" className="py-2 px-4">
            المستندات
          </Tab>
          <Tab value="tab4" className="py-2 px-4">
            تقرير الفحص
          </Tab>
        </TabList>
        <TabPanels className="mt-5 bg-white border border-gray-200 p-5 rounded-lg overflow-hidden">
          <TabPanel value="tab1">
            <RequestInfo requestid={requestid} officeid={id} />
          </TabPanel>

          <TabPanel value="tab2">
            <Services
              KrookiNumber={45815034595}
              officeId={id || ""}
              requestId={requestid || ""}
              amanaName="أمانة منطقة الرياض"
              baladiaName="بلدية شمال الرياض"
              requestData={requestData || undefined} // Pass the fetched data
            />
          </TabPanel>

          <TabPanel value="tab3">
            <RequestDocuments />
          </TabPanel>

          <TabPanel value="tab4">
            <InspectionReport />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
