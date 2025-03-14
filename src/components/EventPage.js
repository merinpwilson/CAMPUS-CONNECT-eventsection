import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EventPage.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="event-container">
      <h1 className="event-title">🎉 Upcoming College Events</h1>
      <div className="event-list">
        {events.map((event) => {
          // Extracting date parts
          const eventDate = new Date(event.date);
          const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
          const formattedDate = eventDate.toLocaleDateString("en-US", options);
          const [weekday, month, day] = formattedDate.split(" ");

          return (
            <div
              key={event._id}
              className="event-card"
              onClick={() => navigate(`/register/${event._id}`)}
              style={{ cursor: "pointer" }} // Makes it obvious that it's clickable
            >
              {/* Date Box */}
              <div className="date-box">
                <span className="date-weekday">{weekday.toUpperCase()}</span>
                <br />
                <span className="date-month">{month.toUpperCase()}</span>
                <br />
                <span className="date-day">{day}</span>
              </div>

              {/* Event Info */}
              <div className="event-info">
                <h2>{event.title}</h2>
                <p>{formattedDate}</p>
                <p>{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventPage;
