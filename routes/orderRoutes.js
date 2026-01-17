const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { placeOrder, getOrders, getOrderById, updateStatus } = require("../controllers/orderController");

// Customer routes
router.post("/", placeOrder);
router.get("/:orderId", getOrderById);

// Admin routes
router.get("/", authMiddleware, getOrders);
router.put("/:orderId/status", authMiddleware, updateStatus);

module.exports = router;
