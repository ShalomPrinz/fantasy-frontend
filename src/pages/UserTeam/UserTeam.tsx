import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Message, PlayersTable, TeamTabChoice } from "../../components";
import { FULL_SCREEN_MIN_WIDTH } from "../../constants";
import { TeamProvider, UserState, useTeamState, useUser } from "../../contexts";
import useWindowWidth from "../../hooks/useWindowWidth";
import "./UserTeam.css";

interface UserTeamProps {
  name: string;
}

const UserTeam = ({ name }: UserTeamProps) => {
  const { count: playersCount } = useTeamState();

  const width = useWindowWidth();
  const contentStyle = width < FULL_SCREEN_MIN_WIDTH ? "mx-auto" : "pe-5";

  const selectedPlayersBackground = playersCount === 11 ? "success" : "danger";

  return (
    <main className="container p-4 my-4 rounded bg-team-form">
      <Row>
        <Col>
          <h2 className="fw-bold"> {name}'s Team </h2>
          Select a maximum of 3 players of a single team
        </Col>
      </Row>
      <Row>
        <Col className={contentStyle} sm="8">
          <div className="bg-white text-center shadow-below rounded my-3">
            <h5 className="bg-default py-2 mx-3 rounded-bottom">Gameweek 1</h5>
            <div className="centered-flex">
              Gameweek 1 deadline:
              <div className="fw-bold ps-2"> Friday 20:30 </div>
            </div>
            <h2 className="py-3 centered-flex">
              Players Selected:
              <div
                className={`bg-light-${selectedPlayersBackground} mx-3 p-2 rounded`}
              >
                {playersCount} / 11
              </div>
            </h2>
          </div>

          <TeamTabChoice />
        </Col>
        <Col className="ps-1">
          <PlayersTable />
        </Col>
      </Row>
    </main>
  );
};

const UserTeamWrapper = () => {
  const { state, user } = useUser();

  switch (state) {
    case UserState.LOADING_USER:
      return <Message color="info" text="Loading..." />;

    case UserState.LOGGED_USER:
      return (
        <TeamProvider initialTeam={user!.team}>
          <UserTeam name={user!.name} />
        </TeamProvider>
      );

    case UserState.NO_LOGGED_USER:
      return <Message color="danger" text="Please Log In to view your team" />;
  }
};

export default UserTeamWrapper;
