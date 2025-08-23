import type { Product, ProductCategory, ProductStatus } from "@/server/utils";

export type StatusType = {
  id: string;
  status: ProductStatus;
};

export type CategoryType = {
  id: string;
  name: ProductCategory;
};

export type Productlist = {
  limit: number;
  page: number;
  products: Product[];
  total: number;
  totalPages: number;
};
export const getAllStatus = async (): Promise<StatusType[]> => {
  return await (await fetch("/api/status")).json();
};

export const getAllCategories = async (): Promise<CategoryType[]> => {
  return await (await fetch("/api/categories")).json();
};

export const getAllProducts = async (params: any): Promise<Productlist> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params as Record<string, string | null | undefined>).filter(
      ([_, v]) => v !== null && v !== undefined && v !== ""
    )
  ) as Record<string, string>;

  const query = new URLSearchParams(cleanParams).toString();
  const url = query ? `/api/products?${query}` : "/api/products";
  return await (await fetch(url)).json();
};
