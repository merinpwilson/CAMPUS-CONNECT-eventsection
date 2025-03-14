import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios";
import "./AdminPage.css";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { title, date, description };

    try {
      const response = await axios.post("http://localhost:5000/api/events/add", newEvent);
      
      if (response.status === 201) {
        alert("✅ Event Added Successfully!");
        navigate("/events"); // Redirect to Event Page after success
      } else {
        alert("⚠ Something went wrong. Try again.");
      }

      setTitle("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.error("❌ Error adding event:", error.response?.data || error.message);
      alert("❌ Failed to add event");
    }
  };

  return (
    <div className="admin-container">
      <h1>📅 Add New Event</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AdminPage;
