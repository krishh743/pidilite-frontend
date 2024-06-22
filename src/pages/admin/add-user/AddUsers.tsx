import React, { useState } from 'react';
import TabSwitcher from '../../../components/Tabs-Switcher';
import AddusersPage from './AddUserPage/AddusersPage';
import UserArchived from './archived/UserArchived';



const AddUsers = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: ' Add User' },
    { id: 2, label: "Archived" },

  ];

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="pl-4">
      <div>
        <h1 className=' text-xl font-bold'>Add User</h1>
        <TabSwitcher
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {activeTab === 1 && <AddusersPage />}
        {activeTab === 2 && <UserArchived/>}

      </div>
    </div>
  );
};

export default AddUsers;