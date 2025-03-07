import React, { useState } from "react";
import AdminPage from "./components/AdminPage";
import EventPage from "./components/EventPage";

const App = () => {
  const [showEvents, setShowEvents] = useState(false);

  const handleEventAdded = () => {
    setShowEvents(true);
  };

  return (
    <div>
      {showEvents ? <EventPage /> : <AdminPage onEventAdded={handleEventAdded} />}
    </div>
  );
};

export default App;
