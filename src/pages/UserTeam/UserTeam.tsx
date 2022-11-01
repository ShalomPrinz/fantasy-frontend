import { useState } from "react";

import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

import {
  PlayerJersey,
  Search,
  TabChoice,
  Table,
  TeamLayout,
  TeamList,
} from "../../components";
import { FIELD_LAYOUT_MIN_WIDTH } from "../../constants";
import useWindowSize from "../../hooks/useWindowSize";
import { getPlayers } from "../../services/user";
import { Player, User } from "../../types";
import "./UserTeam.css";

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
          icon={faCirclePlus}
        />
      </div>
    ),
  },
];

interface UserTeamProps {
  user: User;
}

const UserTeam = ({ user }: UserTeamProps) => {
  const { data } = useQuery(["players"], getPlayers);
  const players = data?.data?.players || [];

  const { width } = useWindowSize();
  const [query, setQuery] = useState("");

  const chosenPlayers = user.team.count;
  const selectedPlayersBackground = () =>
    chosenPlayers === 11 ? "success" : "danger";

  const tabs = [
    {
      id: 0,
      label: "Field",
      Component: <TeamLayout team={user.team} />,
      onClick: () => {
        if (width <= FIELD_LAYOUT_MIN_WIDTH)
          toast.warn("Your screen is too small");
      },
    },
    {
      id: 1,
      label: "List",
      Component: <TeamList team={user.team} />,
    },
  ];

  return (
    <main className="container p-4 my-4 rounded bg-team-form">
      <Row>
        <Col>
          <h2 className="fw-bold"> {user.name}'s Team </h2>
          Select a maximum of 3 players of a single team
        </Col>
      </Row>
      <Row>
        <Col
          className={`${width < FIELD_LAYOUT_MIN_WIDTH ? "w-100" : "pe-5"}`}
          sm="8"
        >
          <div className="bg-white text-center shadow-below rounded my-3">
            <h5 className="bg-default py-2 mx-3 rounded-bottom">Gameweek 1</h5>
            <div className="centered-flex">
              Gameweek 1 deadline:
              <div className="fw-bold ps-2"> Friday 20:30 </div>
            </div>
            <h2 className="py-3 centered-flex">
              Players Selected:
              <div
                className={`bg-light-${selectedPlayersBackground()} mx-3 p-2 rounded`}
              >
                {chosenPlayers} / 11
              </div>
            </h2>
          </div>

          <TabChoice tabs={tabs} />
        </Col>
        <Col className="ps-1">
          <Search onChange={(v: string) => setQuery(v)} value={query} />
          <Table className="bg-white" columns={columns} data={players} />
        </Col>
      </Row>
    </main>
  );
};

export default UserTeam;
