import React from 'react';
import RequestForm from '../form/RequestForm';

const SidebarContent = ({ activeTab }) => {
  return (
    <div>
      {activeTab === 'current' ? (
        <div>
          {/* Current component content goes here */}
          <h2>Current Requests</h2>
          {/* Add your current requests display logic here */}
        </div>
      ) : (
        <RequestForm />
      )}
    </div>
  );
};

export default SidebarContent;