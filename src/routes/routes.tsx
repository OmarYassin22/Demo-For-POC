// src/routes.tsx
import { Routes, Route } from 'react-router-dom';

import LoginPage from '../Components/Login';
import React from 'react';
import OfficeList from '../Components/OfficeList';
import Landing from '../Components/Landing';
import OfficeRequests from '../Components/OfficeRequests';


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path="*" element={<Landing />} /> */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/offices" element={<OfficeList />} />
      <Route path="/offices/:officeId/requests" element={<OfficeRequests />} />
 
      {/* <Route path="/offices/:officeId" element={<OfficeDetail />} />
      
      <Route path="/requests/:requestId" element={<RequestDetail />} /> */}
    </Routes>
  );
};
