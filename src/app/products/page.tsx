"use client";
import React, { useState } from "react";
import ProductSorting from "../_components/Products/ProductSorting";
import List from "../_components/Products/List";
import { useProductFilters } from "@/store/product";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import FilterStatus from "../_components/Products/FilterStatus";
import FilterCategory from "../_components/Products/FilterCategory";
import { SlidersHorizontal } from "lucide-react";
const ProductIndexPage = () => {
  const { search } = useProductFilters();
  return (
    <div className="flex flex-col w-full justify-between">
      <div className="flex items-center px-4  mt-4 justify-between">
        <div className="flex items-center gap-x-4">
          {search && <h2>Seach results for :{search} </h2>}
        </div>
        <div className="flex items-center gap-x-4">
          <div className="block lg:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  Filters
                  <SlidersHorizontal />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex flex-col gap-y-4">
                  <FilterStatus />
                  <FilterCategory />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-x-2">
            <span>SortBy:</span>
            <ProductSorting />
          </div>
        </div>
      </div>
      <List />
    </div>
  );
};

export default ProductIndexPage;
