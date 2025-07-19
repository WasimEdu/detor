import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { MdOutlineLogin } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Surface</div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <IoMdMenu />
      </div>
        

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" className="home" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </li>
        <li>
          <a
            href="https://github.com/yourusername/yourrepo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>

      <Link
        to="/login"
        className={`navbar-cta ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        Login <MdOutlineLogin />
      </Link>
    </nav>
  );
};

export default Navbar;
