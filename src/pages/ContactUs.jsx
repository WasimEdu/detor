import React, { useState } from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="contact-container">
      <h2>Contact Us</h2>
      <p className="contact-subtext">
        Got questions, suggestions, or issues? Reach out to us directly. We value your feedback!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your UserName" required />
        {/* <input type="email" placeholder="Your Email" required /> */}
        <textarea placeholder="Your Message" rows="6" required></textarea>
        <button type="submit">Send Message ➜</button>
      </form>

      {submitted && <p className="form-success">✅ Your message has been sent!</p>}

      <p className="contact-alt">
        You can also email us directly at <a href="mailto:team@surfaceapp.com">team@surfaceapp.com</a>
      </p>
    </section>
  );
};

export default ContactUs;
