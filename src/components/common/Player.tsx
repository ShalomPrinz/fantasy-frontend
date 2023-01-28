import type { Jersey } from "../../res";
import PlayerJersey from "./PlayerJersey";
import Tooltip from "./Tooltip";

interface PlayerProps {
  name: string;
  team: Jersey;
  width: number;
  widthUnits: string;
}

const Player = ({ name, team, width, widthUnits }: PlayerProps) => (
  <div className="text-center" style={{ width: width * 1.4 + widthUnits }}>
    <PlayerJersey team={team} width={width + widthUnits} />
    <Tooltip text={name} />
  </div>
);

export default Player;
