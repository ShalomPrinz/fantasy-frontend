import { useNavigate } from "react-router-dom";

import { IconComponent, InteractiveTable, Message } from "../../../components";
import { UserState, useUser } from "../../authentication";
import type { LeagueInfo } from "../types";

interface LeaguesProps {
  leagues: LeagueInfo[];
}

const Leagues = ({ leagues }: LeaguesProps) => {
  const navigate = useNavigate();
  const onLeagueSelection = ({ id }: LeagueInfo) => navigate(id);
  const onNewLeagueClick = () => navigate("/new-league");

  if (!leagues.length)
    return (
      <>
        <Message color="info" text="You are not a member of any league yet" />
        <NewLeagueButton onNewLeagueClick={onNewLeagueClick} />
      </>
    );

  const columns = [
    {
      id: 0,
      label: "League Title",
      path: "name",
    },
    {
      id: 1,
      label: "Members Number",
      content: ({ membersCount }: LeagueInfo) => membersCount,
    },
  ];

  return (
    <>
      <div className="text-center my-5 fs-1">My Leagues</div>
      <div className="w-50 my-2 mx-auto">
        <InteractiveTable
          columns={columns}
          data={leagues}
          onRowClick={onLeagueSelection}
        />
      </div>
      <NewLeagueButton onNewLeagueClick={onNewLeagueClick} />
    </>
  );
};

interface NewLeagueButtonProps {
  onNewLeagueClick: () => void;
}

function NewLeagueButton({ onNewLeagueClick }: NewLeagueButtonProps) {
  return (
    <button
      className="fs-3 bg-default rounded m-5 p-4 button-border-focus position-absolute bottom-0 start-0"
      onClick={onNewLeagueClick}
    >
      New League
      <IconComponent
        className="ms-3 pt-1 pb-2 align-middle"
        icon="plus"
        size="2"
      />
    </button>
  );
}

const LeaguesWrapper = () => {
  const { state, user } = useUser();

  switch (state) {
    case UserState.LOADING_USER:
      return <Message color="info" text="Loading..." />;

    case UserState.LOGGED_USER:
      return <Leagues leagues={user!.leagues} />;

    case UserState.NO_LOGGED_USER:
      return <Message color="danger" text="Please Log In to view your team" />;
  }
};

export default LeaguesWrapper;
