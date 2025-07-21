// src/crypto/generateSeed.js
import { generateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export function generateSeedPhrase() {
  return generateMnemonic(wordlist, 128); // 96 bits = 8 words
}
