import { UserState } from "features/authentication";
import {
  clickElement,
  getTestUser,
  mockUser,
  renderWithRouterAndUser,
  screen,
  setProperty,
} from "setupTests";

import * as userService from "../../../services/user";
import Inbox from "../Inbox";

const renderComponent = () => renderWithRouterAndUser(<Inbox />);

const mockUserInbox = (membersCount: number = 1) => {
  const messageId = "Message ID";
  const user = getTestUser({
    inbox: [
      {
        from: "Other User",
        id: messageId,
        league: {
          id: "League ID",
          membersCount,
          name: "My League",
        },
      },
    ],
  });
  mockUser({ state: UserState.LOGGED_USER, user });
  return messageId;
};

describe("Inbox", () => {
  it("should render Inbox component if loading user", () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Inbox component if no user is logged in", () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("If user is logged in", () => {
    it("should render Inbox component with no messages", () => {
      const user = getTestUser({ inbox: [] });
      mockUser({ state: UserState.LOGGED_USER, user });
      const { asFragment } = renderComponent();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render Inbox component with the given user message", () => {
      mockUserInbox();
      const { asFragment } = renderComponent();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render Inbox component with league invitation for a league with more than one member", () => {
      mockUserInbox(2);
      const { asFragment } = renderComponent();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("When user accepts league invitation", () => {
    it("Should call accept league invitation", async () => {
      const acceptInviteFn = jest.fn().mockResolvedValue(undefined);
      setProperty(userService, "acceptLeagueInvite", acceptInviteFn);
      const messageId = mockUserInbox();

      const { user } = renderComponent();
      const button = screen.getByRole("button", { name: /Accept/i });
      await clickElement(user, button);

      expect(acceptInviteFn).toBeCalledWith(messageId);
    });

    it("Should remove the response buttons", async () => {
      const acceptInviteFn = jest.fn().mockResolvedValue(undefined);
      setProperty(userService, "acceptLeagueInvite", acceptInviteFn);
      mockUserInbox();

      const { asFragment, user } = renderComponent();
      const button = screen.getByRole("button", { name: /Accept/i });
      await clickElement(user, button);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("When user rejects league invitation", () => {
    it("Should call reject league invitation", async () => {
      const rejectInviteFn = jest.fn().mockResolvedValue(undefined);
      setProperty(userService, "rejectLeagueInvite", rejectInviteFn);
      const messageId = mockUserInbox();

      const { user } = renderComponent();
      const button = screen.getByRole("button", { name: /Reject/i });
      await clickElement(user, button);

      expect(rejectInviteFn).toBeCalledWith(messageId);
    });

    it("Should remove the response buttons", async () => {
      const rejectInviteFn = jest.fn().mockResolvedValue(undefined);
      setProperty(userService, "rejectLeagueInvite", rejectInviteFn);
      mockUserInbox();

      const { asFragment, user } = renderComponent();
      const button = screen.getByRole("button", { name: /Reject/i });
      await clickElement(user, button);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
