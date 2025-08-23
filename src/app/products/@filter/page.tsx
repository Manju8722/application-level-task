import FilterCategory from "@/app/_components/Products/FilterCategory";
import FilterStatus from "@/app/_components/Products/FilterStatus";
import { useStatus } from "@/hooks/use-queries";
import React from "react";

const FilterPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-center my-3">Filters</h2>
      <div className="flex flex-col gap-y-2">
        <FilterStatus />
        <FilterCategory />
      </div>
    </div>
  );
};

export default FilterPage;
