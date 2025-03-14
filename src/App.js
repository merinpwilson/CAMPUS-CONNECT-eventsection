import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import EventPage from "./components/EventPage";
import RegisterPage from "./components/RegisterPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminWrapper />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/register/:eventId" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

// ✅ Wrapper Component to handle navigation
const AdminWrapper = () => {
  const navigate = useNavigate();

  const handleEventAdded = () => {
    navigate("/events"); // Redirect to EventPage after adding an event
  };

  return <AdminPage onEventAdded={handleEventAdded} />;
};

export default App;
