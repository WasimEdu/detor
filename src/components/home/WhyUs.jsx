import React from "react";
import "@/styles/home/WhyUs.css";
import privacyIcon from "@/assets/icons/privacy.svg";
import fastIcon from "@/assets/icons/fast.svg";
import openSourceIcon from "@/assets/icons/open-source.png";

const WhyUs = () => {
  const features = [
    {
      icon: privacyIcon,
      title: <h3>Privacy</h3>,
      description: "Surface requires no signups, does no tracking, and keeps your identity private.",
    },
    {
      icon: fastIcon,
      title: <h3>Fast</h3>,
      description: "Surface is super fast and lightweight — built for instant communication.",
    },
    {
      icon: openSourceIcon,
      title: <h3>Open Source</h3>,
      description: (
        <>
          Surface is Open-source and on <a href="https://github.com/WasimEdu?tab=repositories" style={{ color: '#2563eb'}}>GitHub</a>  explore, audit, and contribute freely.
        </>
      )
    },
    {
      icon: fastIcon,
      title: <h3>Secure</h3>,
      description: "Surface is built with strong encryption and privacy-first principles.",
    },

    {
      icon: openSourceIcon,
      title: <h3>Media Sharing</h3>,
      description: "Seamlessly share images and videos — anonymously and instantly."
    },

    {
      icon: openSourceIcon,
      title: <h3>No Ads, No Clutter</h3>,
      description: " Surface is clean, distraction-free experience with no ads, ever."
    },
    

    
  ];

  return (
    <section className="why-us-section">
      <h3>Why Surface?</h3>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.icon} alt={feature.icon} className="feature-icon" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;

