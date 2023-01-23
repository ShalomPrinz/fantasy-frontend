import { Team } from "../../../types";

interface Member {
  id: string;
  name: string;
  team: Team;
  role: string;
}

interface LeagueInfo {
  id: string;
  membersCount: number;
  name: string;
}

interface DetailedLeague {
  id: string;
  members: Member[];
  name: string;
}

interface CreateLeague {
  name: string;
}

function isLeagueAdmin(league: DetailedLeague | undefined, userId: string) {
  const member = league?.members.find((m) => m.id === userId);
  return member?.role === "admin";
}

/** Receive member from response, Returns app member object */
function parseMember(member: any) {
  const { id, username, team, role } = member;
  const memberTeam = new Team(team, true);
  const appMember: Member = {
    id,
    name: username,
    team: memberTeam,
    role,
  };
  return appMember;
}

/** Receive league from response, Returns app league object */
export function parseLeague(league: any) {
  if (typeof league === "undefined") return undefined;
  const { id, name, members } = league;
  const leagueMembers = members.map((m: any) => parseMember(m));
  const appLeague: DetailedLeague = {
    id,
    name,
    members: leagueMembers,
  };
  return appLeague;
}

export { isLeagueAdmin };
export type { CreateLeague, DetailedLeague, LeagueInfo };
