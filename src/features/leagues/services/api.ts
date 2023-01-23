import { get, post } from "../../../services";
import {
  createLeagueUrl,
  inviteLeagueMemberUrl,
  leagueInfoUrl,
} from "../constants";
import type { CreateLeague } from "../types";

export function createLeague({ name }: CreateLeague) {
  return post(createLeagueUrl, { name });
}

export function getLeagueInfo(id: string) {
  return get(leagueInfoUrl, { params: { id } });
}

/** @param {string} to User Id  */
export function inviteLeagueMember(to: string, leagueId: string) {
  return post(inviteLeagueMemberUrl, { to, leagueId });
}
