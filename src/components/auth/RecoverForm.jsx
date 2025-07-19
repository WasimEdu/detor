import React, { useState, useEffect } from "react";
import "../../styles/Auth/RecoverForm.css";
import { Link } from "react-router-dom";

const RecoveryForm = () => {
  const [phrase, setPhrase] = useState(Array(8).fill(""));

  const handleChange = (index, value) => {
    const updated = [...phrase];
    updated[index] = value.trim().toLowerCase();
    setPhrase(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const joined = phrase.join(" ");
    console.log("Submitted Recovery Phrase:", joined);
    // Send `joined` to backend for verification
    alert("Recovery phrase submitted. (Demo)");
  };

  return (
    <div className="recovery-wrapper">
      <div className="recovery-glass">
        <form onSubmit={handleSubmit}>
          <h2 className="recovery-title">Recover Account</h2>
          <p className="recovery-subtext">Enter your 8-word recovery phrase to continue</p>

          <div className="recovery-grid">
            {phrase.map((word, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Word ${index + 1}`}
                value={word}
                onChange={(e) => handleChange(index, e.target.value)}
                required
              />
            ))}
          </div>

          <button type="submit" className="btn-recovery">Verify</button>

          <p className="recovery-footer">
            <Link to="/login">← Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RecoveryForm;
