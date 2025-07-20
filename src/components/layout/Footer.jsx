import React from "react";
import "@/styles/layout/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Surface. All rights reserved.</p>
      <p>
        <a href="https://github.com/yourusername/yourrepo" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>{" "}
        | Contact: <a href="mailto:hello@surface.com">hello@surface.com</a>
      </p>
    </footer>
  );
};

export default Footer;
