import {
  IconComponent,
  Message as MessageComponent,
  Table,
} from "../../components";
import { UserState, useUser } from "../../contexts";
import { Message } from "../../types";

interface InboxProps {
  messages: Message[];
}

function Inbox({ messages }: InboxProps) {
  const columns = [
    {
      id: 0,
      content: ({ from, league }: Message) => {
        return (
          <h5 className="ps-5">
            <span className="fw-bold">{from} </span>
            invited you to
            <span className="fw-bold"> {league.name}</span>
          </h5>
        );
      },
    },
    {
      id: 1,
      content: ({ league }: Message) => (
        <h5>
          <span className="fw-bold">{league.membersCount} </span>
          Member{league.membersCount > 1 && "s"}
        </h5>
      ),
    },
    {
      id: 2,
      content: () => <InviteResponse />,
    },
  ];

  return (
    <>
      <div className="text-center my-5 fs-1">My Inbox</div>
      <div className="w-75 my-2 mx-auto">
        <Table columns={columns} data={messages} />
      </div>
    </>
  );
}

function InviteResponse() {
  return (
    <div className="d-flex align-items-center py-1 pe-5">
      <button
        className="fs-4 bg-light-danger rounded py-2 px-3 ms-auto"
        onClick={() => console.log("declined")}
        type="button"
      >
        Decline
        <IconComponent className="pe-0 ps-2" icon="decline" />
      </button>
      <button
        className="fs-4 bg-light-success rounded py-2 px-3 ms-auto"
        onClick={() => console.log("accepted")}
        type="button"
      >
        Accept
        <IconComponent className="pe-0 ps-2" icon="accept" />
      </button>
    </div>
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
          text="Please Log In to view your team"
        />
      );
  }
};

export default InboxWrapper;
