import { Product } from ".";

// Manual validation function
export function validateProduct(data: Product) {
  const errors: string[] = [];
  if (!data.name || typeof data.name !== "string") {
    errors.push("Name is required and must be a string.");
  }
  if (
    data.price === undefined ||
    typeof data.price !== "number" ||
    data.price < 0
  ) {
    errors.push("Price is required and must be a non-negative number.");
  }
  if (
    data.stock === undefined ||
    typeof data.stock !== "number" ||
    data.stock < 0
  ) {
    errors.push("Stock is required and must be a non-negative number.");
  }
  if (!data.category || typeof data.category !== "string") {
    errors.push("Category is required and must be a string.");
  }
  if (!data.vendor || typeof data.vendor !== "string") {
    errors.push("Vendor is required and must be a string.");
  }

  // Optional fields
  if (data.description && typeof data.description !== "string") {
    errors.push("Description must be a string if provided.");
  }
  if (data.images && !Array.isArray(data.images)) {
    errors.push("Images must be an array of strings.");
  }
  if (data.status && !["active", "inactive", "draft"].includes(data.status)) {
    errors.push("Status must be one of 'active', 'inactive', or 'draft'.");
  }

  return errors;
}
