import { useEffect, useState } from "react";

import { useTeamState, useTeamUpdate } from "../contexts";
import { queryPlayers } from "../services";
import { getFullName, Player } from "../types";

import { IconComponent, PlayerJersey, Search, Table } from "./";

function PlayersTable() {
  const [players, setPlayers] = useState([]);

  function handleQuery(query: string) {
    queryPlayers(query).then((res) => setPlayers(res.data.players || []));
  }

  // Load first players. This should be replaced later with loader from react-router
  useEffect(() => handleQuery(""), []);

  const { addPlayer, removePlayer } = useTeamUpdate();
  const team = useTeamState();

  const columns = [
    {
      id: 0,
      path: "team",
      content: ({ team }: Player) => <PlayerJersey team={team} width="60px" />,
    },
    {
      id: 1,
      path: "name",
      content: (p: Player) => (
        <>
          <div className="fs-4">{getFullName(p)}</div>
          <div className="text-muted">
            {p.team}, {p.role}
          </div>
        </>
      ),
    },
    {
      id: 2,
      content: (p: Player) => {
        const inTeam = team.contains(p);
        const icon = inTeam ? "check" : "plus";
        const iconStyle = inTeam ? "light-success" : "primary";
        const onClick = () => (inTeam ? removePlayer(p) : addPlayer(p));

        return (
          <div className="text-center">
            <IconComponent
              className={`text-${iconStyle}`}
              icon={icon}
              onClick={onClick}
              size="3"
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Search onChange={handleQuery} />
      <Table columns={columns} data={players} />
      {!players.length && <h3 className="text-center">No Players Found</h3>}
    </>
  );
}

export default PlayersTable;
