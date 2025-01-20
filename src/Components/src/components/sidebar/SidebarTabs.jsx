const SidebarTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b">
      <button
        className={`py-2 px-4 ${activeTab === 'requests' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
        onClick={() => onTabChange('requests')}
      >
        Current Requests
      </button>
      <button
        className={`py-2 px-4 ${activeTab === 'form' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
        onClick={() => onTabChange('form')}
      >
        Request Form
      </button>
    </div>
  );
};

export default SidebarTabs;