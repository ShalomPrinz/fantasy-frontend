import { loginUrl, playersUrl, registerUrl } from "../constants";
import type { LoginUser, RegisterUser } from "../types/User";
import { get, post } from "./http";

export function getPlayers() {
  return get(playersUrl);
}

export function loginUser(userInfo: LoginUser) {
  return post(loginUrl, userInfo);
}

export function registerUser(userInfo: RegisterUser) {
  return post(registerUrl, userInfo);
}
