import { IconComponent, Message, Table } from "../../components";
import { UserState, useUser } from "../../contexts";
import { League } from "../../types";

interface LeaguesProps {
  leagues: League[];
}

const Leagues = ({ leagues }: LeaguesProps) => {
  const columns = [
    {
      id: 0,
      path: "name",
    },
    {
      id: 1,
      path: "members",
      content: ({ members }: League) => members.length,
    },
  ];
  return (
    <>
      <h1 className="text-center my-5 align-middle">
        My Leagues <IconComponent color="steelblue" icon="trophy" size="2" />
      </h1>
      <div className="w-50 p-3 my-2 mx-auto">
        <Table columns={columns} data={leagues} showTableHeader />
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
      return <Message color="success" text="You are already logged in." />;
  }
};

export default LeaguesWrapper;
