import { post } from "../../../services";
import { addPlayerUrl, removePlayerUrl } from "../constants";

export function addUserPlayer(id: number) {
  post(addPlayerUrl, { id });
}

export function removeUserPlayer(id: number) {
  post(removePlayerUrl, { id });
}
