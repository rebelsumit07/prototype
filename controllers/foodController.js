const Food = require("../models/Food");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Get all food items (public)
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new food
exports.addFood = async (req, res) => {
  try {
    const { name, description, price, category, available } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image required" });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "menu_items" });
    fs.unlinkSync(req.file.path); // Remove temp file

    const newFood = new Food({
      name,
      description,
      price,
      category,
      available,
      imageUrl: result.secure_url
    });
    await newFood.save();
    res.json(newFood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit food item
exports.editFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, available } = req.body;

    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    // Update image if new file uploaded
    if (req.file) {
      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "menu_items" });
      fs.unlinkSync(req.file.path);
      food.imageUrl = result.secure_url;
    }

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;
    food.available = available !== undefined ? available : food.available;

    await food.save();
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete food item
exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
