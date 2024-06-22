import React, { useState } from 'react';
import TabSwitcher from '../../../components/Tabs-Switcher';
import ActiveVariation from './active-variation/ActiveVariation';
import ArchivedVariation from './archived-variation/ArchivedVariation';


const AdminSetup = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: 'Active Variation' },
    { id: 2, label: "Archived Variation" },

  ];

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="pl-4">
              <h1 className=' text-xl font-bold'>Setup</h1>

      <div>
        <TabSwitcher
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {activeTab === 1 && <ActiveVariation />}
        {activeTab === 2 && <ArchivedVariation/>}

      </div>
    </div>
  );
};

export default AdminSetup;