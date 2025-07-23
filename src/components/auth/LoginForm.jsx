import React, { useState } from "react";
import "@/styles/auth/LoginForm.css";
import { Link } from "react-router-dom";

// Utility: decrypt vault using password
async function decryptVault(encryptedVault, password, salt, iv) {
  const encoder = new TextEncoder();

  // 1. Import password key
  const pwKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // 2. Derive AES key from password + salt
  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: Uint8Array.from(atob(salt), (c) => c.charCodeAt(0)),
      iterations: 100000,
      hash: "SHA-256",
    },
    pwKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  // 3. Decrypt vault
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)),
    },
    aesKey,
    Uint8Array.from(atob(encryptedVault), (c) => c.charCodeAt(0))
  );

  return decrypted; // ArrayBuffer
}

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      // 1. Fetch vault data from backend
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Login failed.");
        return;
      }

      const { vault, salt, iv, publicKey } = await res.json();

      // 2. Decrypt private key from vault
      const decryptedKey = await decryptVault(vault, password, salt, iv);
      const privateKeyArray = Array.from(new Uint8Array(decryptedKey));
      console.log("✅ Decrypted Private Key:", privateKeyArray);

      // 3. Store in sessionStorage
      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          username,
          publicKey,
          privateKey: privateKeyArray,
        })
      );

      alert("Login successful (private key loaded in memory)");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container glass-effect">
        <div className="login-left hide-on-mobile">
          <h2>Welcome to Surface</h2>
          <p>Your identity is yours alone.</p>
          <p>No phone. No email. Just you.</p>
          <Link to="/register">
            <button className="outline-btn">Create Account</button>
          </Link>
        </div>

        <div className="login-right">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-links">
              <Link to="/recover-account">Forgot Password?</Link>
              <Link to="/ghost-mode">Ghost Mode</Link>
            </div>

            <button type="submit" className="btn-primary full-width">
              Login
            </button>

            <p className="account-text">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
