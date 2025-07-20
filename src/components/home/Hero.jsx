import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "@/styles/home/Hero.css";
import { FaGithub } from "react-icons/fa";


const Hero = () => {
  return (
    <section className="hero-container glass">
      <h1 className="hero-title">Privacy by Design, Freedom by Default.</h1>
      <p className="hero-subtext">
        The ultimate platform for those who value their privacy. No emails, no phone, just pure Anonymity.
      </p>
      <div className="hero-buttons">
        <Link to="/register">
          <button className="start-btn">Get Started</button>
        </Link>
        <button className="icon-btn" aria-label="GitHub">
          <FaGithub />
        </button>

      </div>
    </section>
  );
};

export default Hero;
