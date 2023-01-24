import { get, post } from "../../../services";
import { registerUrl, userInfoUrl } from "../constants";
import { LoginUser, RegisterUser } from "../types";
import { signIn, signOut } from "./login";

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
