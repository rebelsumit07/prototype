const Order = require("../models/Order");
const { nanoid } = require("nanoid"); // For unique uppercase order IDs

// Helper to generate orderId
function generateOrderId() {
  const id = nanoid(6).toUpperCase();
  return "ORD" + id;
}

// Customer places order
exports.placeOrder = async (req, res) => {
  try {
    const { customerName, phone, address, items } = req.body;
    if (!customerName || !phone || !address || !items || !items.length)
      return res.status(400).json({ message: "Invalid order data" });

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderId = generateOrderId();

    const order = new Order({
      orderId,
      customerName,
      phone,
      address,
      items,
      total
    });

    await order.save();
    res.json({ message: "Order placed", orderId, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders (admin)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single order by orderId
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status
exports.updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, remarks } = req.body;

    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    if (remarks) order.remarks = remarks;

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
