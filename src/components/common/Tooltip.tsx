import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface TooltipProps {
  text: string;
}

function AppTooltip({ text }: TooltipProps) {
  const overlay = (
    <Tooltip className="fs-5" id="tooltip-top" style={{ position: "fixed" }}>
      {text}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={overlay}>
      <div className="text-truncate bg-default rounded p-1 w-100">{text}</div>
    </OverlayTrigger>
  );
}

export default AppTooltip;
