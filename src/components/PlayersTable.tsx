import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

import { getIcon } from "../res";
import { getPlayers } from "../services";
import { Player } from "../types";

import { PlayerJersey, Search, Table } from "./";

function PlayersTable() {
  const [query, setQuery] = useState("");

  const { data } = useQuery(["players"], getPlayers);
  const players = data?.data?.players || [];

  const columns = [
    {
      id: 0,
      path: "team",
      content: ({ team }: Player) => <PlayerJersey team={team} width="60px" />,
    },
    {
      id: 1,
      path: "name",
      content: ({ name, role, team }: Player) => (
        <>
          <div className="fs-4">{name}</div>
          <div className="text-muted">
            {team}, {role}
          </div>
        </>
      ),
    },
    {
      id: 2,
      content: () => (
        <div className="text-center">
          <FontAwesomeIcon
            className="fa-3x clickable text-primary"
            icon={getIcon("plus")}
          />
        </div>
      ),
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
