import { DbConnection } from "@/server/db";
import { collectionNames, CollectionNameType } from "@/server/utils";
import {
  CategoryData,
  ProductsData,
  ProductStatusData,
} from "@/server/utils/data";
import { Db } from "mongodb";

async function onClearAllPreviousData(db: Db) {
  try {
    await db.collection(collectionNames.CATEGORY).deleteMany();
    await db.collection(collectionNames.STATUS).deleteMany();
    await db.collection(collectionNames.PRODUCTS).deleteMany();
  } catch (error) {
    throw error;
  }
}

async function onInsertManyData(
  db: Db,
  collectionName: CollectionNameType,
  data: any[]
) {
  try {
    await db.collection(collectionName).insertMany(data);
  } catch (error) {
    throw error;
  }
}
export async function POST(request: Request) {
  try {
    const db = await DbConnection();

    // Clear previous data
    await onClearAllPreviousData(db);

    // Insert seed data
    await onInsertManyData(db, collectionNames.CATEGORY, CategoryData);
    await onInsertManyData(db, collectionNames.STATUS, ProductStatusData);
    await onInsertManyData(db, collectionNames.PRODUCTS, ProductsData);

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Successfully seeded data to DB!",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Seeding error:", error);

    return new Response(
      JSON.stringify({
        status: "error",
        message: error?.message || "Something went wrong while seeding data",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
