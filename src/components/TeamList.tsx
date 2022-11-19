import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useUser } from "../contexts/UserContext";
import { Player, PlayerPairs } from "../types";

import { ConditionalList, PlayerJersey } from "./";

const playerCallback = ({ name, team }: Player) => (
  <div className="d-flex align-items-center ps-5">
    <PlayerJersey team={team} width="60px" />
    <h4 className="text-truncate ps-2 my-0"> {name} </h4>
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
  const { user } = useUser();
  const team = user?.team?.byPairs() || [];

  return (
    <Container>
      <ConditionalList indexAsKey itemCallback={rowCallback} list={team} />
    </Container>
  );
};

export default TeamList;
