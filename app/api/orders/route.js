import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';

// Handles GET requests to fetch all orders (for admin)
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }); // Get newest orders first
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}

// Handles POST requests to create a new order
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newOrder = new Order({
      ...body,
    });

    const createdOrder = await newOrder.save();
    
    return NextResponse.json(
      { message: 'New Order Created', order: createdOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}