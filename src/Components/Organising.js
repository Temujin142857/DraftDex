import React, { useState } from "react";

// Mock data for game sessions
const mockGameSessions = [
  {
    id: 1,
    title: "Game Session 1",
    date: "2024-07-10",
    time: "15:00",
    location: "Virtual",
  },
  {
    id: 2,
    title: "Game Session 2",
    date: "2024-07-12",
    time: "19:00",
    location: "Physical",
  },
  {
    id: 3,
    title: "Game Session 3",
    date: "2024-07-15",
    time: "14:30",
    location: "Virtual",
  },
];

const GameOrganizingPage = () => {
  const [gameSessions, setGameSessions] = useState(mockGameSessions);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const handleAddSession = () => {
    if (
      !newSession.title ||
      !newSession.date ||
      !newSession.time ||
      !newSession.location
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const updatedSessions = [
      ...gameSessions,
      { id: gameSessions.length + 1, ...newSession },
    ];
    setGameSessions(updatedSessions);
    setNewSession({ title: "", date: "", time: "", location: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 className={"text"}>Game Sessions Organizing</h2>
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h3 className={"text"}>Add New Session</h3>
        <input
          type="text"
          name="title"
          value={newSession.title}
          onChange={handleInputChange}
          placeholder="Session Title"
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
        <input
          type="date"
          name="date"
          value={newSession.date}
          onChange={handleInputChange}
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
        <input
          type="time"
          name="time"
          value={newSession.time}
          onChange={handleInputChange}
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
        <input
          type="text"
          name="location"
          value={newSession.location}
          onChange={handleInputChange}
          placeholder="Session Location"
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
        <button onClick={handleAddSession}>Add Session</button>
      </div>

      <div>
        {gameSessions.map((session) => (
          <div
            key={session.id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <h3 className={"text"}>{session.title}</h3>
            <p className={"text"}>Date: {session.date}</p>
            <p className={"text"}>Time: {session.time}</p>
            <p className={"text"}>Location: {session.location}</p>
            <button>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameOrganizingPage;
