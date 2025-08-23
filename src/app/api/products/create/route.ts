import { DbConnection } from "@/server/db";
import { collectionNames, Product, ProductStatusEnum } from "@/server/utils";
import { validateProduct } from "@/server/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const errors = validateProduct(body);

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }
    const db = await DbConnection();
    const collection = db.collection(collectionNames.PRODUCTS);

    const existing = await collection.findOne({ name: body?.name.trim() });
    if (existing) {
      return NextResponse.json(
        { error: "Product with this name already exists" },
        { status: 409 }
      );
    }

    // Prepare product object with defaults
    const newProduct: Product = {
      name: body.name,
      price: body.price,
      stock: body.stock,
      category: body.category,
      description: body.description || "",
      images: body.images || [],
      vendor: body.vendor,
      status: body.status || ProductStatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newProduct);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
