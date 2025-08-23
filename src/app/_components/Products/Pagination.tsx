"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useProducts } from "@/hooks/use-queries";
import { useProductFilters } from "@/store/product";
import { parseAsInteger, useQueryState } from "nuqs";

export function ProductPagination() {
  const { page, setPage, limit, setlimit } = useProductFilters(); // custom hook managing filters
  const { data: Products } = useProducts();

  const [limitQuery, setlimitQuery] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10).withOptions({ clearOnDefault: false })
  );

  const [pageQuery, setPageQuery] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: false })
  );

  React.useEffect(() => {
    if (page !== pageQuery) {
      setPageQuery(page);
    }
  }, [page, pageQuery, setPageQuery]);

  React.useEffect(() => {
    if (limit !== limitQuery) {
      setlimitQuery(limit);
    }
  }, [limit, limitQuery, setlimitQuery]);

  if (!Products || !Products.products?.length) return null;

  const { totalPages } = Products;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="!w-auto mx-auto flex justify-end items-center gap-x-2">
      <PaginationLimit value={limit || limitQuery} onChange={setlimit} />

      <Pagination>
        <PaginationContent>
          {/* Prev Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page - 1);
              }}
            />
          </PaginationItem>

          {/* Page Links */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis if too many pages */}
          {totalPages > 5 && <PaginationEllipsis />}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export function PaginationLimit({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Limit">{value}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );
}
