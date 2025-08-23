"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useStatus } from "@/hooks/use-queries";
import { AlertCircleIcon } from "lucide-react";
import React, { useState } from "react";
import FilterAccordian from "./FilterAccordian";
import { StatusType } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { useProductFilters } from "@/store/product";

const FilterStatus = () => {
  const {
    isLoading: isFetchingStatusloading,
    isError: isFetchingStatusError,
    data: statuses,
    error: fetchingStatusError,
  } = useStatus();

  const [statusFilter, setstatusFilter] = useQueryState("status");
  const { status, setStatus } = useProductFilters();

  React.useEffect(() => {
    if (statusFilter !== status) {
      setstatusFilter(status);
    }
  }, [status, statusFilter, setStatus]);
  const [showMore, setShowMore] = useState(false);

  function onHandleShowMore() {
    setShowMore((value) => !value);
  }
  let template;
  if (isFetchingStatusloading) {
    template = (
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  } else if (isFetchingStatusError) {
    template = (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to Fetch Status At the moment</AlertTitle>
        <AlertDescription>
          <div>
            <h2>some thing went wrong while fetching status</h2>
          </div>
        </AlertDescription>
      </Alert>
    );
  } else {
    template = (
      <div className="flex flex-col gap-y-2">
        {statuses &&
          statuses
            ?.map((status: StatusType, index: number) => {
              return (
                <div
                  key={status.id ?? index}
                  className="flex items-center gap-3"
                >
                  <Checkbox
                    id={status.id}
                    checked={status.status === statusFilter}
                    onCheckedChange={(checked) => {
                      setStatus(checked ? status.status : null);
                    }}
                  />
                  <Label className="text-md" htmlFor={status.id}>
                    {status.status}
                  </Label>
                </div>
              );
            })
            ?.slice(0, !showMore ? 6 : statuses.length + 1)}
        {statuses.length > 5 && (
          <Button onClick={onHandleShowMore}>
            {showMore ? "Show less" : "Show More"}
          </Button>
        )}
      </div>
    );
  }
  return <FilterAccordian title="Status">{template}</FilterAccordian>;
};

export default FilterStatus;
