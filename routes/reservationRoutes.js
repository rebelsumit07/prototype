const express = require("express");
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  deleteReservation  // ✅ import this
} = require("../controllers/reservationController");

router.post("/", createReservation);
router.get("/", getAllReservations);
router.delete("/:id", deleteReservation);

module.exports = router;
