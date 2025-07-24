// src/components/LoginForm.jsx

import React, { useState } from "react";
import "@/styles/auth/LoginForm.css";
import { Link } from "react-router-dom";
import { decryptVault } from "@/crypto/decryptVault";
import { useAuth } from "@/hooks/useAuth"; // use your custom hook

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { auth, setAuth } = useAuth(); // grab both auth & setter from context

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

      // 2. Decrypt private key
      const decryptedKeyBuffer = await decryptVault(vault, password, salt, iv);

      // 3. Convert ArrayBuffer to Uint8Array
      const privateKey = new Uint8Array(decryptedKeyBuffer);

      // 4. Store in memory using useAuth context
      setAuth({ username, publicKey, privateKey });

      alert("✅ Login successful (private key in memory only)");
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

            {auth?.privateKey && (
              <p className="account-text">
                ✅ Logged in! <Link to="/sign-test">Test Sign Message</Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
