import { useState } from "react";

import { toast } from "react-toastify";

import { IconComponent } from "../../components";
import { useUser } from "../../features/authentication";
import { acceptLeagueInvite, rejectLeagueInvite } from "../../services";

enum InviteResponseStatus {
  ACCEPTED,
  REJECTED,
  STALL,
}

interface InviteResponseProps {
  leagueName: string;
  messageId: string;
}

function LeagueInviteResponse({ leagueName, messageId }: InviteResponseProps) {
  const [isResponding, setIsResponding] = useState(false);
  const [status, setStatus] = useState(InviteResponseStatus.STALL);
  const { invalidate } = useUser();

  if (status !== InviteResponseStatus.STALL)
    return <InviteRespondedMessage status={status} />;

  function inviteResponded(byStatus: InviteResponseStatus) {
    setStatus(byStatus);
    invalidate();
  }

  function onAccept() {
    if (isResponding) return;

    setIsResponding(true);
    acceptLeagueInvite(messageId)
      .then(() => {
        toast.success(`You are now a member in ${leagueName}`);
        inviteResponded(InviteResponseStatus.ACCEPTED);
      })
      .catch((res) => {
        toast.error("Something went wrong, please try again later!");
        console.log(res);
      })
      .finally(() => setIsResponding(false));
  }

  function onReject() {
    if (isResponding) return;

    setIsResponding(true);
    rejectLeagueInvite(messageId)
      .then(() => {
        toast.success(`You rejected invitation to ${leagueName}.`);
        inviteResponded(InviteResponseStatus.REJECTED);
      })
      .catch((res) => {
        toast.error("Something went wrong, please try again later!");
        console.log(res);
      })
      .finally(() => setIsResponding(false));
  }

  return (
    <span className="d-flex align-items-center py-1 pe-5">
      <button
        className="fs-4 bg-light-danger rounded py-2 px-3 ms-auto"
        disabled={isResponding}
        onClick={onReject}
        type="button"
      >
        Reject
        <IconComponent className="pe-0 ps-2" icon="reject" />
      </button>
      <button
        className="fs-4 bg-light-success rounded py-2 px-3 ms-auto"
        disabled={isResponding}
        onClick={onAccept}
        type="button"
      >
        Accept
        <IconComponent className="pe-0 ps-2" icon="accept" />
      </button>
    </span>
  );
}

interface InviteRespondedMessageProps {
  status: InviteResponseStatus.ACCEPTED | InviteResponseStatus.REJECTED;
}

function InviteRespondedMessage({ status }: InviteRespondedMessageProps) {
  if (status === InviteResponseStatus.ACCEPTED)
    return (
      <span className="fs-4 text-white bg-success p-2 rounded centered-flex">
        Invite Accepted
        <IconComponent className="ps-2" icon="accept" />
      </span>
    );
  else
    return (
      <span className="fs-4 text-white bg-danger p-2 rounded centered-flex">
        Invite Rejected
        <IconComponent className="ps-2" icon="reject" />
      </span>
    );
}

export default LeagueInviteResponse;
