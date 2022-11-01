import { playersUrl } from "../constants";
import { get } from "./http";

export function getPlayers() {
  return get(playersUrl);
}
