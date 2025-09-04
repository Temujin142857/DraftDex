import { useState, useEffect } from "react";

const Uploading = () => {
  const [rosterName, setRosterName] = useState("");
  const [rosterFile, setRosterFile] = useState(null);
  const [comments, setComments] = useState([]);

  // Simulated initial data
  const initialRoster = {
    name: "My Awesome Roster",
    content: `
      1. Pikachu
      2. Charizard
      3. Blastoise
      4. Venusaur
      5. Gengar
      6. Dragonite
      7. Alakazam
      8. Machamp
      9. Gyarados
      10. Snorlax
      11. Arcanine
      12. Jolteon
    `,
  };

  // Simulated initial comments
  const initialComments = [
    { id: 1, author: "Player1", text: "Nice team composition!" },
    { id: 2, author: "Player2", text: "I love Pikachu!" },
    { id: 3, author: "Player3", text: "Needs more water types." },
  ];

  useEffect(() => {
    setRosterName(initialRoster.name);
    // Simulate loading comments after delay
    setTimeout(() => {
      setComments(initialComments);
    }, 1000);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 className={"text"}>Uploaded Roster: {rosterName}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <pre className={"text"}>{initialRoster.content}</pre>
      </div>

      <h2 className={"text"}>Comments</h2>
      <div>
        {comments.length === 0 ? (
          <p className={"text"}>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <p className={"text"}>
                <strong>{comment.author}:</strong> {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Uploading;
