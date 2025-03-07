const express = require("express");
const router = express.Router();
const Event=require("../models/event")

// ✅ Route to Add a New Event
router.post("/add", async (req, res) => {
  try {
    const { title, date, description } = req.body;
    
    // 🔹 Check if all fields are provided
    if (!title || !date || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 🔹 Create new event
    const newEvent = new Event({ title, date, description });
    await newEvent.save();
    
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("❌ Error saving event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Route to Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by date
    res.status(200).json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
