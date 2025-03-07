import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-event", { title, date });
      alert("Event added successfully!");
      setTitle("");
      setDate("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AdminPanel;
