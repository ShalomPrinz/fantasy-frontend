import { playersUrl, usersUrl } from "../constants";
import { RegisterUser } from "../types/User";
import { get, post } from "./http";

export function getPlayers() {
  return get(playersUrl);
}

export function registerUser(userInfo: RegisterUser) {
  return post(usersUrl, userInfo);
}
