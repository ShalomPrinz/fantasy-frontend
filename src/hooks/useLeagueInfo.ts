import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { LEAGUE_ID_LENGTH } from "../constants";
import { getLeagueInfo } from "../services";
import { isLeagueAdmin, parseLeague } from "../types";
import type { DetailedLeague } from "../types";

const getLeagueIdFromPath = (path: string) => {
  const split = path.split("/");
  const slashCount = split.length - 1;
  if (slashCount < 2) return "";
  return split[2];
};

const useLeagueInfo = (userId: string) => {
  const { pathname } = useLocation();
  const leagueId = getLeagueIdFromPath(pathname);

  const [loading, setLoading] = useState(true);
  const [league, setLeague] = useState<DetailedLeague | undefined>(undefined);

  const isAdmin = isLeagueAdmin(league, userId);

  useEffect(() => {
    setLoading(true);
    if (leagueId.length === LEAGUE_ID_LENGTH) {
      getLeagueInfo(leagueId)
        .then((res) => {
          const league = parseLeague(res?.data?.league);
          setLeague(league);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [leagueId]);

  return { league, isAdmin, isLoading: loading };
};

export default useLeagueInfo;
