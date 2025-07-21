// src/components/RegisterForm.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/auth/RegisterForm.css';

import { generateSeedPhrase } from '@/crypto/generateSeed';
import { deriveKeyPair } from '@/crypto/deriveKeypair';
import { encryptVault } from '@/crypto/encryptVault';
import { arrayBufferToBase64 } from '@/utils/base64';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSeed, setShowSeed] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const seedPhrase = generateSeedPhrase();

      // Derive keypair
      const { privateKey, publicKey } = await deriveKeyPair(seedPhrase);

      // Export keys
      const privateKeyBytes = await crypto.subtle.exportKey('pkcs8', privateKey);
      const publicKeyBytes = await crypto.subtle.exportKey('spki', publicKey);
      const publicKeyBase64 = arrayBufferToBase64(publicKeyBytes);

      // Encrypt private key into vault
      const { vault, salt, iv } = await encryptVault(privateKeyBytes, password);

      // Send to backend
      const payload = {
        username,
        publicKey: publicKeyBase64,
        vault,
        salt,
        iv,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowSeed(seedPhrase);
      } else {
        const data = await res.json();
        alert(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong.');
    }
  };

  if (showSeed) {
    return (
      <div className="register-container">
        <div className="register-box">
          <h2>Save Your Seed Phrase</h2>
          <p>Save the phares, This is your only way to recover your account.</p>
          
          <div className="seed-grid">
             {showSeed.split(' ').map((word, index) => (
              <div key={index} className="seed-word">
                {word}
               </div>
            ))}
          </div>

          <Link to="/login" className="go-login-btn">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <form onSubmit={handleRegister}>
          <h2>Create Account</h2>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="register-btn">Register</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
