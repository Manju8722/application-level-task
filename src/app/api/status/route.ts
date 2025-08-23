import { DbConnection } from "@/server/db";
import { collectionNames } from "@/server/utils";
import { NextRequest, NextResponse } from "next/server";

// GET /api/status
export async function GET(request: NextRequest) {
  try {
    const db = await DbConnection();
    const collection = db.collection(collectionNames.STATUS);

    const status = await collection.find().toArray();

    if (!status) {
      return NextResponse.json({ error: "status not found" }, { status: 404 });
    }

    return NextResponse.json(status, { status: 200 });
  } catch (error) {
    console.error("Error fetching status:", error);
    return NextResponse.json(
      { error: "Failed to fetch status" },
      { status: 500 }
    );
  }
}
