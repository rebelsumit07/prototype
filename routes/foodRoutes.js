const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllFoods, addFood, editFood, deleteFood } = require("../controllers/foodController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // temp storage for Cloudinary

router.get("/", getAllFoods);
router.post("/", authMiddleware, upload.single("image"), addFood);
router.put("/:id", authMiddleware, upload.single("image"), editFood);
router.delete("/:id", authMiddleware, deleteFood);

module.exports = router;
