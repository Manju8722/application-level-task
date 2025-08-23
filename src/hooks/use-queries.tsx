import { getAllCategories, getAllProducts, getAllStatus } from "@/lib/api";
import { ProductEnum } from "@/server/utils";
import { useProductFilters } from "@/store/product";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

export const useCategories = () => {
  const query = useQuery({
    queryKey: ["productsAllCategories"],
    queryFn: getAllCategories,
    staleTime: 0,
    retry: 2,
  });
  return query;
};

export const useStatus = () => {
  const query = useQuery({
    queryKey: ["productsAllStatus"],
    queryFn: getAllStatus,
    staleTime: 0,
    retry: 2,
  });
  return query;
};

export const useProducts = () => {
  const { category, status, page, limit, search, sortByField } =
    useProductFilters();

  return useQuery({
    queryKey: [
      "products",
      { category, status, page, limit, search, sortByField },
    ],
    queryFn: () =>
      getAllProducts({ category, status, page, limit, search, sortByField }),
    // keepPreviousData: true,
    staleTime: 0,
    retry: 2,
  });
};
