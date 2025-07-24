// src/crypto/signMessage.js
import * as ed from '@noble/ed25519';

export async function signMessage(privateKeyBytes, message) {
  const encoder = new TextEncoder();
  const msgBytes = encoder.encode(message);

  const signature = await ed.sign(msgBytes, privateKeyBytes);
  return Buffer.from(signature).toString('hex');
}
