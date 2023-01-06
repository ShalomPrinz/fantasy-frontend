import { Message } from "../../components";
import { UserState, useUser } from "../../contexts";
import { useLeagueInfo } from "../../hooks";

interface InviteMembersProps {
  userId: string;
}

const InviteMembers = ({ userId }: InviteMembersProps) => {
  const { league, isLoading } = useLeagueInfo(userId);

  if (isLoading)
    return <Message color="info" text="Loading League Information..." />;
  if (typeof league === "undefined")
    return <Message color="danger" text="You are not member of this league." />;

  return (
    <div className="w-50 mx-auto m-5">
      <h1>Invite new members to {league!.name}</h1>
    </div>
  );
};

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
