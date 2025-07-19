import React from "react";
import "../styles/about.css";

const AboutPage = () => {
  return (
    <div className="welcome">
      <section className="about-intro">
        <h1>Welcome to Surface</h1>
        <p>
          <strong>Surface</strong> is an open-source, privacy-focused communication
          platform built for the modern digital world. No emails, no phone
          numbers, no tracking — just pure anonymity, speed, and security. We
          empower users across the globe to speak, share, and connect freely.
        </p>
      </section>

      <section className="open-source & github">
        <h2>Open Source & GitHub</h2>
        <p>
          Surface is proudly open source. We welcome contributions from
          developers, designers, privacy advocates, and curious minds alike.
          Explore our codebase, suggest improvements, and be part of something
          meaningful.
        </p>
        <a
          href="https://github.com/yourusername/yourrepo"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub ↗
        </a>
      </section>

      <section className="community">
        <h2>Global Community</h2>
        <p>
          From students and activists to developers and creators — Surface is
          used by individuals across the world. Join our growing global
          community that believes in a free and open internet.
        </p>
      </section>

      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>
          In an era where personal data is the new currency, we believe in
          giving control back to the user. Our mission is to provide a safe
          digital space where freedom of expression thrives without the fear of
          surveillance, censorship, or profiling.
        </p>
      </section>

      <section className="core-values">
        <h2>Core Values</h2>
        <ul>
          <li><strong>Privacy by Default:</strong> No unnecessary data collection.</li>
          <li><strong>Open Source:</strong> Transparent, community-driven development.</li>
          <li><strong>Freedom of Speech:</strong> A censorship-resistant platform.</li>
          <li><strong>Speed & Simplicity:</strong> Optimized for performance and usability.</li>
          <li><strong>Security:</strong> Encryption and protections built into every layer.</li>
        </ul>
      </section>

      <section className="tech-stack">
        <h2>Technology Stack</h2>
        <p>
          Surface is built with a modern tech stack optimized for speed,
          scalability, and security:
        </p>
        <ul>
          <li>React + Vite (Frontend)</li>
          <li>Node.js + Express (Backend)</li>
          <li>Socket.io (Real-time Messaging)</li>
          <li>MongoDB (Database)</li>
          <li>TailwindCSS (Styling & Responsiveness)</li>
        </ul>
      </section>



      <section className="future-plans">
        <h2>Our Roadmap</h2>
        <ul>
          <li>🔒 End-to-End Encryption (coming soon)</li>
          <li>📱 Mobile Apps for Android & iOS</li>
          <li>🌐 Decentralized Infrastructure</li>
          <li>🧩 Plugin Architecture & Extensions</li>
        </ul>
      </section>

      <footer className="about-footer">
        <p>
          Made with ❤️ by the Surface Team. <br />
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
