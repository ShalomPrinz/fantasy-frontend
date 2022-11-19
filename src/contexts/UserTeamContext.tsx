import { createContext, ReactNode, useContext, useReducer } from "react";

import { addUserPlayer, removeUserPlayer } from "../services/user";
import { Player, Team } from "../types";
import { useUser } from "./UserContext";

type Action =
  | { type: "addPlayer"; payload: { player: Player } }
  | { type: "removePlayer"; payload: { player: Player } };
type Dispatch = (action: Action) => void;

const TeamContextState = createContext<Team | undefined>(undefined);
function useTeamState() {
  const team = useContext(TeamContextState);
  if (typeof team === "undefined")
    throw new Error("useTeamState must be used within a TeamProvider");
  return team;
}

const TeamContextUpdate = createContext<Dispatch | undefined>(undefined);
function useTeamUpdate() {
  const dispatch = useContext(TeamContextUpdate);
  if (typeof dispatch === "undefined")
    throw new Error("useTeamUpdate must be used within a TeamProvider");

  const actions = {
    addPlayer: (player: Player) =>
      dispatch({ type: "addPlayer", payload: { player } }),
    removePlayer: (player: Player) =>
      dispatch({ type: "removePlayer", payload: { player } }),
  };
  return actions;
}

interface TeamProviderProps {
  children: ReactNode;
}

function TeamProvider({ children }: TeamProviderProps) {
  const { user } = useUser();
  const [team, dispatch] = useReducer(teamReducer, user!.team);

  return (
    <TeamContextState.Provider value={team}>
      <TeamContextUpdate.Provider value={dispatch}>
        {children}
      </TeamContextUpdate.Provider>
    </TeamContextState.Provider>
  );
}

function teamReducer(team: Team, action: Action) {
  switch (action.type) {
    case "addPlayer": {
      const { player } = action.payload;
      if (team.addPlayer(player)) {
        addUserPlayer(player.id);
      }
      return team.clone();
    }
    case "removePlayer": {
      const { player } = action.payload;
      if (team.removePlayer(player)) {
        removeUserPlayer(player.id);
      }
      return team.clone();
    }
  }
}

export default TeamProvider;
export { useTeamState, useTeamUpdate };
