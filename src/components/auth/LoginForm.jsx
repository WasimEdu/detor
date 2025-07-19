import React, { useState } from "react";
import "../../styles/Auth/LoginForm.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login credentials:", formData);
    // TODO: backend auth
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
