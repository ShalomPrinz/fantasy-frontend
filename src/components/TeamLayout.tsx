import { useEffect, useRef, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import {
  FIELD_IMAGE_DEFAULT_WIDTH,
  FIELD_LAYOUT_MIN_WIDTH,
} from "../constants";
import { useTeamState } from "../contexts";
import useWindowWidth from "../hooks/useWindowWidth";
import field from "../res/field.png";
import { Player } from "../types";

import { ConditionalList, Player as PlayerComponent, TeamList } from "./";

const TeamLayout = () => {
  const team = useTeamState();
  const teamList = Object.values(team.players);

  const [width, setWidth] = useState(FIELD_IMAGE_DEFAULT_WIDTH);

  const fieldRef: React.Ref<HTMLImageElement> | null = useRef(null);
  useEffect(() => {
    setWidth((w) => fieldRef?.current?.offsetWidth || w);
  }, [fieldRef?.current?.offsetWidth]);

  const columnCallback = (player: Player) => (
    <Col className="mx-auto">
      <PlayerComponent {...player} width={width / 10} widthUnits="px" />
    </Col>
  );

  const rowMargin = `my-${width > 600 ? 3 : 1}`;
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
          list={teamList}
        />
      </Container>
    </div>
  );
};

const TeamLayoutWrapper = () => {
  const width = useWindowWidth();
  if (width < FIELD_LAYOUT_MIN_WIDTH) return <TeamList />;

  return <TeamLayout />;
};

export default TeamLayoutWrapper;
