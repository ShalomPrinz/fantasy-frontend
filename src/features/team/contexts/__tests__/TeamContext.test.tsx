import { clickElement, render, screen, setProperty } from "setupTests";

import { TeamProvider, useTeamState, useTeamUpdate } from "../";
import { Player } from "../../../../types";
import * as userService from "../../services/api";
import { Team } from "../../types";

const player: Player = {
  id: 0,
  firstName: "Test",
  lastName: "Player",
  role: "GK",
  team: "Liverpool",
};

const otherPlayer: Player = {
  id: 1,
  firstName: "Another",
  lastName: "Test",
  role: "ATT",
  team: "Tottenham",
};

const TestStateComponent = () => {
  const contextTeam = useTeamState();

  return (
    <>
      <div data-testid="test-id">
        {contextTeam.contains(player) ? "true" : "false"}
      </div>
      <div data-testid="other-test-id">
        {contextTeam.contains(otherPlayer) ? "true" : "false"}
      </div>
    </>
  );
};

describe("UserTeamContext", () => {
  describe("General", () => {
    it("should throw error when using the context outside of provider", () => {
      jest.spyOn(console, "error").mockImplementation(jest.fn());
      expect(() => render(<TestStateComponent />)).toThrowError();

      const TestUpdateComponent = () => {
        useTeamUpdate();
        return <></>;
      };

      expect(() => render(<TestUpdateComponent />)).toThrowError();
    });
  });

  describe("State Context", () => {
    it("should get given team from StateContext", () => {
      const team = new Team([player]);

      const TestComponent = () => {
        const contextTeam = useTeamState();

        expect(team).toEqual(contextTeam);

        return <></>;
      };

      render(
        <TeamProvider initialTeam={team}>
          <TestComponent />
        </TeamProvider>
      );
    });
  });

  describe("Update Context", () => {
    it("should add player to given team with UpdateContext", async () => {
      const team = new Team([]);

      const TestUpdateComponent = () => {
        const { addPlayer } = useTeamUpdate();
        return <button onClick={() => addPlayer(player)}></button>;
      };

      const { user } = render(
        <TeamProvider initialTeam={team}>
          <TestUpdateComponent />
          <TestStateComponent />
        </TeamProvider>
      );

      const div = screen.getByTestId("test-id");
      expect(div).toHaveTextContent("false");

      const button = screen.getByRole("button");
      await clickElement(user, button);

      expect(div).toHaveTextContent("true");
    });

    it("should remove player from given team with UpdateContext", async () => {
      const team = new Team([player]);

      const TestUpdateComponent = () => {
        const { removePlayer } = useTeamUpdate();
        return <button onClick={() => removePlayer(player)}></button>;
      };

      const { user } = render(
        <TeamProvider initialTeam={team}>
          <TestUpdateComponent />
          <TestStateComponent />
        </TeamProvider>
      );

      const div = screen.getByTestId("test-id");
      expect(div).toHaveTextContent("true");

      const button = screen.getByRole("button");
      await clickElement(user, button);

      expect(div).toHaveTextContent("false");
    });

    it("should switch team state to the team given by  3f398janAFSAFASFdsfhds82 UpdateContext", async () => {
      const team = new Team([player]);
      const otherTeam = new Team([otherPlayer]);

      const TestUpdateComponent = () => {
        const { switchTeam } = useTeamUpdate();
        return <button onClick={() => switchTeam(otherTeam)}></button>;
      };

      const { user } = render(
        <TeamProvider initialTeam={team}>
          <TestUpdateComponent />
          <TestStateComponent />
        </TeamProvider>
      );
      const playerDiv = screen.getByTestId("test-id");
      const otherPlayerDiv = screen.getByTestId("other-test-id");

      expect(playerDiv).toHaveTextContent("true");
      expect(otherPlayerDiv).toHaveTextContent("false");

      const button = screen.getByRole("button");
      await clickElement(user, button);

      expect(playerDiv).toHaveTextContent("false");
      expect(otherPlayerDiv).toHaveTextContent("true");
    });

    describe("User Team Update", () => {
      it("should call backend add user player function if user team", async () => {
        const addPlayerFn = jest.fn();
        setProperty(userService, "addUserPlayer", addPlayerFn);

        const team = new Team([], true);

        const TestUpdateComponent = () => {
          const { addPlayer } = useTeamUpdate();
          return <button onClick={() => addPlayer(player)}></button>;
        };

        const { user } = render(
          <TeamProvider initialTeam={team}>
            <TestUpdateComponent />
          </TeamProvider>
        );

        const button = screen.getByRole("button");
        await clickElement(user, button);
        expect(addPlayerFn).toBeCalledWith(player.id);
      });

      it("should call backend remove user player function if user team", async () => {
        const removePlayerFn = jest.fn();
        setProperty(userService, "removeUserPlayer", removePlayerFn);

        const team = new Team([player], true);

        const TestUpdateComponent = () => {
          const { removePlayer } = useTeamUpdate();
          return <button onClick={() => removePlayer(player)}></button>;
        };

        const { user } = render(
          <TeamProvider initialTeam={team}>
            <TestUpdateComponent />
          </TeamProvider>
        );

        const button = screen.getByRole("button");
        await clickElement(user, button);
        expect(removePlayerFn).toBeCalledWith(player.id);
      });
    });
  });
});
