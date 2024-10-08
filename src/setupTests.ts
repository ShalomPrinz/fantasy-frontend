// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import axios from "axios";
import { setupServer } from "msw/node";

import { handlers } from "../test";
import * as UserContext from "./features/authentication/contexts/UserContext";
import type { Message } from "./features/inbox";
import * as LeagueInfoHook from "./features/leagues/hooks/useLeagueInfo";
import type { LeagueInfo } from "./features/leagues";
import { Team } from "./features/team";
import * as TeamContext from "./features/team/contexts/TeamContext";
import type { Player, User } from "./types";

jest.setTimeout(10000);

axios.defaults.baseURL = "";

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

interface MockedUserContext {
  logout?: () => Promise<void>;
  state?: UserContext.UserState;
  user?: User;
}

interface MockedUser {
  inbox?: Message[];
  leagues?: LeagueInfo[];
  name?: string;
  players?: Player[];
}

export const getTestUser = (user?: MockedUser): User => ({
  id: "id",
  inbox: user?.inbox || [],
  leagues: user?.leagues || [],
  name: user?.name || "",
  team: new Team(user?.players || []),
});

export const mockUser = (context: MockedUserContext) => {
  const userContext = jest.spyOn(UserContext, "useUser");

  const { logout, state, user } = context;
  const mockedLogout = typeof logout !== "undefined" ? logout : async () => {};
  const mockedState =
    typeof state !== "undefined" ? state : UserContext.UserState.LOGGED_USER;
  const mockedUser = typeof user !== "undefined" ? user : getTestUser();

  userContext.mockImplementation(() => ({
    loading: false,
    login: async () => {},
    logout: mockedLogout,
    register: async () => {},
    state: mockedState,
    user: mockedUser,
    invalidate: async () => {},
  }));

  return userContext.mockRestore;
};

export const mockUserUndefined = () => {
  const userContext = jest.spyOn(UserContext, "useUser");
  // @ts-expect-error undefined is not of type UserContext
  userContext.mockImplementation(() => undefined);
  return userContext.mockRestore;
};

export const mockTeam = (team: Team) => {
  const teamContext = jest.spyOn(TeamContext, "useTeamState");
  teamContext.mockImplementation(() => team);
};

export const mockLeagueUndefined = () => {
  const leagueInfoHook = jest.spyOn(LeagueInfoHook, "default");
  // @ts-expect-error league info hook does not return undefined
  leagueInfoHook.mockImplementation(() => undefined);
  return leagueInfoHook.mockRestore;
};

export * from "../test";
