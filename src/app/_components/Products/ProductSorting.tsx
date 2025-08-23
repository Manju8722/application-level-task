"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";
import { ProductEnum } from "@/server/utils";
import { parseAsString, useQueryState } from "nuqs";
import { useProductFilters } from "@/store/product";

export default function ProductSorting() {
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString
      .withDefault(ProductEnum.CREATED_AT)
      .withOptions({ clearOnDefault: false })
  );

  const { sortByField, setsortByField } = useProductFilters();

  React.useEffect(() => {
    if (sortByField !== sortBy) {
      setSortBy(sortByField);
    }
  }, [sortByField, sortBy, setSortBy]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="capitalize">{sortBy}</span>
          <ArrowDownUp />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuCheckboxItem
          checked={sortBy == ProductEnum.CREATED_AT}
          onCheckedChange={() => setsortByField(ProductEnum.CREATED_AT)}
        >
          <span className="capitalize">{ProductEnum.CREATED_AT}</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy == ProductEnum.STATUS}
          onCheckedChange={() => setsortByField(ProductEnum.STATUS)}
        >
          <span className="capitalize"> {ProductEnum.STATUS}</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy == ProductEnum.PRICE}
          onCheckedChange={() => setsortByField(ProductEnum.PRICE)}
        >
          <span className="capitalize"> {ProductEnum.PRICE}</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy == ProductEnum.NAME}
          onCheckedChange={() => setsortByField(ProductEnum.NAME)}
        >
          <span className="capitalize"> {ProductEnum.NAME}</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy == ProductEnum.STOCK}
          onCheckedChange={() => setsortByField(ProductEnum.STOCK)}
        >
          <span className="capitalize"> {ProductEnum.STOCK}</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
