import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/layout/Navbar.css";
import { MdOutlineLogin } from "react-icons/md";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">Surface</div>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <IoMdMenu />
        </div>

        {/* Desktop links */}
        <ul className="navbar-links-desktop">
          <li>
            <Link to="/" className="home">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
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

        <Link to="/login" className="navbar-cta-desktop">
          Login <MdOutlineLogin />
        </Link>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="close-icon" onClick={() => setMenuOpen(false)}>
            <IoMdClose />
          </button>
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
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
              onClick={() => setMenuOpen(false)}
            >
              GitHub
            </a>
          </li>
        </ul>

        <Link to="/login" className="navbar-cta" onClick={() => setMenuOpen(false)}>
          Login <MdOutlineLogin />
        </Link>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
