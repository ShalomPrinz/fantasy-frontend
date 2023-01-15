import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Message, Search, Table } from "../../components";
import { UserState, useUser } from "../../contexts";
import { useLeagueInfo } from "../../hooks";
import { inviteLeagueMember, queryUsers } from "../../services";
import { QueriedUser } from "../../types";

interface InviteMembersProps {
  userId: string;
}

const InviteMembers = ({ userId }: InviteMembersProps) => {
  const { league, isLoading } = useLeagueInfo(userId);
  const { inviteMember, isInviting } = useInviteMembers(
    league?.id,
    league?.name
  );
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  function handleQuery(query: string) {
    queryUsers(query).then((res) => setUsers(res.data.users || []));
  }

  if (isLoading)
    return <Message color="info" text="Loading League Information..." />;
  if (typeof league === "undefined")
    return <Message color="danger" text="You are not member of this league." />;

  const inviteTableColumns = [
    {
      id: 0,
      label: "Username",
      path: "username",
    },
    {
      id: 1,
      label: "Invite",
      content: ({ id, username }: QueriedUser) => {
        return (
          <button
            className="fs-4 bg-default rounded py-2 px-3"
            disabled={isInviting}
            onClick={() => inviteMember(id, username)}
            type="button"
          >
            Invite
          </button>
        );
      },
    },
  ];

  return (
    <main className="container mt-5 text-center">
      <Row>
        <h1 className="mb-5">Invite new members to {league!.name}</h1>
      </Row>
      <Row>
        <Col sm="3" className="mx-auto">
          <h3 className="m-4">Members: {league!.members.length}</h3>
          <button
            className="fs-2 bg-default rounded py-3 px-4 button-border-focus"
            onClick={() => navigate(-1)}
            type="button"
          >
            {league!.name}
          </button>
        </Col>
        <Col sm="6" className="mx-auto">
          <Search onChange={handleQuery} />
          <div className="w-75 mx-auto mt-4 fs-3">
            <Table columns={inviteTableColumns} data={users} />
            {!users.length && "No Users Found"}
          </div>
        </Col>
      </Row>
    </main>
  );
};

function useInviteMembers(
  leagueId: string | undefined,
  leagueName: string | undefined
) {
  const [isInviting, setIsInviting] = useState(false);

  function inviteMember(userId: string, username: string) {
    if (!leagueId || isInviting) return;

    setIsInviting(true);
    inviteLeagueMember(userId, leagueId)
      .then(() => {
        toast.success(`Successfully invited ${username} to ${leagueName}`);
      })
      .finally(() => {
        setIsInviting(false);
      });
  }

  return {
    inviteMember,
    isInviting,
  };
}

const InviteMembersWrapper = () => {
  const { state, user } = useUser();

  switch (state) {
    case UserState.LOADING_USER:
      return <Message color="info" text="Loading..." />;

    case UserState.LOGGED_USER:
      return <InviteMembers userId={user!.id} />;

    case UserState.NO_LOGGED_USER:
      return (
        <Message
          color="danger"
          text="Please Log In to invite members to your league"
        />
      );
  }
};

export default InviteMembersWrapper;
