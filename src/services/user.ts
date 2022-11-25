import {
  addPlayerUrl,
  playersUrl,
  registerUrl,
  removePlayerUrl,
  userInfoUrl,
} from "../constants";
import type { LoginUser, RegisterUser } from "../types/User";
import { signIn } from "./firebase";
import { get, post } from "./http";

export function getPlayers() {
  return get(playersUrl);
}

export function getUserInfo() {
  return get(userInfoUrl);
}

export async function loginUser({ email, password }: LoginUser) {
  return await signIn(email, password);
}

export async function registerUser(userInfo: RegisterUser) {
  await post(registerUrl, userInfo);
  return await loginUser({
    email: userInfo.email,
    password: userInfo.password,
  });
}

export function addUserPlayer(id: number) {
  post(addPlayerUrl, { id });
}

export function removeUserPlayer(id: number) {
  post(removePlayerUrl, { id });
}
