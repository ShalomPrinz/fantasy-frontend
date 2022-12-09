import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { ConditionalList, Message } from "../../components";
import { LEAGUE_ID_LENGTH } from "../../constants";
import { UserState, useUser } from "../../contexts";
import { getLeagueInfo } from "../../services";
import { parseLeague } from "../../types";
import type { DetailedLeague, User } from "../../types";

function LeagueComponent() {
  const { league, isLoading } = useLeagueInfo();

  if (isLoading)
    return <Message color="info" text="Loading League Information..." />;
  if (typeof league === "undefined")
    return <Message color="danger" text="You are not member of this league." />;

  const memberCallback = ({ name }: User) => {
    return <h3>{name}</h3>;
  };

  return (
    <div className="w-50 mx-auto text-center fs-1">
      {league.name}
      <ConditionalList itemCallback={memberCallback} list={league.members} />
    </div>
  );
}

const LeagueWrapper = () => {
  const { state } = useUser();

  switch (state) {
    case UserState.LOADING_USER:
      return <Message color="info" text="Loading..." />;

    case UserState.LOGGED_USER:
      return <LeagueComponent />;

    case UserState.NO_LOGGED_USER:
      return <Message color="danger" text="Please Log In to view your team" />;
  }
};

const getLeagueIdFromPath = (path: string) => {
  const split = path.split("/");
  const slashCount = split.length - 1;
  if (slashCount < 2 || slashCount > 2) return "";
  return split[2];
};

const useLeagueInfo = () => {
  const { pathname } = useLocation();
  const leagueId = getLeagueIdFromPath(pathname);

  const [loading, setLoading] = useState(true);
  const [league, setLeague] = useState<DetailedLeague | undefined>(undefined);

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

  return { league, isLoading: loading };
};

export default LeagueWrapper;
