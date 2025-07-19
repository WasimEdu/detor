import React, { useState, useEffect } from "react";
import "../../styles/Auth/RecoverForm.css";
import { Link } from "react-router-dom";

const RecoveryForm = () => {
  // Simulated saved recovery phrase
  const fullPhrase = ["owl", "green", "planet", "river", "cloud", "jump", "signal", "trust"];

  // Create hidden word indexes
  const [hiddenIndexes, setHiddenIndexes] = useState([]);
  const [userInputs, setUserInputs] = useState({});

  useEffect(() => {
    const shuffled = [...Array(8).keys()].sort(() => 0.5 - Math.random());
    setHiddenIndexes(shuffled.slice(0, 4));
  }, []);

  const handleChange = (index, value) => {
    setUserInputs((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build final guess from user inputs + visible words
    const guessPhrase = fullPhrase.map((word, i) =>
      hiddenIndexes.includes(i) ? userInputs[i]?.trim().toLowerCase() : word
    );

    const isMatch = guessPhrase.join(" ") === fullPhrase.join(" ");

    if (isMatch) {
      alert("✅ Identity Verified! Proceed to reset password.");
      // navigate to password reset or show form
    } else {
      alert("❌ Recovery phrase mismatch. Please try again.");
    }
  };

  return (
    <div className="recovery-container">
      <div className="recovery-box">
        <form onSubmit={handleSubmit}>
          <h1>Recover Account</h1>
          <p>Fill in the missing words from your 8-word recovery phrase.</p>

          <div className="recovery-grid">
            {fullPhrase.map((word, index) => (
              <div className="recovery-word" key={index}>
                {hiddenIndexes.includes(index) ? (
                  <input
                    type="text"
                    placeholder={`Word ${index + 1}`}
                    value={userInputs[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    required
                  />
                ) : (
                  <span className="visible-word">{word}</span>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="btn">Verify</button>

          <div className="back-link">
            <Link to="/login">← Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryForm;
