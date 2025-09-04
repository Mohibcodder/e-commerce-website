import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Order from '../../../../models/Order';

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    await dbConnect();
    const { status } = await req.json();

    const order = await Order.findById(id);

    if (order) {
      order.status = status;
      // Agar status "Paid" ya "Shipped" hai to payment status bhi update kar sakte hain
      if (status === 'Verified & Paid' || status === 'Shipped') {
        order.isPaid = true;
        order.paidAt = Date.now();
      }
      const updatedOrder = await order.save();
      return NextResponse.json({ success: true, data: updatedOrder });
    } else {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}