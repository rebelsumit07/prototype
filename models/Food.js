const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, default: "General" },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Food", FoodSchema);
