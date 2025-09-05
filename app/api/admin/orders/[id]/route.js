import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import Order from '../../../../../models/Order';

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    await dbConnect();
    const { status } = await req.json();

    const order = await Order.findById(id);

    if (order) {
      order.status = status;

      // --- UPDATED LOGIC ---
      // isPaid is only true if status is "Verified & Paid"
      if (status === 'Verified & Paid') {
        order.isPaid = true;
        order.paidAt = Date.now();
      } else {
        // If status is changed back to pending, mark it as not paid
        order.isPaid = false;
        order.paidAt = null;
      }
      // --- END OF UPDATED LOGIC ---

      const updatedOrder = await order.save();
      return NextResponse.json({ success: true, data: updatedOrder });
    } else {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}