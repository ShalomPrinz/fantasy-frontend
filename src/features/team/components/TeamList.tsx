import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { ConditionalList, PlayerJersey } from "../../../components";
import { getFullName, Player } from "../../../types";
import { ErrorBoundary } from "../../errors";
import { useTeamState } from "../contexts";
import { PlayerPairs } from "../types";

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

const rowCallback = (rolesPair: PlayerPairs) => (
  <Row>
    <ConditionalList
      indexAsKey
      itemCallback={roleCallback}
      list={Object.entries(rolesPair)}
    />
  </Row>
);

const TeamList = () => {
  const team = useTeamState();
  const teamList = team.byPairs();

  return (
    <Container>
      <ConditionalList indexAsKey itemCallback={rowCallback} list={teamList} />
    </Container>
  );
};

const TeamListWrapper = () => (
  <ErrorBoundary errorMessage="Team List Not Available" marginY="3">
    <TeamList />
  </ErrorBoundary>
);

export default TeamListWrapper;
