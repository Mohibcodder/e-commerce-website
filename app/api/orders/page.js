import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();
    const newOrder = new Order({
      ...req.body,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  } else {
    // This can be used for admin to fetch all orders
    await dbConnect();
    const orders = await Order.find({});
    res.send(orders);
  }
}