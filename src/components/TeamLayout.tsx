import { useEffect, useRef, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import {
  FIELD_IMAGE_DEFAULT_WIDTH,
  FIELD_LAYOUT_MIN_WIDTH,
} from "../constants";
import useWindowSize from "../hooks/useWindowSize";
import field from "../res/field.png";
import { Player, Team } from "../types";
import ConditionalList from "./common/ConditionalList";
import PlayerComponent from "./common/Player";
import TeamList from "./TeamList";

interface TeamLayoutProps {
  team: Team;
}

const TeamLayout = ({ team }: TeamLayoutProps) => {
  const [width, setWidth] = useState(FIELD_IMAGE_DEFAULT_WIDTH);

  const fieldRef: React.Ref<HTMLImageElement> | null = useRef(null);
  useEffect(() => {
    setWidth((w) => fieldRef?.current?.offsetWidth || w);
  }, [fieldRef?.current?.offsetWidth]);

  const rowMargin = `my-${width > 600 ? 3 : 1}`;

  const columnCallback = (player: Player) => (
    <Col className="mx-auto">
      <PlayerComponent {...player} width={width / 10} widthUnits="px" />
    </Col>
  );

  const rowCallback = (role: Player[]) => (
    <Row className={rowMargin}>
      <ConditionalList itemCallback={columnCallback} list={role} />
    </Row>
  );

  return (
    <div className="position-relative">
      <Image
        className="w-100"
        src={field}
        ref={fieldRef}
        alt="Team Field Background"
        rounded
      />
      <Container className="position-absolute p-5 top-0 centered-flex flex-column h-100 overflow-hidden">
        <ConditionalList
          itemCallback={rowCallback}
          indexAsKey
          list={Object.values(team.players)}
        />
      </Container>
    </div>
  );
};

const TeamLayoutWrapper = ({ team }: TeamLayoutProps) => {
  const { width } = useWindowSize();
  if (width < FIELD_LAYOUT_MIN_WIDTH) return <TeamList team={team} />;

  return <TeamLayout team={team} />;
};

export default TeamLayoutWrapper;
