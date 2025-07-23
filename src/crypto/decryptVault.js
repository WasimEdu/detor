// src/crypto/decryptVault.js

export async function decryptVault(encryptedVault, password, salt, iv) {
  const encoder = new TextEncoder();

  const pwKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: Uint8Array.from(atob(salt), c => c.charCodeAt(0)),
      iterations: 100000,
      hash: "SHA-256",
    },
    pwKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: Uint8Array.from(atob(iv), c => c.charCodeAt(0)),
    },
    aesKey,
    Uint8Array.from(atob(encryptedVault), c => c.charCodeAt(0))
  );

  return decrypted; // ArrayBuffer
}
