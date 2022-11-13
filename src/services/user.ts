import { loginUrl, playersUrl, registerUrl, userInfoUrl } from "../constants";
import type { LoginUser, RegisterUser } from "../types/User";
import { auth, signInWithEmailAndPassword } from "./firebase";
import { get, post } from "./http";

export function getPlayers() {
  return get(playersUrl);
}

export function getUserInfo() {
  return get(userInfoUrl, { withCredentials: true });
}

export async function loginUser({ email, password }: LoginUser) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await user.getIdToken();
  await post(loginUrl, { idToken }, { withCredentials: true });
}

export async function registerUser(userInfo: RegisterUser) {
  await post(registerUrl, userInfo);
  await loginUser({
    email: userInfo.email,
    password: userInfo.password,
  });
}
