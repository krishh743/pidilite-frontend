import React, { useState } from 'react';
import TabSwitcher from '../../../components/Tabs-Switcher';
import VariationList from './variation-list/VariationList';
import OngoingGames from './ongoing-games/OngoingGames';
import CompletedGames from './completed-games/CompletedGames';


const LiveGamesPages = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: 'Variation List' },
    { id: 2, label: "Ongoing" },
    { id: 3, label: "Completed" },
  ];

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="">
      <div>
        <TabSwitcher
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {activeTab === 1 && <VariationList />}
        {activeTab === 2 && <OngoingGames/>}
        {activeTab === 3 && <CompletedGames/>}

      </div>
    </div>
  );
};

export default LiveGamesPages;