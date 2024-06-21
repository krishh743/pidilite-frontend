import React from 'react';

interface Tab {
  id: number;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (tabId: number) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-0 justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === tab.id
                ? ' text-primary font-bold'
                : 'border-b-0  text-[#5f5b5b] hover:text-tertiary-black-color'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;
