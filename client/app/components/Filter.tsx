import React, { useEffect, useState } from "react";
import {
  ActiveTab,
  BetStatus,
  FiltersProps,
  TransactionType,
} from "../utils/constants";

interface FilterProps {
  activeTab: ActiveTab;
  filters: FiltersProps;
  onChange: (filters: FiltersProps) => void;
}

const Filter: React.FC<FilterProps> = ({ activeTab, filters, onChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const filterOptions =
    activeTab === ActiveTab.MyBets ? BetStatus : TransactionType;

  useEffect(() => {
    setSelectedFilter(null);
  }, [activeTab]);

  const handleButtonClick = (value: string) => {
    const newFilters: FiltersProps = { ...filters };

    if (activeTab === ActiveTab.MyBets) {
      newFilters.status = value;
    } else {
      newFilters.type = value;
    }

    if (selectedFilter === value) {
      setSelectedFilter(null);
      newFilters.status = undefined;
      newFilters.type = undefined;
    } else {
      setSelectedFilter(value);
    }

    onChange(newFilters);
  };

  return (
    <div className="flex items-end gap-2">
      <h3 className="text-md text-primary mb-1">Filter by:</h3>
      <div className="flex gap-2">
        {Object.values(filterOptions).map((filterValue) => (
          <button
            key={filterValue}
            onClick={() => handleButtonClick(filterValue)}
            className={`text-sm border border-primary rounded hover:bg-primary hover:text-white transition-colors px-2 py-1  ${
              selectedFilter === filterValue ? "bg-primary" : "bg-background"
            }`}
          >
            {filterValue}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
