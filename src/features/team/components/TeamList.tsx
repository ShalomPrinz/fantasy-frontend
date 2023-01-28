import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { ConditionalList, PlayerJersey } from "../../../components";
import { getFullName, Player } from "../../../types";
import { ErrorBoundary } from "../../errors";
import { Team } from "../../team";
import { useTeamState } from "../contexts";

const playerCallback = (p: Player) => (
  <div className="d-flex align-items-center ps-5">
    <PlayerJersey team={p.team} width="60px" />
    <h4 className="text-truncate ps-2 my-0"> {getFullName(p)} </h4>
  </div>
);

const roleCallback = ([label, players]: [string, Player[]]) => (
  <Col className="w-50">
    <h1 className="centered-flex pt-4"> {label} </h1>
    <ConditionalList itemCallback={playerCallback} list={players} />
  </Col>
);

const rowCallback = (row: [string, Player[]][]) => (
  <Row>
    <ConditionalList indexAsKey itemCallback={roleCallback} list={row} />
  </Row>
);

const getPlayersRows = (team: Team) => {
  const roles = Object.entries(team.players);
  const firstRow = roles.slice(0, 2);
  const secondRow = roles.slice(2, 4);
  return [firstRow, secondRow];
};

const TeamList = () => {
  const team = useTeamState();
  const rows = getPlayersRows(team);

  return (
    <Container>
      <ConditionalList indexAsKey itemCallback={rowCallback} list={rows} />
    </Container>
  );
};

const TeamListWrapper = () => (
  <ErrorBoundary errorMessage="Team List Not Available" marginY="3">
    <TeamList />
  </ErrorBoundary>
);

export default TeamListWrapper;
