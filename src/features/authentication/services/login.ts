import {
  signOut as authSignOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../../services";

const signIn = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user.getIdToken();
};

const signOut = async () => authSignOut(auth);

export { signIn, signOut };
