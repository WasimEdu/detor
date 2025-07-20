import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from '@/components/layout/Footer';

import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import ContactUs from "@/pages/ContactPage";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from '@/pages/auth/RegisterPage';
import GhostLoginPage from "@/pages/auth/GhostLoginPage";
import RecoverPage from "@/pages/auth/RecoverPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ghost-mode" element={<GhostLoginPage />} />
        <Route path="/recover-account" element={<RecoverPage />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
