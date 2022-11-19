import { createContext, ReactNode, useContext, useReducer } from "react";

import { Player, Team } from "../types";
import { useUser } from "./UserContext";

type Action = { type: "addPlayer"; payload: { player: Player } };
type Dispatch = (action: Action) => void;

const TeamContextState = createContext<Team | undefined>(undefined);
function useTeamState() {
  const team = useContext(TeamContextState);
  if (team === undefined)
    throw new Error("useTeamState must be used within a TeamProvider");
  return team;
}

const TeamContextUpdate = createContext<Dispatch | undefined>(undefined);
function useTeamUpdate() {
  const dispatch = useContext(TeamContextUpdate);
  if (dispatch === undefined)
    throw new Error("useTeamUpdate must be used within a TeamProvider");
  return (player: Player) =>
    dispatch({ type: "addPlayer", payload: { player } });
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
      if (!team.contains(player)) {
        team.addPlayer(player);
      }
      return team.clone();
    }
  }
}

export default TeamProvider;
export { useTeamState, useTeamUpdate };
