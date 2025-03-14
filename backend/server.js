const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");
const registerRoutes = require("./routes/registerRoutes");
const sendConfirmationEmail = require("./config/emailConfig"); // Import email function
const Registration = require("./models/Registration"); // Import Registration model
const Event = require("./models/event"); // Import Event model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/register", registerRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Registration Route with Email Confirmation
app.post("/api/register", async (req, res) => {
  try {
    const { name, department, semester, email, phone, eventId } = req.body;

    // Fetch Event Details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const eventTitle = event.title;
    const eventDate = event.date; // Assuming 'date' field exists in Event model

    const newRegistration = new Registration({
      name,
      department,
      semester,
      email,
      phone,
      eventId,
      eventTitle,
    });

    await newRegistration.save();

    // Send Confirmation Email with Event Details
    if (sendConfirmationEmail) {
      await sendConfirmationEmail(email, name, eventTitle, eventDate);
      console.log(`📧 Confirmation email sent to ${email}`);
    } else {
      console.warn("⚠️ Email function not properly configured.");
    }

    res.status(200).json({ message: "Registration successful! Confirmation email sent." });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
