import {
  addPlayerUrl,
  createLeagueUrl,
  leagueInfoUrl,
  playersUrl,
  registerUrl,
  removePlayerUrl,
  userInfoUrl,
} from "../constants";
import type { CreateLeague, LoginUser, RegisterUser } from "../types";
import { signIn, signOut } from "./firebase";
import { get, post } from "./http";

export function queryPlayers(term: string) {
  return get(playersUrl, { params: { term } });
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

export async function logoutUser() {
  signOut();
}

export function addUserPlayer(id: number) {
  post(addPlayerUrl, { id });
}

export function removeUserPlayer(id: number) {
  post(removePlayerUrl, { id });
}

export function getLeagueInfo(id: string) {
  return get(leagueInfoUrl, { params: { id } });
}

export function createLeague({ name }: CreateLeague) {
  return post(createLeagueUrl, { name });
}
