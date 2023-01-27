import { Message as MessageComponent, Table } from "../../../components";
import { UserState, useUser } from "../../authentication";
import { LeagueInviteResponse } from "../components";
import { Message } from "../types";

interface InboxProps {
  messages: Message[];
}

function Inbox({ messages }: InboxProps) {
  const columns = [
    {
      id: 0,
      content: ({ from, league }: Message) => {
        return (
          <span className="ps-5 fs-5">
            <span className="fw-bold">{from} </span>
            invited you to
            <span className="fw-bold"> {league.name}</span>
          </span>
        );
      },
    },
    {
      id: 1,
      content: ({ league }: Message) => (
        <span className="fs-5">
          <span className="fw-bold">{league.membersCount} </span>
          Member{league.membersCount > 1 && "s"}
        </span>
      ),
    },
    {
      id: 2,
      content: ({ id, league }: Message) => (
        <LeagueInviteResponse leagueName={league.name} messageId={id} />
      ),
    },
  ];

  return (
    <>
      <div className="text-center my-5 fs-1">My Inbox</div>
      <div className="w-75 my-2 mx-auto">
        <Table columns={columns} data={messages} />
      </div>
      {!messages.length && (
        <div className="fs-3 text-center">No New Messages</div>
      )}
    </>
  );
}

const InboxWrapper = () => {
  const { state, user } = useUser();

  switch (state) {
    case UserState.LOADING_USER:
      return <MessageComponent color="info" text="Loading..." />;

    case UserState.LOGGED_USER:
      return <Inbox messages={user!.inbox} />;

    case UserState.NO_LOGGED_USER:
      return (
        <MessageComponent
          color="danger"
          text="Please Log In to view your inbox"
        />
      );
  }
};

export default InboxWrapper;
