import { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";

import { InteractiveTable, Message, TeamLayout } from "../../components";
import {
  LEAGUE_ID_LENGTH,
  LEAGUE_TEAM_LAYOUT_MAX_WIDTH,
} from "../../constants";
import {
  TeamProvider,
  UserState,
  useTeamUpdate,
  useUser,
} from "../../contexts";
import { getLeagueInfo } from "../../services";
import { parseLeague, User } from "../../types";
import type { DetailedLeague } from "../../types";

interface LeagueProps {
  userId: string;
}

function LeagueComponent({ userId }: LeagueProps) {
  const { league, isLoading } = useLeagueInfo();
  const { isActive, onRowClick } = useViewUpdate(userId);

  if (isLoading)
    return <Message color="info" text="Loading League Information..." />;
  if (typeof league === "undefined")
    return <Message color="danger" text="You are not member of this league." />;

  const columns = [
    {
      id: 0,
      label: "Nickname",
      path: "name",
    },
  ];

  return (
    <main className="container">
      <Row>
        <Col sm="4">
          <h1 className="mx-auto text-center my-4 p-3">{league.name}</h1>
          <InteractiveTable
            columns={columns}
            data={league.members}
            isActive={isActive}
            onRowClick={onRowClick}
          />
        </Col>
        <Col className="mt-5" sm="8">
          <TeamLayout maxWidth={LEAGUE_TEAM_LAYOUT_MAX_WIDTH} />
        </Col>
      </Row>
    </main>
  );
}

const LeagueWrapper = () => {
  const { state, user } = useUser();

  switch (state) {
    case UserState.LOADING_USER:
      return <Message color="info" text="Loading..." />;

    case UserState.LOGGED_USER:
      return (
        <TeamProvider initialTeam={user!.team}>
          <LeagueComponent userId={user!.id} />
        </TeamProvider>
      );

    case UserState.NO_LOGGED_USER:
      return (
        <Message color="danger" text="Please Log In to view this league" />
      );
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

const useViewUpdate = (userId: string) => {
  const { switchTeam } = useTeamUpdate();
  const [selectedUserId, setSelectedUserId] = useState(userId);

  const isActive = ({ id }: User) => id === selectedUserId;
  const onRowClick = ({ id, team }: User) => {
    switchTeam(team);
    setSelectedUserId(id);
  };

  return {
    isActive,
    onRowClick,
  };
};

export default LeagueWrapper;
