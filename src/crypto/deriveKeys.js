import * as ed from "@noble/ed25519";
import { mnemonicToSeedSync } from "@scure/bip39"; // switch this too
import { toHex } from "@/utils/hex";

export async function deriveKeypairFromSeed(seedPhrase) {
  const seed = mnemonicToSeedSync(seedPhrase).slice(0, 32);
  const privateKey = seed;
  const publicKey = await ed.getPublicKey(privateKey);

  return {
    privateKey: toHex(privateKey),
    publicKey: toHex(publicKey),
  };
}
