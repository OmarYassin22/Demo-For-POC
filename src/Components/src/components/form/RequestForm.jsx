import React, { useState } from 'react';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    number: '',
    ownerName: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
          Request Number
        </label>
        <input
          type="text"
          name="number"
          id="number"
          value={formData.number}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
          Owner Name
        </label>
        <input
          type="text"
          name="ownerName"
          id="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
        Submit Request
      </button>
    </form>
  );
};

export default RequestForm;