import { useEffect, useRef, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import {
  ConditionalList,
  ImageComponent,
  Player as PlayerComponent,
} from "../../../components";
import { useWindowWidth } from "../../../hooks";
import { getFullName, Player } from "../../../types";
import { ErrorBoundary } from "../../errors";
import {
  FIELD_IMAGE_DEFAULT_WIDTH,
  FIELD_LAYOUT_MIN_WIDTH,
} from "../constants";
import { useTeamState } from "../contexts";

import { TeamList } from "./";

interface TeamLayoutProps {
  maxWidth?: number;
}

const TeamLayout = ({ maxWidth }: TeamLayoutProps) => {
  const team = useTeamState();
  const teamList = Object.values(team.players);

  const [width, setWidth] = useState(FIELD_IMAGE_DEFAULT_WIDTH);

  const fieldRef: React.Ref<HTMLImageElement> | null = useRef(null);
  useEffect(() => {
    setWidth((w) => fieldRef?.current?.offsetWidth || w);
  }, [fieldRef?.current?.offsetWidth]);

  const columnCallback = (player: Player) => (
    <Col className="mx-auto">
      <PlayerComponent
        name={getFullName(player)}
        team={player.team}
        width={width / 10}
        widthUnits="px"
      />
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
      <ImageComponent
        className="w-100 centered-image"
        imageRef={fieldRef}
        rounded
        src={"TEAM_LAYOUT_BG"}
        style={{ maxWidth }}
        title="Team Field Background"
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

const TeamLayoutWrapper = ({ maxWidth }: TeamLayoutProps) => {
  const width = useWindowWidth();
  if (width < FIELD_LAYOUT_MIN_WIDTH) return <TeamList />;

  return (
    <ErrorBoundary errorMessage="Team Layout Not Available" marginY="3">
      <TeamLayout maxWidth={maxWidth} />
    </ErrorBoundary>
  );
};

export default TeamLayoutWrapper;
