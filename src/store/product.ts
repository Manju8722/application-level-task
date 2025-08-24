// store/useProductFilters.ts
import { ProductCategory, ProductEnum, ProductStatus } from "@/server/utils";
import { create } from "zustand";

type Filters = {
  sortByField: string;
  sortOrderBy: "asc" | "desc";
  search: string | null;
  category: ProductCategory | null;
  status: ProductStatus | null;
  page: number;
  limit: number;
  setCategory: (category: ProductCategory | null) => void;
  setStatus: (status: ProductStatus | null) => void;
  setPage: (page: number) => void;
  setSerach: (search: string) => void;
  setlimit: (limit: number) => void;
  setsortByField: (sortByField: string) => void;
  setsortOrderBy: (search: "asc" | "desc") => void;
};

export const useProductFilters = create<Filters>((set) => ({
  sortOrderBy: "desc",
  sortByField: ProductEnum.CREATED_AT,
  search: null,
  category: null,
  status: null,
  page: 1,
  limit: 10,
  setCategory: (category) => set({ category, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
  setlimit: (limit: number) => set({ limit, page: 1 }),
  setSerach: (search: string) => set({ search, page: 1 }),
  setsortByField: (sortByField: string) => set({ sortByField, page: 1 }),
  setsortOrderBy: (sortOrderBy: "asc" | "desc") => set({ sortOrderBy }),
}));
