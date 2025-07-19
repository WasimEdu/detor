import React, { useState } from "react";
import "../../styles/Auth/GhostLoginForm.css";
import { Link } from "react-router-dom";

const GhostLoginForm = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ghost login as:", username);
    // TODO: Hook to backend (limited auth/session)
  };

  return (
    <div className="ghost-container">
      <div className="ghost-box glass">
        <h2>Enter Ghost Mode 👻</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a Ghost Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <button type="submit" className="ghost-btn">
            Enter
          </button>
        </form>

        <p className="back-link">
          Want full access? <Link to="/login">Login Instead</Link>
        </p>
      </div>
    </div>
  );
};

export default GhostLoginForm;
