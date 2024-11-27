import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { type UserAuth } from "@/types";

const auth = getAuth();

export const create = (user: UserAuth) => {
  const email = user.username + "@io.chat";
  return createUserWithEmailAndPassword(auth, email, user.password);
}

export const login = (user: UserAuth) => {
  const email = user.username + "@io.chat";
  return signInWithEmailAndPassword(auth, email, user.password);
}

export const logout = () => {
  return signOut(auth);
}

