export const collectionNames = {
  CATEGORY: "category",
  STATUS: "status",
  PRODUCTS: "products",
} as const;

export type CollectionNameType =
  (typeof collectionNames)[keyof typeof collectionNames];

export const ProductCategoryEnum = {
  ELECTRONICS: "Electronics",
  MOBILES: "Mobiles",
  COMPUTERS: "Computers",
  FASHION: "Fashion",
  HOME_KITCHEN: "Home & Kitchen",
  SPORTS: "Sports",
  BOOKS: "Books",
  GROCERIES: "Groceries",
  TOYS: "Toys",
  BEAUTY: "Beauty",
} as const;

export type ProductCategory =
  (typeof ProductCategoryEnum)[keyof typeof ProductCategoryEnum];

export const ProductStatusEnum = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
  OUT_OF_STOCK: "out-of-stock",
  DISCONTINUED: "discontinued",
  PENDING: "pending",
  DRAFT: "draft",
  HIDDEN: "hidden",
  DELETED: "deleted",
} as const;

// Union Type
export type ProductStatus =
  (typeof ProductStatusEnum)[keyof typeof ProductStatusEnum];

export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
  category: ProductCategory;
  description?: string;
  images: string[] | [];
  vendor: string;
  status: ProductStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductEnum = {
  ID: "id",
  NAME: "name",
  PRICE: "price",
  STOCK: "stock",
  CATEGORY: "category",
  DESCRIPTION: "description",
  IMAGES: "images",
  VENDOR: "vendor",
  STATUS: "status",
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
} as const;
