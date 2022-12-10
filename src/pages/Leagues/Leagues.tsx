import { useNavigate } from "react-router-dom";

import { IconComponent, InteractiveTable, Message } from "../../components";
import { UserState, useUser } from "../../contexts";
import { League } from "../../types";

interface LeaguesProps {
  leagues: League[];
}

const Leagues = ({ leagues }: LeaguesProps) => {
  const navigate = useNavigate();
  const onLeagueSelection = ({ id }: League) => navigate(id);

  if (!leagues.length)
    return (
      <Message color="info" text="You are not a member of any league yet" />
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
      content: ({ members }: League) => members.length,
    },
  ];

  return (
    <>
      <h1 className="text-center my-5 align-middle">
        My Leagues <IconComponent color="steelblue" icon="trophy" size="2" />
      </h1>
      <div className="w-50 my-2 mx-auto fs-5 text-center">
        <InteractiveTable
          columns={columns}
          data={leagues}
          onRowClick={onLeagueSelection}
        />
      </div>
    </>
  );
};

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
