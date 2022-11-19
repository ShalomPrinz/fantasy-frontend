// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import axios from "axios";
import { setupServer } from "msw/node";

import { handlers } from "../test";
import * as UserContext from "./contexts/UserContext";
import { Team, User } from "./types";

jest.setTimeout(10000);

axios.defaults.baseURL = "";

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mock = jest.spyOn(UserContext, "useUser");

export const mockUser = (user: User) =>
  mock.mockImplementation(() => ({
    loading: false,
    user: user,
  }));

export const mockUserWithTeam = (team: Team) =>
  mock.mockImplementation(() => ({
    loading: false,
    user: new User("test", team),
  }));

export * from "../test";
