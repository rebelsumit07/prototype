const Reservation = require("../models/reservation");

// CREATE reservation (from frontend)
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    res.status(201).json({
      success: true,
      message: "Reservation saved successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// GET all reservations (for admin panel)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
