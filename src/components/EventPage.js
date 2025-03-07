import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./EventPage.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("❌ Error fetching events", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-container">
      <h1>🎉 Upcoming College Events</h1>
      <div className="event-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-date">
              <span>{moment(event.date).format("ddd")}</span>
              <br />
              {moment(event.date).format("MMM DD")}
            </div>
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>{moment(event.date).format("dddd, MMMM DD, YYYY")}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
