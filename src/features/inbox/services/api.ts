import { post } from "../../../services";
import { acceptLeagueInviteUrl, rejectLeagueInviteUrl } from "../constants";

export function acceptLeagueInvite(messageId: string) {
  return post(acceptLeagueInviteUrl, { messageId });
}

export function rejectLeagueInvite(messageId: string) {
  return post(rejectLeagueInviteUrl, { messageId });
}
