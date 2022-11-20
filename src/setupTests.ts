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

const userContext = jest.spyOn(UserContext, "useUser");
const teamContext = jest.spyOn(TeamContext, "useTeamState");

export const mockUser = (user: User) => {
  userContext.mockImplementation(() => ({
    loading: false,
    user,
  }));
  mockTeam(user.team);
};

export const mockTeam = (team: Team) =>
  teamContext.mockImplementation(() => team);

export * from "../test";
