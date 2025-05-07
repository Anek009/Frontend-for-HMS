// src/Components/UI/Tabs.tsx

import React from 'react';

type TabProps = {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-4 border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-2 px-4 font-semibold ${
            tab === activeTab
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
