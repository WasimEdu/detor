import React, { useState } from "react";
import "@/styles/auth/RecoverForm.css";
import { Link } from "react-router-dom";

// Simulated full 8-word seed (backend should handle this in real case)
  const fullSeed = [
    "apple", "raven", "light", "glass",
    "code", "zone", "orbit", "lava",
    "mind", "drum", "echo", "solar"
  ];

  const RecoveryForm = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [seedState, setSeedState] = useState(Array(12).fill(""));
  const [prefilledIndexes, setPrefilledIndexes] = useState([]);
  const [error, setError] = useState("");

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simulated valid username check
    const isValid = username === "demo";

    if (isValid) {
      // Randomly pick 4 unique indexes
      const indices = [];
      while (indices.length < 6) {
        const r = Math.floor(Math.random() * 12);
        if (!indices.includes(r)) indices.push(r);
      }

      // Populate seedState based on those indexes
      const newSeedState = [...seedState];
      indices.forEach((i) => (newSeedState[i] = fullSeed[i]));

      setSeedState(newSeedState);
      setPrefilledIndexes(indices);
      setStep(2);
    } else {
      setError("Username not found.");
    }
  };

    const handleWordChange = (index, value) => {
    const updated = [...seedState];
    updated[index] = value.trim().toLowerCase();
    setSeedState(updated);
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    const joinedSeed = seedState.join(" ");
    console.log("Username:", username);
    console.log("Full Seed:", joinedSeed);

    // TODO: Send joinedSeed and username to backend for vault decryption
    alert("Recovery submitted (demo only).");
  };

  return (
    <div className="recovery-wrapper">
      <div className="recovery-glass">
        {step === 1 ? (
          <form onSubmit={handleUsernameSubmit}>
            <h2 className="recovery-title">Recover Account</h2>
            <p className="recovery-subtext">Enter your username to begin recovery</p>
            <input
              type="text"
              placeholder="Username"
              className="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {error && <p style={{ color: "salmon", textAlign: "center" }}>{error}</p>}
            <button type="submit" className="next-btn">Next</button>
            <p className="recovery-footer">
              <Link to="/login">← Back to Login</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRecoverySubmit}>
            <h2 className="recovery-title">Verify Seed Phrase</h2>
            <p className="recovery-subtext">Complete your 8-word phrase below to recover access:</p>

            <div className="recovery-grid">
              {seedState.map((word, idx) =>
                prefilledIndexes.includes(idx) ? (
                  <input
                    key={idx}
                    type="text"
                    value={word}
                    disabled
                    readOnly
                    className="prefilled"
                  />
                ) : (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Word ${idx + 1}`}
                    value={word}
                    onChange={(e) => handleWordChange(idx, e.target.value)}
                    required
                  />
                )
              )}
            </div>

            <button type="submit" className="btn-recovery">Verify</button>
            <p className="recovery-footer">
              <Link to="/login">← Back to Login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoveryForm;
