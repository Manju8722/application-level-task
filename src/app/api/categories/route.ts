import { DbConnection } from "@/server/db";
import { collectionNames } from "@/server/utils";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories
export async function GET(request: NextRequest) {
  try {
    const db = await DbConnection();
    const collection = db.collection(collectionNames.CATEGORY);

    const categories = await collection.find().toArray();

    if (!categories) {
      return NextResponse.json(
        { error: "categories not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
