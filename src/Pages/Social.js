import React, { useState } from "react";
import Organising from "../Components/Organising";
import Uploading from "../Components/Uploading";
import Header from "../Components/Header";

// Mock data for rosters
const mockRosters = [
  { id: 1, name: "Roster A", comments: [] },
  { id: 2, name: "Roster B", comments: [] },
  { id: 3, name: "Roster C", comments: [] },
];

const Social = () => {
  const [rosters, setRosters] = useState(mockRosters);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event, rosterId) => {
    const updatedRosters = rosters.map((roster) =>
      roster.id === rosterId ? { ...roster, newComment } : roster,
    );
    setRosters(updatedRosters);
    setNewComment("");
  };

  return (
    <div
      style={{
        backgroundColor: "#302B2B",
        textAlign: "center",
        minHeight: "100vh",
        paddingBottom: "20px",
      }}
    >
      <Header></Header>
      <div style={{ display: "flex", alignContent: "space-between" }}>
        <Uploading></Uploading>
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
          <h2 className={"text"}>Share and Comment on Rosters</h2>
          {rosters.map((roster) => (
            <div
              key={roster.id}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <h3 className={"text"}>{roster.name}</h3>
              <div style={{ marginBottom: "10px" }}>
                {roster.comments.map((comment, index) => (
                  <div key={index} className={"text"}>
                    {comment}
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{ marginRight: "10px", padding: "5px" }}
              />
              <button
                onClick={() => handleCommentChange(newComment, roster.id)}
              >
                Add Comment
              </button>
            </div>
          ))}
        </div>
        <Organising></Organising>
      </div>
    </div>
  );
};

export default Social;
