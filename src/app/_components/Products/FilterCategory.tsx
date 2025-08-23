"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories, useStatus } from "@/hooks/use-queries";
import { AlertCircleIcon } from "lucide-react";
import React, { useState } from "react";
import FilterAccordian from "./FilterAccordian";
import { CategoryType, StatusType } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "@/store/product";
import { parseAsString, useQueryState } from "nuqs";

const FilterCategory = () => {
  const {
    isLoading: isFetchingCategoryloading,
    isError: isFetchingCategoryError,
    data: categories,
    error: fetchingCategoriesError,
  } = useCategories();

  const [catergoryFilter, setcatergoryFilter] = useQueryState("category");
  const { category, setCategory } = useProductFilters();

  React.useEffect(() => {
    if (category !== catergoryFilter) {
      setcatergoryFilter(category);
    }
  }, [category, catergoryFilter, setCategory]);

  const [showMore, setShowMore] = useState(false);
  function onHandleShowMore() {
    setShowMore((value) => !value);
  }
  let template;
  if (isFetchingCategoryloading) {
    template = (
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  } else if (isFetchingCategoryError) {
    template = (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to Fetch Categories At the moment</AlertTitle>
        <AlertDescription>
          <div>
            <h2>some thing went wrong while fetching Categories</h2>
          </div>
        </AlertDescription>
      </Alert>
    );
  } else {
    template = (
      <div className="flex flex-col gap-y-2">
        {categories &&
          categories
            .map((status: CategoryType, index: number) => {
              return (
                <div
                  key={status.id ?? index}
                  className="flex items-center gap-3"
                >
                  <Checkbox
                    id={status.id}
                    checked={status.name == catergoryFilter}
                    onCheckedChange={(checked) =>
                      setCategory(checked ? status.name : null)
                    }
                  />
                  <Label className="text-md" htmlFor={status.id}>
                    {status.name}
                  </Label>
                </div>
              );
            })
            ?.slice(0, !showMore ? 6 : categories.length + 1)}
        {categories.length > 5 && (
          <Button onClick={onHandleShowMore}>
            {showMore ? "Show less" : "Show More"}
          </Button>
        )}
      </div>
    );
  }
  return <FilterAccordian title="Categories">{template}</FilterAccordian>;
};

export default FilterCategory;
