// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import axios from "axios";
import { setupServer } from "msw/node";

import { handlers } from "../test";
import * as TeamContext from "./contexts/TeamContext";
import * as UserContext from "./contexts/UserContext";
import { Team, User } from "./types";

jest.setTimeout(10000);

axios.defaults.baseURL = "";

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

interface MockedUserContext {
  logout?: () => Promise<void>;
  state?: UserContext.State;
  user?: User;
}

export const mockUser = (context: MockedUserContext) => {
  const userContext = jest.spyOn(UserContext, "useUser");

  const { logout, state, user } = context;
  const mockedLogout = typeof logout !== "undefined" ? logout : async () => {};
  const mockedState =
    typeof state !== "undefined" ? state : UserContext.State.LOGGED_USER;
  const mockedUser =
    typeof user !== "undefined" ? user : new User("", new Team([]));

  userContext.mockImplementation(() => ({
    loading: false,
    login: async () => {},
    logout: mockedLogout,
    register: async () => {},
    state: mockedState,
    user: mockedUser,
  }));

  mockTeam(mockedUser.team);
  return userContext.mockRestore;
};

export const mockTeam = (team: Team) => {
  const teamContext = jest.spyOn(TeamContext, "useTeamState");
  teamContext.mockImplementation(() => team);
};

export * from "../test";
