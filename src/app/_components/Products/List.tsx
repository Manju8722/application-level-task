"use client";
import { AlertCircleIcon, Grid2x2, Grid3x3 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./Card";
import { ProductsData } from "@/server/utils/data";
import type { Product } from "@/server/utils";
import { useProducts } from "@/hooks/use-queries";
import CardSkeleton from "./CardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProductPagination } from "./Pagination";

const List = () => {
  const { isLoading, isError, data: products, error } = useProducts();
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to Fetch products At the moment</AlertTitle>
        <AlertDescription>
          <div>
            <h2>some thing went wrong while fetching products</h2>
          </div>
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div>
      <div className="p-6">
        <div
          className={
            (products?.products && products.products.length > 0) || isLoading
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "w-full"
          }
        >
          {isLoading ? (
            new Array(10).fill("1").map((_, index) => {
              return <CardSkeleton key={index} />;
            })
          ) : products?.products && products.products.length > 0 ? (
            products.products.map((product, index: number) => (
              <ProductCard
                key={`${product?.id ?? ""}-${index}`}
                product={product as Product}
              />
            ))
          ) : (
            <div className="w-full text-center">
              <h2 className="text-2xl">No product Found</h2>
              <p>
                We couldn't find any products matching your current filters. Try
                adjusting your search criteria
              </p>
            </div>
          )}
        </div>

        <div className="my-3">
          <ProductPagination />
        </div>
      </div>
    </div>
  );
};

export default List;
