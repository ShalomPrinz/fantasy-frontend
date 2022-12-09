import { parseUser, User } from "./User";

interface League {
  id: string;
  members: string[];
  name: string;
}

interface DetailedLeague {
  id: string;
  members: User[];
  name: string;
}

/** Receive league from response, Returns app league object */
export function parseLeague(league: any) {
  if (typeof league === "undefined") return undefined;
  const { id, name, members } = league;
  const leagueMembers = members.map((m: any) => parseUser(m));
  const appLeague: DetailedLeague = {
    id,
    name,
    members: leagueMembers,
  };
  return appLeague;
}

export type { DetailedLeague, League };
