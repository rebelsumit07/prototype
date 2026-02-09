const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Order Received", "Processing", "Out for Delivery", "Delivered", "Canceled"],
    default: "Received"
  },
  remarks: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);

