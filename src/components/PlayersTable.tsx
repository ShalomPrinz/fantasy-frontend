import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

import { useTeamState, useTeamUpdate } from "../contexts";
import { getIcon } from "../res";
import { getPlayers } from "../services";
import { getFullName, Player } from "../types";

import { PlayerJersey, Search, Table } from "./";

function PlayersTable() {
  const [query, setQuery] = useState("");

  const { data } = useQuery(["players"], getPlayers);
  const players = data?.data?.players || [];

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
            <FontAwesomeIcon
              className={`fa-3x clickable text-${iconStyle}`}
              icon={getIcon(icon)}
              onClick={onClick}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Search onChange={(v: string) => setQuery(v)} value={query} />
      <Table className="bg-white" columns={columns} data={players} />
    </>
  );
}

export default PlayersTable;
