"use client";
import { useState } from "react";
import { ActiveTab, FiltersProps } from "../utils/constants";
import Filter from "./Filter";
import MyBets from "./MyBets";
import MyTransactions from "./MyTransactions";

const ListView: React.FC = () => {
  const [filters, setFilters] = useState<FiltersProps>({});
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.MyBets);

  const handleFilterChange = (newFilters: FiltersProps) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const renderTabs = (
    activeTab: ActiveTab,
    onTabChange: (tab: ActiveTab) => void
  ) => (
    <div className="flex gap-2">
      <button
        className={`border border-primary rounded hover:bg-primary hover:text-white transition-colors px-6 py-2 ${
          activeTab === ActiveTab.MyBets ? "bg-primary" : "bg-background"
        }`}
        onClick={() => onTabChange(ActiveTab.MyBets)}
      >
        Bets
      </button>
      <button
        className={`border border-primary rounded hover:bg-primary hover:text-white transition-colors px-6 py-2 ${
          activeTab === ActiveTab.MyTransactions
            ? "bg-primary"
            : "bg-background"
        } `}
        onClick={() => onTabChange(ActiveTab.MyTransactions)}
      >
        Transactions
      </button>
    </div>
  );

  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-2 items-center">
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-between">
        {renderTabs(activeTab, setActiveTab)}
        <Filter
          activeTab={activeTab}
          onChange={handleFilterChange}
          filters={filters}
        />
      </div>

      {activeTab === ActiveTab.MyBets && <MyBets filters={filters} />}
      {activeTab === ActiveTab.MyTransactions && (
        <MyTransactions filters={filters} />
      )}
    </div>
  );
};

export default ListView;
