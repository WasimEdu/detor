import { signMessage } from "@/crypto/signMessage";
import { useAuth } from "@/hooks/useAuth";

/**
 * Returns a function you can call to sign messages using the logged-in private key.
 */
export function useMessageSigner() {
  const { auth } = useAuth();

  return async (message) => {
    if (!auth?.privateKey) {
      throw new Error("No private key loaded. Please login.");
    }
    return await signMessage(auth.privateKey, message);
  };
}
