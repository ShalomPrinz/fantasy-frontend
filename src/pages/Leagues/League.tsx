import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

import {
  IconComponent,
  InteractiveTable,
  Message,
  TeamLayout,
} from "../../components";
import type { InteractiveTableColumn } from "../../components";
import { LEAGUE_TEAM_LAYOUT_MAX_WIDTH } from "../../constants";
import { TeamProvider, useTeamUpdate } from "../../contexts";
import { UserState, useUser } from "../../features/authentication";
import { useLeagueInfo } from "../../hooks";
import { User } from "../../types";

interface LeagueProps {
  userId: string;
}

function LeagueComponent({ userId }: LeagueProps) {
  const { league, isAdmin, isLoading } = useLeagueInfo(userId);
  const { isActive, onRowClick } = useViewUpdate(userId);

  if (isLoading)
    return <Message color="info" text="Loading League Information..." />;
  if (typeof league === "undefined")
    return <Message color="danger" text="You are not member of this league." />;

  const columns: InteractiveTableColumn[] = [
    {
      id: 0,
      label: "Members",
      path: "name",
    },
  ];

  if (isAdmin) columns[0].labelComponent = <InviteMembersLabel />;

  return (
    <main className="container">
      <Row>
        <Col className="text-center" sm="4">
          <h1 className="mx-auto my-4 p-3">{league.name}</h1>
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

function InviteMembersLabel() {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center">
      <h3 className="pt-2 ms-auto me-2">Members</h3>
      <button
        className="fs-4 bg-default rounded py-2 px-3 ms-auto"
        onClick={() => navigate("invite")}
        type="button"
      >
        Invite
        <IconComponent className="pe-0 ps-2" icon="invite" />
      </button>
    </div>
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
