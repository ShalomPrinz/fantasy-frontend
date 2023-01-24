import { playersUrl, usernamesUrl } from "../constants";
import { get } from "./http";

export function queryPlayers(term: string) {
  return get(playersUrl, { params: { term } });
}

export function queryUsers(term: string) {
  return get(usernamesUrl, { params: { term } });
}
