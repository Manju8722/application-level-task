import { DbConnection } from "@/server/db";
import { collectionNames, ProductEnum } from "@/server/utils";
import { NextRequest } from "next/server";

// GET request for paginated products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = searchParams.get("sortByField") || "createdAt";
    const sortOrder =
      searchParams.get("sortOrder")?.toLowerCase() === "asc" ? 1 : -1;

    // Filters
    const category = searchParams.get(ProductEnum.CATEGORY);
    const status = searchParams.get(ProductEnum.STATUS);
    const search = searchParams.get("search") || "";

    // MongoDB db
    const db = await DbConnection();

    // Build query
    const query: any = {};

    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // product name search
        { description: { $regex: search, $options: "i" } }, // description search
        { vendor: { $regex: search, $options: "i" } }, // vendor search
      ];
    }

    // Fetch data
    const products = await db
      .collection(collectionNames.PRODUCTS)
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Count total for pagination
    const total = await db
      .collection(collectionNames.PRODUCTS)
      .countDocuments(query);

    return new Response(
      JSON.stringify({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        products,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
