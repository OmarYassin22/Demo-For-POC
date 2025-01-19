import React from 'react';
import { useParams } from 'react-router-dom';

const RequestsPage: React.FC = () => {
  // Use useParams to extract the `id` from the URL
  const { officeId } = useParams<{ officeId: string }>();

  return (
    <div>
      <h1>Requests for Office ID: {officeId}</h1>
    </div>
  );
};

export default RequestsPage;
