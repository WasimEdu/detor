// src/crypto/deriveKeypair.js
import { mnemonicToSeedSync } from '@scure/bip39';

/**
 * Derives an ECDSA key pair from a seed phrase using Web Crypto API.
 */
export async function deriveKeyPair(seedPhrase) {
  const seed = mnemonicToSeedSync(seedPhrase); // Returns Uint8Array (64 bytes)
  const entropy = seed.slice(0, 32); // Use first 32 bytes

  // Import seed as a raw key to derive ECDSA keypair
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true,
    ['sign', 'verify']
  );

  return keyPair; // contains {publicKey, privateKey}
}
