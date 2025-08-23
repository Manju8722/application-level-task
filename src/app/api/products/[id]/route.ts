import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { DbConnection } from "@/server/db";
import { collectionNames } from "@/server/utils";
import { validateProduct } from "@/server/utils/validation";

interface RouteParams {
  params: { id: string };
}
// GET /api/products/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const db = await DbConnection();
    const collection = db.collection(collectionNames.PRODUCTS);

    const { id } = params;

    // ✅ validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const errors = validateProduct(body);

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const db = await DbConnection();
    const collection = db.collection(collectionNames.PRODUCTS);

    // Check if product exists
    const productId = new ObjectId(params.id);
    // ✅ validate ObjectId
    if (!ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const existing = await collection.findOne({ _id: productId });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // If updating name, check uniqueness
    if (body.name) {
      const duplicate = await collection.findOne({
        name: body.name.trim(),
        _id: { $ne: productId },
      });
      if (duplicate) {
        return NextResponse.json(
          { error: "Another product with this name already exists" },
          { status: 409 }
        );
      }
    }

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    await collection.updateOne({ _id: productId }, { $set: updateData });

    return NextResponse.json(
      { success: true, message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("PUT /api/products/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DElETE /api/products/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await DbConnection();
    const collection = db.collection(collectionNames.PRODUCTS);

    const productId = new ObjectId(params.id);

    // ✅ validate ObjectId
    if (!ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const existing = await collection.findOne({ _id: productId });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await collection.deleteOne({ _id: productId });

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("DELETE /api/products/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
