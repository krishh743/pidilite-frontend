import React, { useState } from 'react';
import TabSwitcher from '../../../components/Tabs-Switcher';
import GamesList from './games-list/GamesList';
import OnGoingList from './ongoing-list/OnGoingList';
import ArchivesList from './archives/ArchivesList';

import "./TrainerPage.css"

const TrainerGamePlay = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: 'Games List' },
    { id: 2, label: "Ongoing games" },
    { id: 3, label: "Archives" },

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
        {activeTab === 1 && <GamesList />}
        {activeTab === 2 && <OnGoingList/>}
        {activeTab === 3 && <ArchivesList/>}

      </div>
    </div>
  );
};

export default TrainerGamePlay;