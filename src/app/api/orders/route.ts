import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/orders — save checkout order and items to database
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone, address, city, total, notes, items } = body;

    // Validate required fields
    if (!customerName || !phone || !address || !city || !total || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
    }

    // Create order and nested order items in a transaction
    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        city,
        total: parseFloat(total),
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order in database:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
